import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      // console.log(data)
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          description: "Success : " + data?.payload?.success,
        });
      } else {
        toast({
          title: data?.payload?.message,
          description: "Success : " + data?.payload?.success,
          variant: "destructive",
        });
      }
    });
  }

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
