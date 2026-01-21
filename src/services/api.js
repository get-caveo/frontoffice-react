/**
 * Service API pour communiquer avec le backend Java
 * Base URL: http://localhost:8080 (via proxy Vite)
 */

const API_BASE_URL = '/api';

/**
 * Fonction utilitaire pour effectuer des requêtes API
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Ajouter le token JWT si disponible
  const token = localStorage.getItem('jwt_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP ${response.status}`);
    }

    // Retourner null si pas de contenu
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Erreur API [${endpoint}]:`, error);
    throw error;
  }
}

// ==================== PRODUITS (PUBLIC) ====================

export const produitsApi = {
  /**
   * Récupérer tous les produits (endpoint public)
   * @param {Object} filters - Filtres optionnels (categorieId, domaineId, millesime, search)
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.categorieId) params.append('categorieId', filters.categorieId);
    if (filters.domaineId) params.append('domaineId', filters.domaineId);
    if (filters.millesime) params.append('millesime', filters.millesime);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    return fetchApi(`/public/produits${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Récupérer un produit par son ID
   */
  getById: async (id) => {
    return fetchApi(`/public/produits/${id}`);
  },
};

// ==================== CATEGORIES (PUBLIC) ====================

export const categoriesApi = {
  /**
   * Récupérer toutes les catégories
   */
  getAll: async () => {
    return fetchApi('/public/categories');
  },

  /**
   * Récupérer une catégorie par son ID
   */
  getById: async (id) => {
    return fetchApi(`/public/categories/${id}`);
  },
};

// ==================== DOMAINES (PUBLIC) ====================

export const domainesApi = {
  /**
   * Récupérer tous les domaines
   */
  getAll: async () => {
    return fetchApi('/public/domaines');
  },

  /**
   * Récupérer un domaine par son ID
   */
  getById: async (id) => {
    return fetchApi(`/public/domaines/${id}`);
  },
};

// ==================== AUTHENTIFICATION ====================

export const authApi = {
  /**
   * Connexion utilisateur
   */
  login: async (email, password) => {
    const response = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      localStorage.setItem('jwt_token', response.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.id,
        email: response.email,
        prenom: response.prenom,
        nom: response.nom,
        role: response.role
      }));
    }
    
    return response;
  },

  /**
   * Inscription utilisateur
   */
  register: async (userData) => {
    const response = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      localStorage.setItem('jwt_token', response.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.id,
        email: response.email,
        prenom: response.prenom,
        nom: response.nom,
        role: response.role
      }));
    }
    
    return response;
  },

  /**
   * Récupérer l'utilisateur courant
   */
  getCurrentUser: async () => {
    return fetchApi('/auth/me');
  },

  /**
   * Déconnexion
   */
  logout: () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('jwt_token');
  },

  /**
   * Récupérer l'utilisateur stocké localement
   */
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default {
  produits: produitsApi,
  categories: categoriesApi,
  domaines: domainesApi,
  auth: authApi,
};
