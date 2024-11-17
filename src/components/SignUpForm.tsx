import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "@/lib/auth-service";
import { handleError } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import LoadingSpinner from "./LoadingSpinner";

const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(8, { message: "Username must have at least 8 characters." })
      .toLowerCase(),
    email: z.string().email({ message: "E-mail is required." }).toLowerCase(),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must have at least 8 characters." })
      .max(14),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: "Password must have at least 8 characters." })
      .max(14),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUpSchema) => {
    setIsLoading(true);

    try {
      await authService.signUp(data.username, data.email, data.password);
      await authService.signIn(data.username, data.password);

      setIsRedirecting(true);

      window.location.replace("/discovery");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isRedirecting) {
    return (
      <LoadingSpinner
        classesContainer="fixed top-0 left-0 w-full h-full flex-grow min-h-screen flex flex-col justify-items-center bg-gray-400 z-50"
        classesSpinner="border-black"
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <div className="mb-4">
        <input
          disabled={isLoading}
          type="text"
          placeholder="Username"
          {...register("username")}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          disabled={isLoading}
          type="text"
          placeholder="E-mail"
          {...register("email")}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          disabled={isLoading}
          type="password"
          placeholder="Password"
          {...register("password")}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          disabled={isLoading}
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          className={`w-full p-3 border rounded-lg outline-none ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button variant="formActive" size={"form"} disabled={isLoading}>
        {isLoading ? (
          <LoadingSpinner classesSpinner="h-5 w-5 border-2" />
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
