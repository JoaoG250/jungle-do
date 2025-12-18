import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export const useSearchUsers = (search: string, enabled = true) => {
  return useQuery({
    queryKey: ["users", search],
    queryFn: () => authService.searchUsers(search),
    enabled,
  });
};
