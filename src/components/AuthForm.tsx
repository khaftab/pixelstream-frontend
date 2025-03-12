"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "./CustomFormField";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type AuthFormProps = {
  isSigninPage: boolean;
};

export default function AuthForm({ isSigninPage }: AuthFormProps) {
  const { signUp, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z.string().min(3, "Email is required").email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (isSigninPage) {
      await signIn(values.email, values.password);
      setLoading(false);
    } else {
      await signUp(values.email, values.password);
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="mx-auto max-w-sm w-full faded-bg backdrop-blur-[2px] my-16 font-sans">
        {isSigninPage ? (
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
        )}

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <CustomFormField
                    type="text"
                    form={form}
                    name="email"
                    label="Email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <CustomFormField
                    form={form}
                    name="password"
                    label="Password"
                    placeholder="john1234"
                    type="password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {isSigninPage ? "Sign In" : "Sign Up"}
                </Button>
              </div>
              {isSigninPage ? (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href={"/signup"} className="underline">
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href={"/signin"} className="underline">
                    Sign in
                  </Link>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
