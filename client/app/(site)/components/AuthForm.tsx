"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    const data = {
      username,
      password,
    };
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("http://localhost:5000/auth/signup", data)
        .then((callback) => {
          if (callback?.data?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.data?.ok) {
            toast.success("Account created successfully!");
            router.push("/home");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      axios.post("http://localhost:5000/auth/signin", data).then((callback) => {
        if (callback?.data?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.data?.ok) {
          toast.success("Logged in successfully!");
          router.push("/home");
        }
      });
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={onSubmit}>
          <input
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="text-black"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
