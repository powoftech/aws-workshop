export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/todos',
  API_TIMEOUT: 10000, // 10 seconds
} as const;
