export interface NavLink {
  key: string,
  label: string,
  href: string,
}

export interface LoginFormValues {
  phone: string,
  password: string,
}

export interface RegisterFormValues {
  name: string,
  phone: string,
  email: string,
  password: string,
}

export interface AuthResponse {
  user: User,
  accessToken: string,
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
}

export interface InputFormValues {
  name: string;
  email: string;
  phone: string;
}

export interface InputFieldProps {
  name: keyof InputFormValues;
  label: string;
  type?: string;
  placeholder?: string;
}

export interface TextareaFormValues {
  address: string | null;
}

export interface TextAreaFieldProps {
  name: keyof TextareaFormValues;
  label: string;
  placeholder?: string;
}