import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import './Cart.css'

// Mock cart items - à remplacer par les données de l'API/Context
const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: "Château Grand Cru 2018",
    region: "Bordeaux",
    vintage: 2018,
    price: 89.90,
    quantity: 6,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=400&fit=crop"
  }
]

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [promoCode, setPromoCode] = useState('')

  useEffect(() => {
    // Animation au chargement
    gsap.from('.cart-item', {
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    })

    gsap.from('.cart-summary', {
      x: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
  }, [])

  const updateQuantity = (itemId, newQuantity) => {
    // À implémenter avec l'API
    if (newQuantity < 1) return
    
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )

    // Animation de mise à jour
    gsap.fromTo(
      `[data-item-id="${itemId}"]`,
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
    )
  }

  const removeItem = (itemId) => {
    // À implémenter avec l'API
    const itemElement = document.querySelector(`[data-item-id="${itemId}"]`)
    
    gsap.to(itemElement, {
      x: -100,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCartItems(items => items.filter(item => item.id !== itemId))
      }
    })
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.20 // TVA 20%
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleCheckout = () => {
    // À implémenter avec l'API
    console.log('Procéder au paiement')
    
    gsap.to('.checkout-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }

  const applyPromoCode = () => {
    // À implémenter avec l'API
    console.log('Code promo:', promoCode)
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Votre Panier</h1>
          <Link to="/products" className="continue-shopping">
            ← Continuer vos achats
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🍷</div>
            <h2>Votre panier est vide</h2>
            <p>Découvrez notre sélection de vins d'exception</p>
            <Link to="/products" className="btn btn-primary">
              Voir nos produits
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item" data-item-id={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <div className="item-header">
                      <div>
                        <h3>{item.name}</h3>
                        <p className="item-region">{item.region} • {item.vintage}</p>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                        aria-label="Retirer du panier"
                      >
                        ×
                      </button>
                    </div>

                    <div className="item-footer">
                      <div className="quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="qty-input"
                          min="1"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>

                      <div className="item-pricing">
                        <span className="item-price">{item.price.toFixed(2)}€</span>
                        <span className="item-total">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Récapitulatif</h2>

              <div className="promo-code">
                <input 
                  type="text"
                  placeholder="Code promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button 
                  onClick={applyPromoCode}
                  className="promo-btn"
                >
                  Appliquer
                </button>
              </div>

              <div className="summary-line">
                <span>Sous-total</span>
                <span>{calculateSubtotal().toFixed(2)}€</span>
              </div>

              <div className="summary-line">
                <span>TVA (20%)</span>
                <span>{calculateTax().toFixed(2)}€</span>
              </div>

              <div className="summary-line shipping">
                <span>Livraison</span>
                <span className="free">Offerte</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">{calculateTotal().toFixed(2)}€</span>
              </div>

              <button 
                className="btn btn-primary btn-large checkout-btn"
                onClick={handleCheckout}
              >
                Procéder au paiement
              </button>

              <div className="payment-icons">
                <span>Paiement sécurisé</span>
                <div className="icons">
                  <div className="payment-icon">💳</div>
                  <div className="payment-icon">🔒</div>
                </div>
              </div>

              <div className="delivery-info">
                <h4>Informations de livraison</h4>
                <ul>
                  <li>Livraison gratuite dès 500€</li>
                  <li>Expédition sous 2-3 jours ouvrés</li>
                  <li>Emballage sécurisé</li>
                  <li>Suivi de commande</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
