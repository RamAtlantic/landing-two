"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaCheck, FaUserPlus } from "react-icons/fa"
import { MdSend } from "react-icons/md"
import { saveLandingData } from './services/landingService'
import CountdownTimer from './components/CountdownTimer'
import { sendMetaEvent } from "./services/metaEventService"

interface PhonePopupProps {
  isOpen: boolean
  onClose: () => void
}

const PhonePopup: React.FC<PhonePopupProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<"input" | "success">("input")
  const [error, setError] = useState<string | null>(null)
  const [targetDate] = useState(() => {
    const date = new Date()
    date.setHours(date.getHours() + 17)
    return date
  })

  // Función para generar el username
  const generateUsername = (email: string, phone: string): string => {
    const emailPrefix = email.split('@')[0].substring(0, 4)
    const phoneSuffix = phone.slice(-4)
    return `${emailPrefix}${phoneSuffix}`
  }

  // Función para generar la URL de redirección
  const generateRedirectUrl = (email: string, phone: string): string => {
    const username = generateUsername(email, phone)
    const baseUrl = import.meta.env.VITE_REGISTER_URL || 'https://mooneymaker.co/home'
    return `${baseUrl}#username=${username}&email=${email}&phone=${phone}`
  }

  // Validar número de teléfono y email mientras el usuario escribe
  useEffect(() => {
    const isValidPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(phoneNumber)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isFormValid = isValidPhone && isValidEmail && email.length > 0 && phoneNumber.length > 0
    
    setIsValid(isFormValid)
    
    if (phoneNumber && !isValidPhone) {
      setError("Ingresa un número de teléfono válido")
    } else if (email && !isValidEmail) {
      setError("Ingresa un email válido")
    } else {
      setError(null)
    }
  }, [phoneNumber, email])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setPhoneNumber(value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid) return
    
    setIsSubmitting(true)
    setError(null)

    try {
      // Enviar evento a Meta
      const success = await sendMetaEvent(email, "10");
      
      if (success) {
        console.log('Evento de registro enviado exitosamente a Meta');
      } else {
        console.warn('No se pudo enviar el evento a Meta');
      }
      
      // Guardar datos en Firebase
      try { 
        const success = await saveLandingData(phoneNumber, email)
        if (success) {
          setStep("success")
        } else {
          setError("Hubo un error al guardar los datos. Por favor, intenta nuevamente.")
        }
      } catch (err: any) {
        console.error("Error al guardar los datos:", err)
        setError("Hubo un error al guardar los datos. Por favor, intenta nuevamente.")
      } finally {
        setIsSubmitting(false)
      }

      // Generar URL de redirección y redirigir al usuario
      const redirectUrl = generateRedirectUrl(email, phoneNumber)
      console.log('Redirigiendo a:', redirectUrl)
      window.location.href = redirectUrl
      
    } catch (error) {
      console.error('Error en el proceso de registro:', error);
      // Aún redirigir al usuario aunque falle el evento
      const redirectUrl = generateRedirectUrl(email, phoneNumber)
      window.location.href = redirectUrl
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#2c2c2c] rounded-xl overflow-hidden shadow-2xl border border-[#29AF05]/30"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#EC3765] via-[#FFD700] to-[#EC3765] p-4">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <FaTimes />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-2 text-[#EC3765]">
                  <FaUserPlus size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {step === "input" ? "¡Regístrate Ahora!" : "¡Registro Exitoso!"}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === "input" ? (
                <form onSubmit={handleSubmit}>
                  <p className="text-white/80 mb-4">
                    Ingresá tu email y número de teléfono para registrarte y acceder a beneficios exclusivos.
                  </p>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="tu@email.com"
                        className={`w-full bg-[#3a3a3a] border ${
                          error && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "border-red-500" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#29AF05]/50`}
                        autoFocus
                      />
                      {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#29AF05]">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-1">
                      Número de teléfono
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Ej: 1123456789"
                        className={`w-full bg-[#3a3a3a] border ${
                          error && phoneNumber && !/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(phoneNumber) ? "border-red-500" : "border-white/20"
                        } rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#29AF05]/50`}
                      />
                      {phoneNumber && /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(phoneNumber) && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#29AF05]">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        isValid && !isSubmitting
                          ? "bg-gradient-to-r from-[#EC3765] via-[#FFD700] to-[#EC3765] text-white hover:from-[#29AF05] hover:to-[#FFD700]"
                          : "bg-gray-600 text-white/50 cursor-not-allowed"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <MdSend />
                          <span>Registrarme</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-[#29AF05]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="text-[#29AF05]" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">¡Registro Exitoso!</h4>
                  <p className="text-white/70 mb-6">
                    Te enviaremos un mensaje con los siguientes pasos para completar tu registro.
                  </p>
                  <div className="text-center mb-4">
                    <p className="text-white/50 text-sm mb-2">Oferta válida por:</p>
                    <CountdownTimer targetDate={targetDate} />
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gradient-to-r from-[#EC3765] via-[#FFD700] to-[#EC3765] text-white rounded-lg font-medium hover:from-[#29AF05] hover:to-[#FFD700] transition-all"
                  >
                    Entendido
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#252525] px-6 py-3 text-xs text-white/50 text-center">
              No compartiremos tu información con terceros. Aplican términos y condiciones.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PhonePopup
