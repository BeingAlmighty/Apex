// API client for backend communication

const API_URL = 'http://localhost:8000/api/v1';

/**
 * API Client for Apex Career Navigator Backend
 */
export const api = {
  /**
   * Register a new user
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {string} fullName - User's full name
   * @returns {Promise<Object>} User data
   */
  async register(email, password, fullName) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    return response.json();
  },

  /**
   * Login user and get JWT token
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<Object>} Token data
   */
  async login(email, password) {
    // OAuth2 password flow requires form data
    const formData = new URLSearchParams();
    formData.append('username', email); // OAuth2 uses 'username' field
    formData.append('password', password);

    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include', // Important for cookies
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  },

  /**
   * Logout user and clear authentication
   * @returns {Promise<Object>} Success message
   */
  async logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return response.json();
  },

  /**
   * Get current authenticated user
   * @returns {Promise<Object>} User data
   */
  async getCurrentUser() {
    const response = await fetch(`${API_URL}/users/me`, {
      credentials: 'include', // Send cookies
    });

    if (!response.ok) {
      throw new Error('Not authenticated');
    }

    return response.json();
  },

  /**
   * Send a chat message
   * @param {string} message - The message to send
   * @returns {Promise<Object>} AI response with analysis data
   */
  async sendMessage(message) {
    const response = await fetch(`${API_URL}/chat/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send message');
    }

    return response.json();
  },

  /**
   * Get chat history
   * @param {number} limit - Maximum number of messages to retrieve
   * @returns {Promise<Array>} Array of chat messages
   */
  async getChatHistory(limit = 50) {
    const response = await fetch(`${API_URL}/chat/chat-history?limit=${limit}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get chat history');
    }

    return response.json();
  },

  /**
   * Analyze resume
   * @returns {Promise<Object>} Resume analysis
   */
  async analyzeResume(formData) {
    const opts = {
      method: 'POST',
      credentials: 'include',
    }

    if (formData instanceof FormData) {
      opts.body = formData
    }

    const response = await fetch(`${API_URL}/analysis/analyze-resume`, opts);

    if (!response.ok) {
      let errText = 'Failed to analyze resume'
      try {
        const errJson = await response.json()
        errText = errJson.detail || JSON.stringify(errJson)
      } catch (e) {}
      throw new Error(errText)
    }

    return response.json();
  },

  /**
   * Perform skill gap analysis
   * @param {string} targetRole - Target career role
   * @returns {Promise<Object>} Skill gap analysis
   */
  async skillGapAnalysis(targetRole) {
    const response = await fetch(`${API_URL}/analysis/skill-gap-analysis?target_role=${encodeURIComponent(targetRole)}`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to analyze skill gaps');
    }

    return response.json();
  },

  /**
   * Calculate ROI for career investment
   * @param {number} investmentAmount - Investment amount
   * @param {string} targetRole - Target career role
   * @returns {Promise<Object>} ROI calculation
   */
  async calculateROI(investmentAmount, targetRole) {
    const response = await fetch(
      `${API_URL}/analysis/roi-calculation?investment_amount=${investmentAmount}&target_role=${encodeURIComponent(targetRole)}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to calculate ROI');
    }

    return response.json();
  },
};

export default api;
