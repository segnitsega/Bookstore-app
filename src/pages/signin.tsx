import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "sonner"

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

  return (
    <div className="h-screen flex p-10 justify-center ">
      <div className=" rounded-lg p-6 shadow-md w-[500px]">
        <div className="flex flex-col items-center mb-6">
          <h1 className=" text-3xl font-bold mb-2">Sign In</h1>
          <span className="text-gray-500">Welcome back to BookHub</span>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post(
                `${url}/api/user/login`,
                values
              );
              login(response.data.accessToken);
              toast("Login successful!")
              navigate("/dashboard");
              console.log("Sign in successful:", response.data);
            } catch (error) {
              toast("Error")
              console.log(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 w-full border border-gray-300 px-3 py-1 rounded-md "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 w-full border border-gray-300 px-3 py-1 rounded-md"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-600 cursor-pointer"
              >
                { isSubmitting  ? "Signing in.." : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="flex flex-col gap-2 mt-2 items-center ">
          <span className="text-amber-600 text-sm cursor-pointer">
            Forgot your password?
          </span>
          <span className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/" className="text-amber-600 cursor-pointer">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
