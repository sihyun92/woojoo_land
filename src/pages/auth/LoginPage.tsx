import AuthTemplate from "../../components/auth/AuthTemplate";
import LoginForm from "../../containers/auth/LoginForm";

// component
function LoginPage() {
  // render
  return (
    <>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </>
  );
}

export default LoginPage;
