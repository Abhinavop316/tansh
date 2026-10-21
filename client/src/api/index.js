/**
 * API Client & Service Configuration for Tansh Immigration
 * Resolves base URL dynamically from Vite environment (VITE_API)
 */

// Normalize base API URL from environment variable, trimming and stripping trailing slashes
const rawApiUrl = import.meta.env.VITE_API;

export const API_BASE_URL = (rawApiUrl && typeof rawApiUrl === 'string' && rawApiUrl.trim())
  ? rawApiUrl.trim().replace(/\/+$/, '')
  : '/api';

/**
 * Builds a complete endpoint URL using the configured API_BASE_URL
 * @param {string} endpoint - The relative endpoint path (e.g. '/inquiries' or 'destinations')
 * @returns {string} Full URL pointing to API server
 */
export const getApiUrl = (endpoint = '') => {
  if (!endpoint) return API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${path}`;
};

/**
 * Universal fetch wrapper with error handling, custom headers, and JSON parsing
 * @param {string} endpoint - Relative endpoint or absolute URL
 * @param {RequestInit} [options] - Standard Fetch options
 * @returns {Promise<any>}
 */
export const apiFetch = async (endpoint, options = {}) => {
  const url = (endpoint.startsWith('http://') || endpoint.startsWith('https://'))
    ? endpoint
    : getApiUrl(endpoint);

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    // Response might not be JSON (e.g., 204 No Content or plain text)
  }

  if (!response.ok) {
    const errorMsg = data?.error || data?.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// ==========================================
// INQUIRIES & CONSULTATION REQUESTS
// ==========================================

/**
 * Submit a new consultation inquiry
 * @param {Object} formData
 * @returns {Promise<Object>}
 */
export const submitInquiry = async (formData) => {
  return apiFetch('/inquiries', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

/**
 * Fetch consultation inquiries with optional filter parameters
 * @param {Object} [params] - { status, visaType, search }
 * @returns {Promise<Array>}
 */
export const getInquiries = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'all') query.append('status', params.status);
  if (params.visaType && params.visaType !== 'all') query.append('visaType', params.visaType);
  if (params.search) query.append('search', params.search);

  const queryString = query.toString();
  const endpoint = queryString ? `/inquiries?${queryString}` : '/inquiries';
  return apiFetch(endpoint, { method: 'GET' });
};

/**
 * Update status of an inquiry
 * @param {string} id
 * @param {string} status
 * @param {string} [notes]
 * @returns {Promise<Object>}
 */
export const updateInquiryStatus = async (id, status, notes) => {
  return apiFetch(`/inquiries/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, notes })
  });
};

/**
 * Delete an inquiry
 * @param {string} id
 * @returns {Promise<Object>}
 */
export const deleteInquiry = async (id) => {
  return apiFetch(`/inquiries/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
};

// ==========================================
// SYSTEM & CONTENT ENDPOINTS
// ==========================================

/**
 * Check backend health status
 */
export const checkHealth = () => apiFetch('/health');

/**
 * Get company details and contact info
 */
export const getCompanyInfo = () => apiFetch('/company');

/**
 * Get real-time stats
 */
export const getStats = () => apiFetch('/stats');

/**
 * Destinations
 */
export const getDestinations = () => apiFetch('/destinations');
export const getDestinationBySlug = (slug) => apiFetch(`/destinations/${encodeURIComponent(slug)}`);

/**
 * Services, Packages, Reviews, Process, Team, FAQs, Gallery
 */
export const getServices = () => apiFetch('/services');
export const getPackages = () => apiFetch('/packages');
export const getProcessSteps = () => apiFetch('/process');
export const getTeam = () => apiFetch('/team');
export const getReviews = () => apiFetch('/reviews');
export const getGallery = () => apiFetch('/gallery');
export const getFaqs = () => apiFetch('/faqs');

/**
 * Blog Posts
 * @param {Object} [params] - { type, destination, search }
 */
export const getBlogPosts = (params = {}) => {
  const query = new URLSearchParams();
  if (params.type) query.append('type', params.type);
  if (params.destination) query.append('destination', params.destination);
  if (params.search) query.append('search', params.search);
  const qs = query.toString();
  return apiFetch(qs ? `/blog?${qs}` : '/blog');
};

export const getBlogPostById = (id) => apiFetch(`/blog/${encodeURIComponent(id)}`);

export default {
  API_BASE_URL,
  getApiUrl,
  apiFetch,
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  checkHealth,
  getCompanyInfo,
  getStats,
  getDestinations,
  getDestinationBySlug,
  getServices,
  getPackages,
  getProcessSteps,
  getTeam,
  getReviews,
  getGallery,
  getFaqs,
  getBlogPosts,
  getBlogPostById
};
