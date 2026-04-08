import type { UserRole } from "@/types";

const TOKEN_KEY = "trustcart_token";
const USER_ID_KEY = "trustcart_user_id";
const USERNAME_KEY = "trustcart_username";
const ROLE_KEY = "trustcart_role";

export interface StoredSession {
  token: string;
  userId: string;
  username: string;
  role: UserRole;
}

export function storeSession(session: StoredSession): void {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_ID_KEY, session.userId);
  localStorage.setItem(USERNAME_KEY, session.username);
  localStorage.setItem(ROLE_KEY, session.role);
}

export function getStoredSession(): StoredSession | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const userId = localStorage.getItem(USER_ID_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  const role = localStorage.getItem(ROLE_KEY) as UserRole | null;

  if (!token || !userId || !username || !role) return null;
  return { token, userId, username, role };
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(ROLE_KEY);
}
