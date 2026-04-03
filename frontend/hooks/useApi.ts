"use client";

import { AUTH_COOKIE_NAME } from "@/contants";
import * as api from "@/lib/api";
import { getCookie } from "cookies-next/client";

export function useApi() {
  const token = getCookie(AUTH_COOKIE_NAME) as string;
  return {
    getUser: () => api.getUserTest(token),
  };
}
