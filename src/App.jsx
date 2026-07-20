import BrandIntro from './components/BrandIntro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import InstagramFeed from './components/InstagramFeed'
import About from './components/About'
import Brands from './components/Brands'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

export default function App() {
  return (
    <>
      <BrandIntro />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <InstagramFeed />
        <About />
        <Brands />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
