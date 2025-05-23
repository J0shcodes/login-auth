export interface FormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

export interface ApiResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
  message?: string;
}

export interface ToastState {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}