import { Button } from "@/components/ui/button";
import axios from "axios";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  const url = import.meta.env.VITE_BACKEND_API;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center bg-white rounded-lg">
      <div className=" rounded-lg p-6 shadow-md w-[500px]">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text- text-3xl font-bold mb-2">Create Your Account</h1>
          <span className="text-gray-500">
            Start your literary journey with us today
          </span>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, {setSubmitting}) => {
            console.log("Form data:", values);
            console.log(url);
            try {
              const response = await axios.post(
                `${url}/api/user/signup`,
                values
              );
              localStorage.setItem("token", response.data.accessToken);
              navigate("/dashboard");
              console.log("Sign up successful:", response.data);
            } catch (error) {
              console.error("Error during sign up:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form className="space-y-6">
            <div className="flex gap-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Segni"
                  className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md "
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Tsega"
                  className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md "
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="segni@gmail.com"
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md "
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
                placeholder="create password"
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                  placeholder="confirm password"

                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-600 cursor-pointer"
            >
              Sign up
            </Button>
          </Form>
        </Formik>

        <div className="flex flex-col gap-2 mt-8 items-center border-t pt-2">
        
          <span className="text-gray-500 ">
            Already have an account?
            <Link to="/signin" className="text-amber-600 cursor-pointer"> Sign In Here</Link>
          </span>

          <p className="text-gray-500 text-center my-4">By creating an account, you agree to our <span className="text-amber-500">Terms of Service</span> and <span className="text-amber-500">Privacy Policy</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
