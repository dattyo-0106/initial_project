import { VFC } from "react";
import { useForm } from "react-hook-form";
import { HttpClient } from "lib/axios";
import { APIHost } from "constants/APIHost";
import { Account } from "data/account";
import PersistenceKeys from "constants/persistenceKeys";
import { useCurrentAccount } from "hooks/useCurrentAccount";
import { routes } from "constants/routes";
import { useNavigate } from "react-router-dom";

type SignInFormData = {
  email: string;
  password: string;
};

type SignInResponse = {
  account: Account;
  token: string;
};

const SignInPage: VFC = () => {
  const { register, handleSubmit } = useForm<SignInFormData>();
  const { refetchAccount } = useCurrentAccount();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (params) => {
    const res = await HttpClient.request<SignInResponse>({
      method: "POST",
      url: `${APIHost.AUTH}/sign_in`,
      data: { account: params },
    });
    if (!res.data.token) return;

    navigate(routes.myPage());
    localStorage.setItem(PersistenceKeys.TOKEN, res.data.token);
    await refetchAccount();
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "無効なメールアドレスです",
            },
          })}
        />
        <input
          {...register("password", {
            required: "パスワードは必須です",
          })}
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default SignInPage;
