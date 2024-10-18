import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);

  function onSubmit() {}

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-red-500">
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-red-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        buttonText={"Create Account"}
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Signup;
