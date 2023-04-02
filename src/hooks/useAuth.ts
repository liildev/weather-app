export default function useAuth(token: string) {
  if (token) {
    return true;
  }

  return false;
}
