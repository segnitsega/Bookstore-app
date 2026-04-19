import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "sonner";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const url = import.meta.env.VITE_BACKEND_API;
  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 via-white to-white px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-amber-100 bg-white p-6 shadow-xl shadow-amber-100/50 md:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            Sign in to continue your reading journey.
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitError("");
            try {
              const response = await axios.post(`${url}/user/login`, values);
              login(response.data.accessToken);
              toast.success("Login successful!");
              navigate("/dashboard");
            } catch (error) {
              const message = axios.isAxiosError(error)
                ? error.response?.data?.message ?? "Invalid email or password."
                : "Unable to sign in right now. Please try again.";

              setSubmitError(message);
              toast.error(message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 border-gray-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-10 border-gray-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {submitError && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-full cursor-pointer bg-amber-600 font-medium text-white hover:bg-amber-700"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-gray-100 pt-5">
          <span className="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700">
            Forgot your password?
          </span>
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/"
              className="font-medium text-amber-600 transition-colors hover:text-amber-700"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
