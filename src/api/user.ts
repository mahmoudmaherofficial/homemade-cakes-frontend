import cAxios from "@/lib/axios/cAxios";
import type { User, AuthResponse } from "@/types/types";

export const updateMeApi = async (id: string, data: Partial<User>) => {
  const res = await cAxios.put<AuthResponse>(`/users/${id}`, data);
  return res.data;
};