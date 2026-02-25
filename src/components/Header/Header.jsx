import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './Header.css'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { cartCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = () => setUserMenuOpen(false)
    if (userMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [userMenuOpen])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <h1>CAVEO</h1>
          </Link>

          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/products" onClick={() => setMobileMenuOpen(false)}>Nos Vins</Link></li>
            {isAuthenticated && (
              <li><Link to="/orders" onClick={() => setMobileMenuOpen(false)}>Mes Commandes</Link></li>
            )}
          </ul>

          <div className="nav-actions">
            <Link to="/cart" className="cart-icon" aria-label="Panier">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="user-menu-container">
                <button
                  className="user-menu-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setUserMenuOpen(!userMenuOpen)
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="user-name">{user?.prenom}</span>
                </button>

                {userMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <span className="user-full-name">{user?.prenom} {user?.nom}</span>
                      <span className="user-email">{user?.email}</span>
                    </div>
                    <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      Mon profil
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      Mes commandes
                    </Link>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="auth-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Connexion</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
