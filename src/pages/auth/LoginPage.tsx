import { Dispatch, SetStateAction } from "react";
import AuthTemplate from "../../components/auth/AuthTemplate";
import LoginForm from "../../containers/auth/LoginForm";

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
        <LoginForm setUsername={setUsername} />
      </AuthTemplate>
    </>
  );
}

export default LoginPage;
