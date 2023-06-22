import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { changeField, initializeForm, register } from "../../modules/auth";

function RegisterForm() {
  // hooks
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));

  // 함수
  const onChange = (event: FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(register({ email, password }));
  };

  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("오류 발생!", authError);
      return;
    }
    if (auth) {
      console.log("회원가입 성공!", auth);
    }
  }, [auth, authError]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default RegisterForm;
