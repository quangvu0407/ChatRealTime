import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../utils/axiosCustomize";

const userStore = create(
  persist(
    (set, get) => ({
      user: null, // { id, email, username }
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isHydrated: false,
      //đăng nhập
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/login", { email, password });
          // Axios interceptor đã extract data, response là { access_token, user }
          const { access_token, user } = response;

          set({
            user, // { id, email, username }
            accessToken: access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          let errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại";

          if (error.response) {
            // Server trả về response với error
            const status = error.response.status;

            if (status === 401) {
              errorMessage = "Email hoặc mật khẩu không đúng";
            } else if (status === 429) {
              errorMessage = "Quá nhiều lần thử. Vui lòng thử lại sau";
            } else if (error.response.data?.message) {
              errorMessage = error.response.data.message;
            }
          } else if (error.request) {
            // Request được gửi nhưng không nhận được response (network error)
            errorMessage =
              "Không thể kết nối đến server. Kiểm tra kết nối mạng";
          }

          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      // Đăng ký
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post("/auth/register", data);

          // Sau khi register thành công, tự động login
          // await get().login(email, password);
        } catch (error) {
          let errorMessage = "Đăng ký thất bại. Vui lòng thử lại";

          if (error.response) {
            const status = error.response.status;

            if (status === 400) {
              // Validation errors
              errorMessage =
                error.response.data?.message || "Thông tin không hợp lệ";
            } else if (status === 409) {
              errorMessage = "Email đã được sử dụng";
            } else if (status === 429) {
              errorMessage = "Quá nhiều lần thử. Vui lòng thử lại sau";
            } else if (error.response.data?.message) {
              errorMessage = error.response.data.message;
            }
          } else if (error.request) {
            errorMessage =
              "Không thể kết nối đến server. Kiểm tra kết nối mạng";
          }

          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      // Đăng xuất
      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Actions: Set user
      setUser: (user) => {
        set({ user });
      },

      // Actions: Set token
      setToken: (accessToken) => {
        set({ accessToken, isAuthenticated: true });
      },

      // Actions: Clear auth
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        });
      },
      // Actions: Set error
      setError: (error) => {
        set({ error });
      },

      // Actions: Set loading
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // Utility: Check auth
      checkAuth: () => {
        const { accessToken } = get();
        return !!accessToken;
      },

      // Utility: Validate token
      validateToken: async () => {
        const { accessToken } = get();
        if (!accessToken) return false;

        try {
          // eslint-disable-next-line no-unused-vars
          const response = await api.get("/auth/profile");
          return true;
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          get().clearAuth();
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);

export default userStore;
