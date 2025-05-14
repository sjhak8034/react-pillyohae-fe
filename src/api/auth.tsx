import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// login api
export const login = async (email: string, password: string): Promise<any> => {
  try {
    // 로그인 API 호출
    const response: AxiosResponse = await api.post("/users/login", {
      email,
      password,
    });

    // Authorization 헤더에서 토큰 가져오기
    const token = response.headers.authorization;

    if (token) {
      // JWT 토큰의 payload를 분리 (디코딩)
      const [header, payload, signature] = token.split(".");

      // Payload 디코딩 예시 (base64 디코딩 필요)
      const decodedPayload = JSON.parse(atob(payload));

      console.log("Decoded Payload: ", decodedPayload);

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", token);
      console.log("로그인 성공 : ", token);
      alert("로그인 성공!");
      window.location.href = "/";
      // 사용자 역할에 따른 페이지 이동 처리
      // navigate("/dashboard"); // 예시로 대시보드로 이동
    } else {
      console.error("Authorization 헤더에 토큰이 없습니다.");
    }

    return response.data;
  } catch (error: any) {
    // 에러 처리
    if (axios.isAxiosError(error)) {
      // 서버가 응답을 반환한 경우 (Validation 오류 포함)
      if (error.response) {
        console.error("Validation error:", error.response.data);
        throw error.response.data; // 필요시 상위 컴포넌트로 전달
      } else {
        console.error("No response from server.");
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// logout api
export const logout = async (
  navigate: (path: string) => void
): Promise<void> => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    await api.post("/users/logout");

    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    navigate("/login"); // <-- 여기가 핵심: 성공 후 이동
  } catch (err) {
    const error = err as AxiosError;
    console.error("로그아웃 중 에러:", error.response?.data || error.message);
    alert("로그아웃 실패: 서버 오류");
  }
};

// axios 인스턴스를 생성하여 기본 설정을 적용
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인증이 필요 없는 경로 목록
const publicPaths: string[] = [
  "/refresh",
  "/users/login",
  "/users/signup",
  "/toss/fail",
  "/toss/success",
  "/toss/confirm",
];

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const url = config.url || "";
    const isPublicPath = publicPaths.some((path) => url.startsWith(path));

    if (!isPublicPath) {
      const token = localStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers["Authorization"] = token;
      }
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token);
    } else {
      reject(error);
    }
  });
  failedQueue = [];
};

// 응답 인터셉터
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = token as string;
          }
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Attempting to refresh token");
        const response = await api.post("/refresh");
        const newAccessToken = response.headers["authorization"];

        console.log(newAccessToken);

        if (!newAccessToken) {
          throw new Error("액세스 토큰이 반환되지 않았습니다.");
        }

        localStorage.setItem("accessToken", newAccessToken);
        api.defaults.headers.common["Authorization"] = newAccessToken;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = newAccessToken;
        }

        return api(originalRequest);
      } catch (refreshError: any) {
        console.error(
          "Failed to refresh token:",
          refreshError.response?.data || refreshError.message
        );
        processQueue(refreshError, null);
        isRefreshing = false;

        if (refreshError.response?.status === 401) {
          delete api.defaults.headers.common["Authorization"];
          window.location.href = "/login"; // Vue Router가 아닌 일반 브라우저 이동으로 처리
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
