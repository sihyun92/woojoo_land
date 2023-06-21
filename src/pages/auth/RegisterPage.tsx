import { Dispatch, SetStateAction } from "react";
import AuthTemplate from "../../components/auth/AuthTemplate";
import RegisterForm from "../../containers/auth/RegisterForm";

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
        <RegisterForm setUsername={setUsername} />
      </AuthTemplate>
    </>
  );
}

export default RegisterPage;
