"use client";

import { toast } from "react-toastify";
import {useRef,useState} from "react";

import { resetPasswordProfile } from "@/app/actions/resetPasswordProfile";

export default function UpdatePasswordForm() {

 const isSubmitting = useRef(false);
 const [open,setOpen] = useState(false);


  async function action(formData) {
    if (isSubmitting.current) return;
    isSubmitting.current = true;


    try {
      const result = await resetPasswordProfile(formData);
    //   const toastId = toast.loading("Updating Password...");


      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Password updated successfully", );
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      isSubmitting.current = false;
    }
  }

return (
  <div>
    <section className="resetMaskConatiner">

      <div className="  font-medium flex  justify-between">

        <p className="text-2xl py-2 px-1">Change your account password</p>

        {!open ? (
            <button
        className="font-mono   hover:cursor-pointer underline"
        onClick={() => setOpen(prev => !prev)}
      >
                <p className="text-xl text-purple-700">Change Password</p>
      </button>
        ):null}

         
      </div>

 {!open ? (
  <span className="text-gray-700 tracking-widest hidden sm:block">
    ••••••••••••
  </span>
) : null}
    
    

      

      
    

    {open && (
      <div>
        <hr></hr>
         <h2 className="text-3xl font-serif mt-4 text-center">
            Reset Password
          </h2>

        <section className="resetProfileContainer ">
         
          <form action={action} className="resetPassContainer ">
            <input name="currentPassword" placeholder="Current Password" className="resetInput" type="password" required />
            <input name="newPassword" placeholder="New Password" className="resetInput" type="password" required />
            <input name="confirmPassword" placeholder="Confirm Password" className="resetInput" type="password" required />
            <div className="resetBtns">
                <button type="submit" className="resetBtn bg-purple-600 text-white ">
              Save
            </button>
             
            <button
              type="button"
              className="resetBtn"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            </div>
          </form>
        </section>
      </div>
    )}

    </section>
  </div>
);

}