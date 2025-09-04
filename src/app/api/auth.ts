import cAxios from "@/lib/axios/cAxios"
import { LoginFormValues, AuthResponse, RegisterFormValues, User } from "@/types/types"

export const LoginApi = (data: LoginFormValues) => cAxios.post<AuthResponse>("/auth/login", data)
export const RegisterApi = (data: RegisterFormValues) => cAxios.post<AuthResponse>("/auth/register", data)
export const LogoutApi = () => cAxios.post("/auth/logout")
export const MeApi = () => cAxios.get<User>("/auth/me")