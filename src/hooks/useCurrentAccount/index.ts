import { useCallback, useContext } from "react";
import { currentAccountContext } from "hooks/useCurrentAccount/currentAccountContext";
import { HttpClient } from "lib/axios";
import { Account } from "data/account";
import { APIHost } from "constants/APIHost";
import { useNavigate } from "react-router-dom";
import { routes } from "constants/routes";

interface CurrentAccountUseCase {
  account?: Account;
  isLoggedIn: boolean;
  refetchAccount: (id?: string) => Promise<void>;
  signOut: () => void;
}

export const useCurrentAccount = (): CurrentAccountUseCase => {
  const { account, isLoggedIn, setAccount, setIsLoggedIn } = useContext(currentAccountContext);
  const navigate = useNavigate();

  const refetchAccount = useCallback(
    async (id?: string) => {
      const accountId = id ?? account?.id;

      if (!accountId) return;

      await HttpClient.request<Account>({
        method: "GET",
        url: `${APIHost.APP}/accounts/${accountId}`,
      }).then((res) => {
        setAccount(res.data);
        setIsLoggedIn(true);
      });
    },
    [account, setAccount, setIsLoggedIn]
  );

  const signOut = useCallback(() => {
    localStorage.clear();
    setIsLoggedIn(false);
    setAccount(undefined);
    navigate(routes.signIn());
  }, [setIsLoggedIn, setAccount, navigate]);

  return { account, isLoggedIn, refetchAccount, signOut };
};
