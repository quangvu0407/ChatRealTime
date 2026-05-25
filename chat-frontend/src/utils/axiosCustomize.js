import axios from "axios";

// Tạo axios instance với base URL
const api = axios.create({
  baseURL: "http://localhost:3000", // Thay bằng URL backend của bạn
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - sẽ thêm token sau
api.interceptors.request.use(
  (config) => {
    // TODO: Thêm token injection ở task 16
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - xử lý errors và extract data từ backend transform interceptor
api.interceptors.response.use(
  (response) => {
    // Backend transform interceptor trả về: { statusCode, message, data }
    // Extract data để code gọn hơn
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // TODO: Thêm error handling chi tiết hơn sau
    return Promise.reject(error);
  },
);

export default api;
