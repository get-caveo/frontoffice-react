import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CAVEO</h3>
            <p>Solution NegoSud - Vins d'excellence pour revendeurs exigeants</p>
          </div>
          
          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/products">Nos Vins</Link></li>
              <li><Link to="/about">Notre Histoire</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>contact@caveo.fr</li>
              <li>+33 1 23 45 67 89</li>
              <li>123 Route des Vignobles</li>
              <li>51000 Châlons-en-Champagne</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Informations Légales</h4>
            <ul>
              <li><Link to="/terms">CGV</Link></li>
              <li><Link to="/privacy-policy">Politique de confidentialité</Link></li>
              <li><Link to="/legal">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 NegoSud. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
