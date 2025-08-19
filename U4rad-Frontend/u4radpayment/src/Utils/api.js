// utils/api.js

// Base API URL - Replace with your actual API endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// API request wrapper with error handling
    const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        },
        ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
    };

    // Authentication APIs
    export const authAPI = {
    login: async (credentials) => {
        return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        });
    },

    logout: async () => {
        return apiRequest('/auth/logout', {
        method: 'POST',
        });
    },

    register: async (userData) => {
        return apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        });
    },

    getCurrentUser: async () => {
        return apiRequest('/auth/me');
    },
    };

    // Payment APIs
    export const paymentAPI = {
    // Create payment order
    createOrder: async (orderData) => {
        return apiRequest('/payments/create-order', {
        method: 'POST',
        body: JSON.stringify(orderData),
        });
    },

    // Process payment
    processPayment: async (paymentData) => {
        return apiRequest('/payments/process', {
        method: 'POST',
        body: JSON.stringify(paymentData),
        });
    },

    // Get payment history
    getPaymentHistory: async (userId) => {
        return apiRequest(`/payments/history/${userId}`);
    },

    // Apply promo code
    validatePromoCode: async (code, orderAmount) => {
        return apiRequest('/payments/validate-promo', {
        method: 'POST',
        body: JSON.stringify({ code, orderAmount }),
        });
    },
    };

    // User wallet/balance APIs
    export const walletAPI = {
    // Get user balance
    getBalance: async (userId) => {
        return apiRequest(`/wallet/balance/${userId}`);
    },

    // Add money to wallet
    topUpWallet: async (topUpData) => {
        return apiRequest('/wallet/topup', {
        method: 'POST',
        body: JSON.stringify(topUpData),
        });
    },

    // Get wallet transactions
    getTransactions: async (userId, limit = 10, offset = 0) => {
        return apiRequest(`/wallet/transactions/${userId}?limit=${limit}&offset=${offset}`);
    },
    };

    // Service/Rate APIs
    export const serviceAPI = {
    // Get current service rates
    getRates: async () => {
        return apiRequest('/services/rates');
    },

    // Get service statistics
    getStats: async (userId) => {
        return apiRequest(`/services/stats/${userId}`);
    },

    // Update service usage
    updateUsage: async (usageData) => {
        return apiRequest('/services/usage', {
        method: 'POST',
        body: JSON.stringify(usageData),
        });
    },
    };

    // Dashboard APIs
    export const dashboardAPI = {
    // Get dashboard data
    getDashboardData: async (userId) => {
        return apiRequest(`/dashboard/${userId}`);
    },

    // Get reports
    getReports: async (userId, dateRange) => {
        return apiRequest(`/dashboard/reports/${userId}`, {
        method: 'POST',
        body: JSON.stringify(dateRange),
        });
    },

    // Export data to Excel
    exportToExcel: async (userId, filters) => {
        const response = await fetch(`${API_BASE_URL}/dashboard/export/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(filters),
        });

        if (!response.ok) {
        throw new Error('Export failed');
        }

        // Return blob for file download
        return response.blob();
    },
    };

    // Error handler for API calls
    export const handleAPIError = (error) => {
    console.error('API Error:', error);
    
    if (error.message.includes('401')) {
        // Unauthorized - redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return 'Session expired. Please login again.';
    } else if (error.message.includes('404')) {
        return 'Requested resource not found.';
    } else if (error.message.includes('500')) {
        return 'Server error. Please try again later.';
    } else if (error.message.includes('NetworkError')) {
        return 'Network error. Please check your connection.';
    }
    
    return 'An unexpected error occurred. Please try again.';
    };

    // Local storage helpers
    export const storageAPI = {
    setItem: (key, value) => {
        try {
        localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
        console.error('Error saving to localStorage:', error);
        }
    },

    getItem: (key) => {
        try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
        } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
        }
    },

    removeItem: (key) => {
        try {
        localStorage.removeItem(key);
        } catch (error) {
        console.error('Error removing from localStorage:', error);
        }
    },

    clear: () => {
        try {
        localStorage.clear();
        } catch (error) {
        console.error('Error clearing localStorage:', error);
        }
    },
    };