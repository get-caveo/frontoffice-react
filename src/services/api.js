const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Client API pour communiquer avec le backend Java Caveo
 */
class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('caveo_token');
  }

  setToken(token) {
    localStorage.setItem('caveo_token', token);
  }

  removeToken() {
    localStorage.removeItem('caveo_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);

    if (response.status === 204) {
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || `Erreur ${response.status}`);
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return response.json();
  }

  // ==================== AUTH ====================

  async login(email, password) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async register(userData) {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async getMe() {
    return this.request('/api/auth/me');
  }

  logout() {
    this.removeToken();
  }

  // ==================== CATALOGUE PUBLIC ====================

  async getPublicProducts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.categorieId) params.append('categorieId', filters.categorieId);
    if (filters.domaineId) params.append('domaineId', filters.domaineId);
    if (filters.millesime) params.append('millesime', filters.millesime);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    return this.request(`/api/public/produits${queryString ? `?${queryString}` : ''}`);
  }

  async getPublicProduct(id) {
    return this.request(`/api/public/produits/${id}`);
  }

  async getPublicCategories() {
    return this.request('/api/public/categories');
  }

  async getPublicCategory(id) {
    return this.request(`/api/public/categories/${id}`);
  }

  async getPublicDomaines() {
    return this.request('/api/public/domaines');
  }

  async getPublicDomaine(id) {
    return this.request(`/api/public/domaines/${id}`);
  }

  // ==================== PANIER ====================

  async getCart() {
    return this.request('/api/panier');
  }

  async addToCart(produitId, uniteConditionnementId, quantite) {
    return this.request('/api/panier/articles', {
      method: 'POST',
      body: JSON.stringify({ produitId, uniteConditionnementId, quantite }),
    });
  }

  async updateCartItem(ligneId, quantite) {
    return this.request(`/api/panier/articles/${ligneId}?quantite=${quantite}`, {
      method: 'PUT',
    });
  }

  async removeCartItem(ligneId) {
    return this.request(`/api/panier/articles/${ligneId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/api/panier', {
      method: 'DELETE',
    });
  }

  // ==================== COMMANDES CLIENT ====================

  async createOrder(adresseLivraisonId, adresseFacturationId, notes) {
    const params = new URLSearchParams();
    if (adresseLivraisonId) params.append('adresseLivraisonId', adresseLivraisonId);
    if (adresseFacturationId) params.append('adresseFacturationId', adresseFacturationId);
    if (notes) params.append('notes', notes);

    const queryString = params.toString();
    return this.request(`/api/commandes-client${queryString ? `?${queryString}` : ''}`, {
      method: 'POST',
    });
  }

  async getMyOrders() {
    return this.request('/api/commandes-client/mes-commandes');
  }

  async getOrder(id) {
    return this.request(`/api/commandes-client/${id}`);
  }

  async cancelOrder(id) {
    return this.request(`/api/commandes-client/${id}/annuler`, {
      method: 'POST',
    });
  }

  // ==================== PAIEMENTS ====================

  async payOrder(commandeId, paymentData) {
    return this.request(`/api/paiements/commande/${commandeId}`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPayment(commandeId) {
    return this.request(`/api/paiements/commande/${commandeId}`);
  }

  // ==================== ADRESSES ====================

  async getAddresses() {
    return this.request('/adresse/liste');
  }

  async getAddress(id) {
    return this.request(`/adresse/${id}`);
  }

  async createAddress(addressData) {
    return this.request('/adresse', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async updateAddress(id, addressData) {
    return this.request(`/adresse/${id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  }

  async deleteAddress(id) {
    return this.request(`/adresse/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== PROFIL ====================

  async getProfile(id) {
    return this.request(`/utilisateur/${id}`);
  }

  async updateProfile(id, profileData) {
    return this.request(`/utilisateur/${id}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async deleteAccount(id) {
    return this.request(`/utilisateur/${id}`, {
      method: 'DELETE',
    });
  }
}

const api = new ApiClient();
export default api;
