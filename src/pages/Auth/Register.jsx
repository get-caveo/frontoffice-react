import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    prenom: '',
    nom: '',
    telephone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)
    try {
      await register({
        email: formData.email,
        password: formData.password,
        prenom: formData.prenom,
        nom: formData.nom,
        telephone: formData.telephone || undefined,
      })
      navigate('/')
    } catch (err) {
      if (err.status === 409) {
        setError('Un compte avec cet email existe déjà')
      } else {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.')
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
            <h1>Créer un compte</h1>
            <p>Rejoignez la communauté Caveo</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  placeholder="Jean"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Martin"
                  required
                />
              </div>
            </div>

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
              <label htmlFor="telephone">Téléphone (optionnel)</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="0612345678"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 caractères"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le mot de passe"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'Inscription...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Déjà un compte ?{' '}
              <Link to="/login">Se connecter</Link>
            </p>
          </div>
        </div>

        <div className="auth-visual">
          <div className="auth-visual-content">
            <h2>L'Excellence Viticole</h2>
            <p>Accédez à notre sélection exclusive de vins d'exception, passez commande et suivez vos livraisons.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
