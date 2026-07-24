export const BASE_URL = import.meta.env.VITE_BASE_URL || '';

export const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/api/v1/super-admin/login`,
  },
  users: {
    trialUsers: `${BASE_URL}/api/v1/super-admin/trial-users`,
  }
};
