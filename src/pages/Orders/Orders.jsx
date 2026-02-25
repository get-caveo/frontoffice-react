import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import './Orders.css'

const STATUS_LABELS = {
  EN_ATTENTE: 'En attente',
  CONFIRMEE: 'Confirmée',
  EN_PREPARATION: 'En préparation',
  EXPEDIEE: 'Expédiée',
  LIVREE: 'Livrée',
  ANNULEE: 'Annulée',
}

const STATUS_COLORS = {
  EN_ATTENTE: '#f59e0b',
  CONFIRMEE: '#3b82f6',
  EN_PREPARATION: '#8b5cf6',
  EXPEDIEE: '#06b6d4',
  LIVREE: '#10b981',
  ANNULEE: '#ef4444',
}

const Orders = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [payingOrder, setPayingOrder] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchOrders()
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (orders.length > 0) {
      const cards = document.querySelectorAll('.order-card')
      gsap.set(cards, { clearProps: 'all' })
      gsap.fromTo(cards, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      )
    }
  }, [orders])

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getMyOrders()
      setOrders(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) return
    try {
      await api.cancelOrder(orderId)
      fetchOrders()
    } catch (err) {
      alert(err.message || 'Impossible d\'annuler cette commande')
    }
  }

  const handlePayOrder = async (orderId) => {
    setPayingOrder(orderId)
    try {
      await api.payOrder(orderId, {
        methodePaiement: 'CARTE',
        detailsPaiement: 'Paiement par carte',
      })
      fetchOrders()
    } catch (err) {
      alert(err.message || 'Erreur lors du paiement')
    } finally {
      setPayingOrder(null)
    }
  }

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const getStatusSteps = (status) => {
    const steps = ['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE']
    if (status === 'ANNULEE') return { steps, currentIndex: -1, cancelled: true }
    const currentIndex = steps.indexOf(status)
    return { steps, currentIndex, cancelled: false }
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="orders-loading">
            <div className="loading-spinner"></div>
            <p>Chargement de vos commandes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="orders-hero">
        <div className="container">
          <h1>Mes Commandes</h1>
          <p>Suivez l'état de vos commandes et consultez votre historique</p>
        </div>
      </div>

      <div className="container">
        {error && <div className="orders-error">{error}</div>}

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>Aucune commande</h2>
            <p>Vous n'avez pas encore passé de commande</p>
            <Link to="/products" className="btn btn-primary">
              Découvrir nos vins
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const { steps, currentIndex, cancelled } = getStatusSteps(order.statutCommande)
              const isExpanded = expandedOrder === order.id

              return (
                <div key={order.id} className={`order-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="order-card-header" onClick={() => toggleExpand(order.id)}>
                    <div className="order-main-info">
                      <div className="order-number">
                        <span className="order-label">Commande</span>
                        <span className="order-ref">{order.numero}</span>
                      </div>
                      <div className="order-date">
                        {new Date(order.dateCommande).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    </div>

                    <div className="order-status-price">
                      <span 
                        className="order-status-badge"
                        style={{ 
                          backgroundColor: `${STATUS_COLORS[order.statutCommande]}15`,
                          color: STATUS_COLORS[order.statutCommande],
                          borderColor: STATUS_COLORS[order.statutCommande],
                        }}
                      >
                        {STATUS_LABELS[order.statutCommande]}
                      </span>
                      <span className="order-total">{order.montantTotal?.toFixed(2)}€</span>
                    </div>

                    <div className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 7l5 5 5-5" />
                      </svg>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="order-card-details">
                      {/* Barre de progression */}
                      <div className="order-progress">
                        {steps.map((step, index) => (
                          <div 
                            key={step}
                            className={`progress-step ${index <= currentIndex && !cancelled ? 'completed' : ''} ${index === currentIndex && !cancelled ? 'current' : ''} ${cancelled ? 'cancelled' : ''}`}
                          >
                            <div className="step-dot">
                              {index <= currentIndex && !cancelled ? '✓' : index + 1}
                            </div>
                            <span className="step-label">{STATUS_LABELS[step]}</span>
                          </div>
                        ))}
                      </div>

                      {/* Lignes de la commande */}
                      <div className="order-items">
                        <h3>Articles commandés</h3>
                        {order.lignes?.map((ligne) => (
                          <div key={ligne.id} className="order-item">
                            <div className="order-item-info">
                              <span className="order-item-name">{ligne.produit?.nom}</span>
                              <span className="order-item-cond">
                                {ligne.uniteConditionnement?.nom}
                              </span>
                            </div>
                            <div className="order-item-qty">× {ligne.quantite}</div>
                            <div className="order-item-price">
                              {ligne.prixUnitaire?.toFixed(2)}€
                            </div>
                            <div className="order-item-total">
                              {ligne.prixTotal?.toFixed(2)}€
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Résumé financier */}
                      <div className="order-financial">
                        <div className="financial-line">
                          <span>Sous-total</span>
                          <span>{order.sousTotal?.toFixed(2)}€</span>
                        </div>
                        {order.fraisLivraison > 0 && (
                          <div className="financial-line">
                            <span>Frais de livraison</span>
                            <span>{order.fraisLivraison?.toFixed(2)}€</span>
                          </div>
                        )}
                        {order.montantTaxes > 0 && (
                          <div className="financial-line">
                            <span>Taxes</span>
                            <span>{order.montantTaxes?.toFixed(2)}€</span>
                          </div>
                        )}
                        <div className="financial-line total">
                          <span>Total</span>
                          <span>{order.montantTotal?.toFixed(2)}€</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="order-actions">
                        {order.statutCommande === 'EN_ATTENTE' && (
                          <>
                            <button
                              className="btn btn-primary"
                              onClick={() => handlePayOrder(order.id)}
                              disabled={payingOrder === order.id}
                            >
                              {payingOrder === order.id ? 'Paiement...' : 'Payer la commande'}
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              Annuler
                            </button>
                          </>
                        )}
                        {(order.statutCommande === 'CONFIRMEE' || order.statutCommande === 'EN_PREPARATION') && (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Annuler la commande
                          </button>
                        )}
                      </div>

                      {order.notes && (
                        <div className="order-notes">
                          <strong>Notes :</strong> {order.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
