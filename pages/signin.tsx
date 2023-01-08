import AuthForm from "../components/authForm";

export default function SignIn() {
  return <AuthForm mode="signin" />;
}

SignIn.authPage = true;
