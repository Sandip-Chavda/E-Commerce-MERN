import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data.payload?.success) {
        toast({
          title: `${data.payload?.message}`,
          description: `Success: ${data.payload?.success}`,
        });

        navigate("/auth/login");
      } else {
        toast({
          title: `${data?.payload?.message}`,
          description: `Success: ${data.payload?.success}`,
          variant: "destructive",
        });
      }
    });
  }

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
