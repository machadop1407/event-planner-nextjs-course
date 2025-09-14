"use server";

import { signIn, signOut } from "@/auth";

export async function login() {
  await signIn("github", { callbackUrl: "/dashboard" });
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
