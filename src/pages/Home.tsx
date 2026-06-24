import DigitalRain from '../sections/DigitalRain'
import Navigation from '../sections/Navigation'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Certifications from '../sections/Certifications'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-deep-black">
      {/* Digital Rain Background */}
      <DigitalRain />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
