"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ResetPasswordAction } from "@/app/actions/resetPassword";

const initialState = {
  success: null,
  message: "",
  error: "",
};

export default function ResetPassword({ token }) {
  const router = useRouter();

  // 🔥 TOKEN IS CLOSED OVER HERE
  const resetAction = async (prevState, formData) => {
    return ResetPasswordAction(prevState, formData, token);
  };

  const [state, formAction] = useActionState(
    resetAction,
    initialState
  );

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
      setTimeout(() => router.push("/login"), 2000);
    }

    if (state.success === false) {
      toast.error(state.error);
    }
  }, [state.success, state.message, state.error, router]);

  return (
    <section className="resetContainer">
      <form action={formAction} className="formContainer">
        <h1 className="resetHeader">Reset Password</h1>

        <input
          type="password"
          name="password"
          placeholder="New Password"
          required
          className="inputForget"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="inputForget"
        />

        <button type="submit" className="authButton">
          Reset Password
        </button>
      </form>
    </section>
  );
}
