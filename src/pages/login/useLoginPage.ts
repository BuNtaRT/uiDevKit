import * as Yup from "yup";
import { minLength, required } from "../../constant/schemesMessages.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { setAuth } from "../../utils/getAuth.ts";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi.ts";
import { fetchById } from "../../utils/fetch.ts";

export const useLoginPage = () => {
  const navigate = useNavigate();

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
    if (user) navigate("");
  };

  return {
    initialValues,
    schema,
    onSubmit,
  };
};
