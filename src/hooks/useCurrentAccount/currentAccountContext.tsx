import { createContext, FC, useEffect, useState } from "react";
import { Account } from "data/account";
import { HttpClient } from "lib/axios";
import { APIHost } from "constants/APIHost";
import PersistenceKeys from "constants/persistenceKeys";

type CurrentAccountContext = {
  account?: Account;
  isLoggedIn: boolean;
  setAccount: (account?: Account) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const currentAccountContext = createContext<CurrentAccountContext>({
  account: undefined,
  isLoggedIn: false,
  setAccount: () => undefined,
  setIsLoggedIn: () => undefined,
});

const CurrentAccountProvider: FC = ({ children }) => {
  const [account, setAccount] = useState<Account>();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(PersistenceKeys.TOKEN));

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(PersistenceKeys.TOKEN);
      if (!token) return;

      const [, p] = token.split(".");
      const payload = JSON.parse(atob(p));
      const accountId = payload.sub;

      if (typeof accountId !== "string") throw new Error("不正なtokenです");

      await HttpClient.request<Account>({
        method: "GET",
        url: `${APIHost.APP}/accounts/${accountId}`,
      }).then((res) => {
        setAccount(res.data);
      });
    })();
  }, []);

  return (
    <currentAccountContext.Provider value={{ account, isLoggedIn, setAccount, setIsLoggedIn }}>
      {children}
    </currentAccountContext.Provider>
  );
};

export default CurrentAccountProvider;
