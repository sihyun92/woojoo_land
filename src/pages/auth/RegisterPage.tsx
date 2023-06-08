import { Dispatch, SetStateAction } from "react";
import AuthForm from "../../components/auth/AuthForm";
import AuthTemplate from "../../components/auth/AuthTemplate";

// interface
interface IRegisterPageProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

// component
function RegisterPage({ setUsername }: IRegisterPageProps) {
  // render
  return (
    <>
      <AuthTemplate>
        <AuthForm type="register" setUsername={setUsername} />
      </AuthTemplate>
    </>
  );
}

export default RegisterPage;
