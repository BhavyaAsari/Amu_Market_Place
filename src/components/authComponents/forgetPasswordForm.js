"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import Link from "next/link";
import { ForgetPasswordAction } from "@/app/actions/forgetPassword";

const initialState = {
  success: null,
  message: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="authButton" disabled={pending}>
      {pending ? "Sending..." : "Reset Link"}
    </button>
  );
}

export default function ForgetPasswordForm({ onBack }) {
  const [state, formAction] = useActionState(
    ForgetPasswordAction,
    initialState
  );

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
      setTimeout(onBack, 2000);
    }

    if (state.success === false) {
      toast.error(state.error || state.message);
    }
  }, [state.success, state.message, state.error, onBack]);

  return (
    <>
     

     <main className="resetContainer">
       <form action={formAction} className="mt-6 space-y-4 formContainer">
         <h1 className="text-2xl font-bold text-white text-center">
        Forgot Password
      </h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          required
          className="inputForget"
        />

        <SubmitButton />

        <p  className="text-white text-xl cursor-pointer font-bold text-center underline">
           <Link href="/login">Back to login</Link>
        </p>
      </form>
     </main>
    </>
  );
}
