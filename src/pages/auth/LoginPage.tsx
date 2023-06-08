import { Dispatch, SetStateAction } from "react";
import AuthTemplate from "../../components/auth/AuthTemplate";
import AuthForm from "../../components/auth/AuthForm";

// interface
interface ILoginPageProps {
  setUsername: Dispatch<SetStateAction<string>>;
}

// component
function LoginPage({ setUsername }: ILoginPageProps) {
  // render
  return (
    <>
      <AuthTemplate>
        <AuthForm type="login" setUsername={setUsername} />
      </AuthTemplate>
    </>
  );
}

export default LoginPage;
