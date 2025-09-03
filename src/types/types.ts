export interface NavLink {
  key: string,
  label: string,
  href: string,
}

export interface LoginFormValues {
  phone: string,
  password: string,
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  accessToken?: string;
}

export interface LoginResponse {
  success: boolean;
  data?: User;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  data?: User;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (values: { phone: string; password: string }) => Promise<LoginResponse>;
  register: (values: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}
