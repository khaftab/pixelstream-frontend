import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in - Pixelstream",
  description: "Pixelstream Sign in page",
};

const SigninPage = () => {
  return <AuthForm isSigninPage={true} />;
};

export default SigninPage;
