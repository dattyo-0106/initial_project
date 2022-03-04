import { FC } from "react";
import CurrentAccountContext from "hooks/useCurrentAccount/currentAccountContext";

const GlobalContextProvider: FC = ({ children }) => {
  return <CurrentAccountContext>{children}</CurrentAccountContext>;
};

export default GlobalContextProvider;
