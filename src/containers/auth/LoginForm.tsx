import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { TRootState } from "../../modules";
import { changeField, initializeForm } from "../../modules/auth";

function LoginForm() {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }: TRootState) => ({
    form: auth.login,
  }));
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
    // 구현 예정
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

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
