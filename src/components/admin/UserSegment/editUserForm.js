"use client";

import LocalDropDown from "@/components/productComponents/localDropDown";
import { LuUserRoundCog, LuUserRoundPen } from "react-icons/lu";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateUsersAdmin } from "@/app/actions/adminActions/updateUser";

export default function EditUserForm({ user }) {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Blocked", value: "blocked" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      postalCode: formData.get("postalCode"),
      role,
      status,
    };

    const result = await updateUsersAdmin(user._id, data);

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("User updated successfully");
    }
  }

  const firstName = user.username?.split(" ")[0] || "";
  const lastName = user.username?.split(" ")[1] || "";

  return (
    <main className="profile-container   flex justify-center mt-4 p-4 shadow-xl">
      <section>
        <form
          onSubmit={handleSubmit}
          className="formContainer  bg-linear-to-b from-purple-400 via-violet-600 to-purple-800"
        >
          <div className="flex gap-4">
            <LuUserRoundPen className="icons-AdminMenu h-13 w-13" />
            <h2 className="profile-form-title text-white font-semibold text-3xl mt-2">
              User Details
            </h2>
          </div>
         
            <input
              name="firstName"
              className="profile-input"
              placeholder="First Name"
              defaultValue={firstName}
              required
            />

            <input
              name="lastName"
              className="profile-input"
              placeholder="Last Name"
              defaultValue={lastName}
              required
            />

            <input
              name="email"
              type="email"
              className="profile-input"
              defaultValue={user.email}
              disabled
            />

            <input
              type="tel"
              name="phone"
              className="profile-input"
              placeholder="Contact No."
              defaultValue={user.phone}
            />

            <input
              name="postalCode"
              className="profile-input"
              placeholder="Postal Code"
              defaultValue={user.postalCode}
            />
          {" "}
          <div className="flex gap-4 mt-6">
            <LuUserRoundCog className="icons-AdminMenu h-13 w-13" />
            <span className="profile-form-title text-white font-semibold text-3xl mt-2">
              Account Controls
            </span>
          </div>
          <LocalDropDown
            label="Role"
            options={roleOptions}
            value={role}
            onChange={setRole}
          />
          <LocalDropDown
            label="Status"
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </section>
    </main>
  );
}
