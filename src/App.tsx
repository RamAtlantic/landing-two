"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { GiCardAceSpades, GiDiamonds, GiLaurels, GiPartyPopper } from "react-icons/gi"
import { MdOutlineLocalFireDepartment, MdOutlineVerified } from "react-icons/md"
import {
  FaGift,
  FaRegIdCard,
  FaUserPlus,
  FaArrowRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
  FaChevronDown,
} from "react-icons/fa"
import { useMediaQuery } from "react-responsive"
import { IconType } from "react-icons"
  
// Constantes
const REGISTER_URL = "https://sportsbet.bet.ar/registrarse?utm_source=publi1lauguty&utm_brandaffiliate=publi1lauguty"

// Datos de testimonios


// Datos de beneficios
const benefits = [
  {
    icon: FaGift,
    title: "Bonos Premium",
    desc: "Beneficios exclusivos para nuevos miembros.",
    color: "from-green-500 to-indigo-600",
    highlight: "200%",
  },
  {
    icon: GiLaurels,
    title: "Experiencias Únicas",
    desc: "Dinámicas especiales solo para ti.",
    color: "from-emerald-500 to-teal-600",
    highlight: "VIP",
  },
  {
    icon: FaRegIdCard,
    title: "Acceso VIP",
    desc: "Registro rápido y seguro.",
    color: "from-rose-500 to-pink-600",
    highlight: "24/7",
  },
]

interface AnimatedButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  primary?: boolean;
}

// Componente de botón animado
const AnimatedButton = ({ children, href, className = "", primary = false }: AnimatedButtonProps) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-bold transition-all duration-300 ease-out ${
        primary ? "text-white hover:from-green-700 hover:to-yellow-600" : "bg-white text-green-600 hover:bg-gray-100"
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={primary ? { background: `linear-gradient(to right, #29AF05 70%, #FFD700)` } : {}}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {primary && (
        <motion.span
          className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
          style={{ background: `linear-gradient(to right, #FFD700 30%, #29AF05)` }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}
    </motion.a>
  )
}

interface BenefitCardProps {
  icon: IconType;
  title: string;
  desc: string;
  color: string;
  highlight: string;
  index: number;
}

// Componente de tarjeta de beneficio
const BenefitCard = ({ icon: Icon, title, desc, color, highlight, index }: BenefitCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative overflow-hidden rounded-3xl bg-white p-1 shadow-[0_0_60px_0_rgba(19,156,0,0.25)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="relative z-10 flex flex-col h-full justify-between rounded-2xl bg-white p-6 transition-all duration-300 group-hover:bg-opacity-90 max-h-80">
        <div>
          <div className={`mb-4 rounded-2xl bg-gradient-to-br ${color} p-3 text-white`}>
            <Icon size={28} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
          <p className="mb-4 text-gray-600">{desc}</p>
        </div>
        <div className="mt-auto flex w-full items-center justify-between">
          <span className={`rounded-full bg-gradient-to-r ${color} px-3 py-1 text-xs font-bold text-white`}>
            {highlight}
          </span>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-indigo-600 transition-colors duration-200 hover:text-indigo-800"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}



// Componente principal
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Referencia para la sección de características
  const featuresRef = useRef<HTMLDivElement>(null)
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Animación de scroll para el fondo
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col">
      {/* Fondo animado */}
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#139C00]/30 blur-3xl"></div>
        <div
          className="absolute -right-[5%] top-[20%] h-[30%] w-[30%] rounded-full bg-[#139C00]/40 blur-3xl"
        ></div>
        <div className="absolute bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-[#139C00]/20 blur-3xl"></div>
      </motion.div>

      {/* Navbar */}
      <header className={`fixed left-0 right-0 top-0 z-50 bg-transparent py-5 border-b border-white/10 transition-all duration-300 ${isScrolled ? 'backdrop-blur-sm bg-black/20' : ''}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
          </motion.div>

          {/* Navegación de escritorio */}
          <nav className="hidden items-center gap-8 md:flex">
            <motion.a
              href="#features"
              onClick={(e) => {
                e.preventDefault()
                scrollToFeatures()
              }}
              className="text-sm font-medium text-white transition-colors hover:text-indigo-600"
              whileHover={{ scale: 1.05 }}
            >
              Características
            </motion.a>
            <AnimatedButton href={REGISTER_URL} primary>
              Registrarse <FaUserPlus />
            </AnimatedButton>
          </nav>

          {/* Botón de menú móvil */}
          <button className="text-gray-700 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menú">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white px-4 py-2 shadow-[0_0_60px_0_rgba(19,156,0,0.25)] md:hidden"
            >
              <div className="flex flex-col gap-4 py-4">
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToFeatures()
                    setIsMenuOpen(false)
                  }}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Características
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonios
                </a>
                <a
                  href={REGISTER_URL}
                  className="flex items-center justify-center gap-2 rounded-full py-3 font-bold text-white"
                  style={{ background: `linear-gradient(to right, #29AF05 70%, #FFD700)` }}
                >
                  Registrarse <FaUserPlus />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-16 md:py-32 bg-[#0B0D0B]">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-800"
          >
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-600"></span>
            Experiencia Premium
          </motion.div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Únete a la comunidad más{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(to right, #29AF05 70%, #FFD700)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              exclusiva
            </span>{" "}
            de entretenimiento
          </h1>
          <p className="mb-8 text-lg text-white md:text-xl">
            Descubre un mundo de beneficios exclusivos, experiencias únicas y acceso VIP a los mejores eventos y
            promociones.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <AnimatedButton href={REGISTER_URL} primary className="w-full sm:w-auto">
              Comenzar Ahora <FaGift />
            </AnimatedButton>
            <motion.button
              onClick={scrollToFeatures}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 font-bold text-gray-700 transition-colors hover:bg-gray-100 sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Beneficios <FaChevronDown />
            </motion.button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white text-center text-xs font-bold leading-10 text-white"
                  style={{ background: `linear-gradient(to bottom right, #29AF05 70%, #FFD700)` }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-white">
              <span className="font-bold text-[#F9A703]">+2,500</span> miembros ya se unieron
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <img
            src="https://moneymaker-2.vercel.app/oso1.png"
            alt="Oso Cool"
            className="h-[600px] w-[600px] object-contain"
          />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-3xl font-bold text-white md:text-4xl"
            >
              Beneficios{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(to right, #29AF05 70%, #FFD700)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Exclusivos
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-2xl text-lg text-white"
            >
              Descubre por qué miles de personas eligen nuestra plataforma para vivir experiencias únicas y acceder a
              beneficios premium.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 flex justify-center"
          >
            <AnimatedButton href={REGISTER_URL} primary>
              Acceder a todos los beneficios <FaArrowRight />
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {!isMobile && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-[2rem] p-[2px]"
              style={{ 
                background: `linear-gradient(45deg, #29AF05, #FFD700, #29AF05)`,
                backgroundSize: '200% 200%',
                animation: 'gradient 8s ease infinite'
              }}
            >
              <div className="relative rounded-[2rem] bg-black/90 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(41,175,5,0.1),transparent_70%)]"></div>
                <div className="relative px-8 py-16 md:px-16">
                  <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white backdrop-blur-sm"
                      >
                        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#29AF05]"></span>
                        Oferta Especial
                      </motion.div>
                      <h2 className="text-4xl font-bold text-white md:text-5xl">
                        ¿Listo para comenzar tu{" "}
                        <span className="bg-gradient-to-r from-[#29AF05] to-[#FFD700] bg-clip-text text-transparent">
                          experiencia premium
                        </span>
                        ?
                      </h2>
                      <p className="text-xl text-gray-300">
                        Únete ahora y obtén acceso inmediato a todos los beneficios exclusivos que tenemos para ti.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <AnimatedButton 
                          href={REGISTER_URL} 
                          className="group relative overflow-hidden shadow-[0_0_60px_0_rgba(19,156,0,0.25)]"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            Registrarme Ahora <FaUserPlus className="transition-transform group-hover:translate-x-1" />
                          </span>
                          
                        </AnimatedButton>
                        <div className="flex items-center gap-2 text-white/80">
                          <MdOutlineVerified className="text-2xl text-[#29AF05]" />
                          <span>Registro en menos de 2 minutos</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#29AF05] opacity-20 blur-3xl"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className="relative z-10 flex h-[500px] w-[500px] items-center justify-center rounded-full bg-gradient-to-br from-[#29AF05]/20 to-[#FFD700]/20 backdrop-blur-xl transition-all duration-500 hover:from-[#29AF05]/30 hover:to-[#FFD700]/30 hover:shadow-[0_0_100px_rgba(41,175,5,0.3)]"
                        whileHover={{ 
                          scale: 1.05,
                          rotate: 5,
                        }}
                        transition={{ 
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <div className="text-center transform transition-transform duration-500 hover:scale-110">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 1 }}
                          >
                            <GiPartyPopper className="mx-auto mb-4 text-6xl text-white" />
                          </motion.div>
                          <p className="text-3xl font-bold text-white">¡Bono de Bienvenida!</p>
                          <motion.p 
                            className="mt-2 text-5xl font-extrabold text-white"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            $250.000
                          </motion.p>
                          <p className="mt-2 text-sm text-white/80">Válido por tiempo limitado</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-400 text-sm bg-[#0a0a0a] border-t border-gray-700">
        © 2024 Premium Experience. Todos los derechos reservados.
      </footer>
    </div>
  )
}
