import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up - Pixelstream",
  description: "Pixelstream Sign up page",
};

const SignupPage = () => {
  return <AuthForm isSigninPage={false} />;
};

export default SignupPage;
