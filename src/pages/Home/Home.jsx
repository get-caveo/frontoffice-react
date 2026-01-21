import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import WineBottle3DBackground from '../../components/WineBottle3D/WineBottle3D'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const parallaxRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    // Set initial states for hero elements
    gsap.set(titleRef.current, { y: 100, opacity: 0 })
    gsap.set(subtitleRef.current, { y: 50, opacity: 0 })
    gsap.set(ctaRef.current, { y: 30, opacity: 0 })

    // Hero animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.3
    })
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1
    }, '-=0.6')
    .to(ctaRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, '-=0.4')

    // Parallax effect
    gsap.to(parallaxRef.current, {
      y: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // Features animation
    gsap.from('.feature-card', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
      }
    })

    // 3D wine bottles floating animation
    const bottles = document.querySelectorAll('.floating-bottle')
    bottles.forEach((bottle, index) => {
      gsap.to(bottle, {
        y: -30,
        rotation: 5,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div ref={parallaxRef} className="hero-background">
          {/* Bouteilles CSS en fallback */}
          <div className="floating-bottle bottle-1"></div>
          <div className="floating-bottle bottle-2"></div>
          <div className="floating-bottle bottle-3"></div>
        </div>
        
        <div className="container hero-content">
          <h1 ref={titleRef} className="hero-title">
            L'Excellence
            <span className="hero-subtitle-line">Viticole</span>
          </h1>
          <p ref={subtitleRef} className="hero-subtitle">
            Des cuvées d'exception pour les professionnels exigeants
          </p>
          <div ref={ctaRef} className="hero-cta">
            <Link to="/products" className="btn btn-primary">
              Découvrir nos vins
            </Link>
            <a href="#heritage" className="btn btn-secondary">
              Notre savoir-faire
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="heritage">
        <div className="container">
          <div className="heritage-content">
            <div className="heritage-text">
              <span className="section-label">Tradition & Excellence</span>
              <h2>Un Héritage de Passion</h2>
              <p>
                Depuis plusieurs générations, nous cultivons l'art de la vinification 
                avec un respect profond de la tradition. Chaque bouteille raconte 
                l'histoire de notre terroir exceptionnel et du savoir-faire transmis 
                de père en fils.
              </p>
              <p>
                Notre sélection exclusive s'adresse aux revendeurs qui partagent 
                notre passion pour l'excellence et cherchent à offrir à leur clientèle 
                des vins d'exception.
              </p>
            </div>
            <div className="heritage-image">
              <div className="image-container">
                {/* Modèle 3D interactif de bouteille */}
                <WineBottle3DBackground modelPath="/models/wine-bottle.glb" />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="features">
        <div className="container">
          <span className="section-label center">Nos Engagements</span>
          <h2 className="section-title">Pourquoi Choisir Caveo</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍇</div>
              <h3>Sélection Rigoureuse</h3>
              <p>Chaque cuvée est sélectionnée avec soin pour garantir une qualité irréprochable</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Excellence Reconnue</h3>
              <p>Nos vins sont primés par les plus grands concours internationaux</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Livraison Sécurisée</h3>
              <p>Transport adapté et sécurisé pour préserver l'intégrité de vos commandes</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Service B2B</h3>
              <p>Accompagnement personnalisé pour les professionnels</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à Découvrir Nos Cuvées ?</h2>
            <p>Explorez notre sélection exclusive de vins d'exception</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Voir le catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
