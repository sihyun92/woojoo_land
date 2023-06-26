import AuthTemplate from "../../components/auth/AuthTemplate";
import RegisterForm from "../../containers/auth/RegisterForm";

// component
function RegisterPage() {
  // render
  return (
    <>
      <AuthTemplate>
        <RegisterForm />
      </AuthTemplate>
    </>
  );
}

export default RegisterPage;
