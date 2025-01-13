import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { login } from "../store/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";

function LoginPanel() {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);
    const login= async(data)=>{
        setError("");
        try{
            const userSession = await authservice.login(data);
            if(userSession){
                const userData=await authservice.getCurrentUser();
                if(userData){
                    dispatch(login(userData));
                    navigate("/");
            }
        }
        }
        catch(error){
            setError(error.message);
    }
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign in{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
}

export default LoginPanel;
