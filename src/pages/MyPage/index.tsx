import { VFC } from "react";
import { useCurrentAccount } from "hooks/useCurrentAccount";

const MyPage: VFC = () => {
  const { signOut } = useCurrentAccount();
  return <button onClick={signOut}>サインアウト</button>;
};

export default MyPage;
