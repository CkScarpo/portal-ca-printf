import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { checkAdmin, observeUser } from "../services/authService";

export const useObserveUser = () => {
  const { setUser, setAdmin, setLoading } = useUserStore.getState();

  useEffect(() => {
    const unsubscribe = observeUser(async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const admin = await checkAdmin(user.uid);
        setAdmin(admin);
      } else {
        setAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);
};
