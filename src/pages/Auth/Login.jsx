import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(formData.email, formData.password)
      navigate('/')
    } catch (err) {
      if (err.status === 401) {
        setError('Email ou mot de passe incorrect')
      } else if (err.status === 403) {
        setError('Compte désactivé')
      } else {
        setError('Erreur de connexion. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Connexion</h1>
            <p>Accédez à votre espace client</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.fr"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Pas encore de compte ?{' '}
              <Link to="/register">Créer un compte</Link>
            </p>
          </div>
        </div>

        <div className="auth-visual">
          <div className="auth-visual-content">
            <h2>L'Excellence Viticole</h2>
            <p>Rejoignez Caveo et accédez à notre sélection exclusive de vins d'exception pour professionnels.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
