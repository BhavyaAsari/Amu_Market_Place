"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useState } from "react";
import { SignupValid } from "@/app/actions/signupAction";
import { useRouter } from "next/navigation";
import { redirect } from "next/dist/server/api-utils";
import { signIn } from "next-auth/react";



function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
    <button
      type="submit"
      disabled={pending}
      className="w-full text-white  bg-[#560864] hover:bg-[#7e0578] hover:cursor-pointer rounded-xl p-2 disabled:opacity-50"
    >
      {pending ? "Processing..." : "Create account"}
    </button>

    <button className="w-full text-white  bg-[#560864] hover:bg-[#7e0578] hover:cursor-pointer rounded-xl p-2 disabled:opacity-50"
         onClick={() => signIn("google",{

          prompt: "select_account",
          callbackUrl:"/",
         })}
         type="button"
        >
            Continue with Google
        </button>
    
    </>
  );
}

export function SignupForm() {
  const [state, action] = useActionState(SignupValid, {
    success: null,
    message: "",
  });

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

    const router =  useRouter();
  // Auto-hide after 3 seconds
  useEffect(() => {
    if (!state.success) return;

    toast.success(state.message);

    const timer = setTimeout(async () => {
      // Call signIn with credentials after successful signup
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });

      if (result?.ok) {
        router.push("/");
      } 
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.success, router, state.message,email,password]);

  useEffect(() => {
  if (!state.message || state.success) return;

  toast.error(state.message);
}, [state.message, state.success]);

  
  

  return (
    <>
      <h1 className="text-2xl font-bold text-white">Create an account</h1>

      <p className="mt-4 text-white text-lg">
        Already have an account?{" "}
        <Link href="/login" className="underline text-[#b313cf]">
          Login
        </Link>
      </p>

      {/* {state.message && (
        <div
          className={`mt-4 p-3 rounded text-sm text-white ${
            state.success ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {state.message}

          
        </div>
      )} */}

      <form action={action} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="fname"
            placeholder="First name"
            required
            className="text-white bg-[#323044] border border-gray-600 rounded-xl p-2"
          />
          <input
            name="lname"
            placeholder="Last name"
            required
            className="text-white bg-[#323044] border border-gray-600 rounded-xl p-2"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="text-white bg-[#323044] border border-gray-600 rounded-xl p-2 w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="text-white bg-[#323044] border border-gray-600 rounded-xl p-2 w-full"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm  Password"
          required
          className="text-white bg-[#323044] border border-gray-600 rounded-xl p-2 w-full"
        />

        <label className="flex items-center text-sm text-white">
          <input type="checkbox" name="terms" required className="mr-2" />
          I agree to{" "}
          <Link href="/terms" className="underline ml-1 text-[#cd0cef]">
            Terms
          </Link>
        </label>

        <SubmitButton />
      </form>
    </>
  );
}
