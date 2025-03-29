import * as Yup from "yup";
import { minLength, required } from "../../constant/schemesMessages.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { setAuth } from "../../utils/getAuth.ts";
import { userApi } from "../../api/userApi.ts";
import { fetchById } from "../../utils/fetch.ts";
import { useAtomValue } from "jotai/index";
import { queryClientAtom } from "jotai-tanstack-query";
import { useCurrentUserKeys } from "../../atoms/atoms.ts";

export const useLoginPage = () => {

  const queryClient = useAtomValue(queryClientAtom);
  const userKeys = useCurrentUserKeys();

  const initialValues = {
    login: "",
    password: "",
  };

  const schema = yupResolver(
    Yup.object().shape({
      login: Yup.string().required(required).min(3, minLength(3)),
      password: Yup.string().required(required).min(4, minLength(4)),
    })
  );

  const onSubmit = async ({ login, password }: typeof initialValues) => {
    setAuth(login, password);
    const user = await fetchById(() => userApi().me());
    queryClient.invalidateQueries({ queryKey: userKeys });

    console.log(user)
    // if (user) navigate(tasks);
  };

  return {
    initialValues,
    schema,
    onSubmit,
  };
};
