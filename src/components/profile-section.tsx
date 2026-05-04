import { FiSettings } from "react-icons/fi";
import { LuBook } from "react-icons/lu";
import { Button } from "./ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";

const ProfileUpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  state: Yup.string().min(3, "State name must be at least 3 characters"),
  city: Yup.string().min(3, "City name must be at least 3 characters"),
});

const url = import.meta.env.VITE_BACKEND_API;

interface ProfileUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  city?: string | null;
  state?: string | null;
}

interface Props {
  user: ProfileUser | null;
}

const ProfileSection = ({ user }: Props) => {
  const initialValues = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    state: user?.state ?? "",
    city: user?.city ?? "",
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 text-lg text-slate-900">
        <FiSettings />
        <h2 className="font-semibold">Profile Information</h2>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ProfileUpdateSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (!user?.id) {
            toast.error("You must be signed in to update your profile.");
            setSubmitting(false);
            return;
          }
          try {
            const token = localStorage.getItem("token");
            await axios.post(
              `${url}/user/update-profile/${user.id}`,
              values,
              token
                ? { headers: { Authorization: `Bearer ${token}` } }
                : undefined
            );
            toast.success("Profile updated successfully");
          } catch (error) {
            toast.error("Profile not updated, try again");
            console.error("Error updating profile:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-slate-700"
                >
                  First Name
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-amber-500"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Last Name
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-amber-500"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-slate-700"
                >
                  State / Region
                </label>
                <Field
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Country, State, Region…"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-amber-500"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-slate-700"
                >
                  City
                </label>
                <Field
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-amber-500"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-lg text-slate-900">
              <LuBook />
              <h3 className="font-semibold">Preferences</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="preferredGenre"
                  className="block text-sm font-medium text-slate-700"
                >
                  Preferred Genre
                </label>
                <select
                  id="preferredGenre"
                  name="preferredGenre"
                  disabled
                  className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 p-2 text-sm shadow-sm"
                >
                  <option value="">Coming soon</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="preferredPrice"
                  className="block text-sm font-medium text-slate-700"
                >
                  Preferred Price
                </label>
                <select
                  id="preferredPrice"
                  name="preferredPrice"
                  disabled
                  className="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 p-2 text-sm shadow-sm"
                >
                  <option value="">Coming soon</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-amber-600 hover:bg-amber-700 disabled:opacity-70"
            >
              {isSubmitting ? "Saving…" : "Save changes"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileSection;
