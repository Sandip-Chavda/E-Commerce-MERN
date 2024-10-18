import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  function onSubmit() {}

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-red-500">
          Login To Your Account
        </h1>
        <p className="mt-2">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-red-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        buttonText={"Login"}
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;
