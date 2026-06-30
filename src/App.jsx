import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import HomePage from './pages/HomePage.jsx'
import LandDetailPage from './pages/LandDetailPage.jsx'
import NotFound from './pages/NotFound.jsx'
import { pageTransition } from './animations/variants.js'

// Wraps each route in a fade + slide page transition.
function Page({ children }) {
  return (
    <motion.main
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* `key` on location.pathname drives enter/exit transitions between pages */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><HomePage /></Page>} />
            <Route path="/land/:id" element={<Page><LandDetailPage /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
