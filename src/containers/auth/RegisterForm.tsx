import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { TRootState } from "../../modules";
import { changeField, initializeForm } from "../../modules/auth";

interface ILoginFormProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

function RegisterForm({ setUsername }: ILoginFormProps) {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }: TRootState) => ({
    form: auth.register,
  }));
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
  };

  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  return (
    <AuthForm
      setUsername={setUsername}
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default RegisterForm;
