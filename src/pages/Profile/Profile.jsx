import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import './Profile.css'

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addressForm, setAddressForm] = useState({
    type: 'LIVRAISON',
    rue: '',
    ville: '',
    codePostal: '',
    pays: 'France',
    parDefaut: false,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchProfile()
    fetchAddresses()
  }, [isAuthenticated, navigate])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const data = await api.getProfile(user.id)
      setProfile(data)
      setEditData({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.telephone || '',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchAddresses = async () => {
    try {
      const data = await api.getAddresses()
      setAddresses(data)
    } catch {
      // Silently handle - addresses are optional
    }
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      await api.updateProfile(user.id, editData)
      setSuccess('Profil mis à jour avec succès')
      setEditing(false)
      fetchProfile()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddAddress = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await api.createAddress(addressForm)
      setShowAddressForm(false)
      setAddressForm({
        type: 'LIVRAISON',
        rue: '',
        ville: '',
        codePostal: '',
        pays: 'France',
        parDefaut: false,
      })
      fetchAddresses()
      setSuccess('Adresse ajoutée avec succès')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Supprimer cette adresse ?')) return
    try {
      await api.deleteAddress(id)
      fetchAddresses()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-loading">
            <div className="loading-spinner"></div>
            <p>Chargement du profil...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="container">
          <h1>Mon Profil</h1>
          <p>Gérez vos informations personnelles et adresses</p>
        </div>
      </div>

      <div className="container">
        {error && <div className="profile-error">{error}</div>}
        {success && <div className="profile-success">{success}</div>}

        <div className="profile-grid">
          {/* Informations personnelles */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Informations personnelles</h2>
              {!editing && (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  Modifier
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Prénom</label>
                    <input
                      type="text"
                      value={editData.prenom}
                      onChange={(e) => setEditData({ ...editData, prenom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      value={editData.nom}
                      onChange={(e) => setEditData({ ...editData, nom: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="tel"
                    value={editData.telephone}
                    onChange={(e) => setEditData({ ...editData, telephone: e.target.value })}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Sauvegarder</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-row">
                  <span className="info-label">Nom</span>
                  <span className="info-value">{profile?.prenom} {profile?.nom}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-value">{profile?.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Téléphone</span>
                  <span className="info-value">{profile?.telephone || 'Non renseigné'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Membre depuis</span>
                  <span className="info-value">
                    {profile?.creeLe
                      ? new Date(profile.creeLe).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : '-'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Adresses */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Mes Adresses</h2>
              <button
                className="edit-btn"
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                {showAddressForm ? 'Annuler' : '+ Ajouter'}
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="profile-form address-form">
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={addressForm.type}
                    onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                  >
                    <option value="LIVRAISON">Livraison</option>
                    <option value="FACTURATION">Facturation</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rue</label>
                  <input
                    type="text"
                    value={addressForm.rue}
                    onChange={(e) => setAddressForm({ ...addressForm, rue: e.target.value })}
                    required
                    placeholder="12 Rue de la Vigne"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ville</label>
                    <input
                      type="text"
                      value={addressForm.ville}
                      onChange={(e) => setAddressForm({ ...addressForm, ville: e.target.value })}
                      required
                      placeholder="Paris"
                    />
                  </div>
                  <div className="form-group">
                    <label>Code postal</label>
                    <input
                      type="text"
                      value={addressForm.codePostal}
                      onChange={(e) => setAddressForm({ ...addressForm, codePostal: e.target.value })}
                      required
                      placeholder="75001"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Pays</label>
                  <input
                    type="text"
                    value={addressForm.pays}
                    onChange={(e) => setAddressForm({ ...addressForm, pays: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={addressForm.parDefaut}
                      onChange={(e) => setAddressForm({ ...addressForm, parDefaut: e.target.checked })}
                    />
                    Adresse par défaut
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Ajouter l'adresse
                </button>
              </form>
            )}

            {addresses.length === 0 ? (
              <p className="no-addresses">Aucune adresse enregistrée</p>
            ) : (
              <div className="addresses-list">
                {addresses.map((addr) => (
                  <div key={addr.id} className="address-card">
                    <div className="address-type">
                      {addr.type === 'LIVRAISON' ? '📦' : '📄'}{' '}
                      {addr.type}
                      {addr.parDefaut && <span className="default-badge">Par défaut</span>}
                    </div>
                    <p className="address-text">
                      {addr.rue}<br />
                      {addr.codePostal} {addr.ville}<br />
                      {addr.pays}
                    </p>
                    <button
                      className="delete-address-btn"
                      onClick={() => handleDeleteAddress(addr.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Déconnexion */}
        <div className="profile-logout">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
