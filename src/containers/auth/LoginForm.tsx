import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { TRootState } from "../../modules";
import { changeField, initializeForm, login } from "../../modules/auth";
import { check } from "../../modules/user";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, auth, authError, user } = useSelector(
    ({ auth, user }: TRootState) => ({
      form: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );
  const onChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = form;
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생!");
      console.log(authError);
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check());
      navigate("/");
    }
  }, [auth, authError, navigate, dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default LoginForm;
