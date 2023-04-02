import { getLocalStorage } from "../libs";

export default function useAuth() {
  const token = getLocalStorage("token");

  if (token) {
    return true;
  }

  return false;
}
