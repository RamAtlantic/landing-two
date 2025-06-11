"use client"

import { motion } from "framer-motion"
import { GiPokerHand } from "react-icons/gi"
import LoadingButton from "./LoadingButton" // Asumiendo que este componente existe

// URL de registro (asumiendo que está definido en otro lugar)
const REGISTER_URL = "https://pba.sportsbet.bet.ar//registrarse?utm_source=publi1lauguty&utm_brandaffiliate=publi1lauguty" // Reemplaza con tu URL real

// Animaciones
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function CTASection() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden px-4 py-16 md:py-24"
    >
      {/* Fondo más claro con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl md:rounded-3xl" />

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 md:px-8">
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight"
        >
          Estás a un <span className="text-brand-green">clic</span> de empezar una nueva experiencia
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-6 md:mb-8"
        >
          Sumate hoy y accedé a beneficios que solo están disponibles por{" "}
          <span className="font-semibold text-white">tiempo limitado</span>. Miles de usuarios ya están viviendo una
          experiencia distinta con desafíos, dinámicas interactivas y una economía digital pensada para que cada paso
          cuente.
        </motion.p>

        <motion.p variants={fadeInUp} className="text-white/90 text-lg md:text-xl font-semibold mb-6 md:mb-10">
          ¡Conectate, participá y empezá a desbloquear recompensas!
        </motion.p>

        <motion.div variants={fadeInUp} className="flex justify-center">
          <LoadingButton
            href={REGISTER_URL}
            variant="primary"
            className="px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white"
          >
            <GiPokerHand className="text-xl md:text-2xl" />
            <span>Registrarme Ahora</span>
          </LoadingButton>
        </motion.div>
      </div>
    </motion.section>
  )
}
