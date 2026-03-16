"use client";

import LocalDropDown from "@/components/productComponents/localDropDown";
import { LuUserRoundCog, LuUserRoundPen } from "react-icons/lu";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateUsersAdmin } from "@/app/actions/adminActions/userActions/updateUser";

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
    <main className="editAdminContainer ">

      <section className=" editAdminWrapper">

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* USER DETAILS */}
          <div className="editTitleWrapper">
            <LuUserRoundPen className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
            <h2 className="text-2xl font-semibold text-white">
              User Details
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">

            {/* First Name */}
            <div className="relative">
              <label className=" editInputLabel">
                First Name
              </label>
              <input
                name="firstName"
                defaultValue={firstName}
                required
                placeholder="Enter First Name"
                className="editInput "
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="editInputLabel absolute -top-2 left-3 bg-white px-1 text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                disabled
                className="editInput"
                placeholder="Enter Email"
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <label className="editInputLabel  ">
                Last Name
              </label>
              <input
                name="lastName"
                defaultValue={lastName}
                required
                className="editInput "
                placeholder="Enter Last Name"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <label className="editInputLabel  ">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={user.phone}
                className="editInput "
                placeholder="Enter Contact No."
              />
            </div>

          </div>

          {/* Postal Code */}
          <div className="relative">
            <label className="editInputLabel   ">
              Postal Code
            </label>
            <input
              name="postalCode"
              defaultValue={user.postalCode}
              className="editInput "
              placeholder="Enter Postal Code"
            />
          </div>

          {/* ACCOUNT CONTROLS */}
          <div className="flex items-center gap-3 pt-4">
            <LuUserRoundCog className="h-13 w-13 p-2 bg-white/20 rounded-lg text-white" />
            <h2 className="text-2xl font-semibold text-white">
              Account Controls
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">

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

          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Save Changes
          </button>

        </form>

      </section>

    </main>
  );
}