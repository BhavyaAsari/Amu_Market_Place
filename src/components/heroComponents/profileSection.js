"use client";

/*
  This component runs on the client because:
  - It uses useState, useRef
  - It handles form inputs, file selection, and UI interaction
*/
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

// Server Action used ONLY for database update
// Image upload is handled separately via API route
import { UpdateProfile } from "@/app/actions/profileAction";
import { useRouter } from "next/navigation";

/*
  Static list for country dropdown
  This avoids hardcoding values in JSX
*/
const COUNTRY_META = {
  India: { code: "+91", length: 10 },
  "United States": { code: "+1", length: 10 },
  "United Kingdom": { code: "+44", length: 10 },
  Canada: { code: "+1", length: 10 },
  Australia: { code: "+61", length: 9 },
};
export default function ProfileSec({ user }) {
  /*
    editing:
    - false → view mode (inputs disabled)
    - true  → edit mode (inputs enabled)
  */
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  /*
    loading:
    - prevents double submission
    - disables Save button while request is in progress
  */
  const [loading, setLoading] = useState(false);

  /*
    selectedFile:
    - stores the actual File object from <input type="file">
    - required for uploading image to Cloudinary
  */
  const [selectedFile, setSelectedFile] = useState(null);

  /*
    fileInputRef:
    - used to manually reset file input
    - required because file inputs cannot be controlled by React state
  */
  const fileInputRef = useRef(null);

  /*
    formData:
    - holds editable profile fields
    - initialized from server-provided user data
  */

  //Phone Errors
  const [phoneError, setPhoneError] = useState("");

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    dialCode: "",
    country: user.country || "",
    postalCode: user.postalCode || "",
    image: user.image || "",
  });

  const COUNTRIES = Object.keys(COUNTRY_META);
  /*
    Generic change handler for text/select inputs
    Uses input name attribute to update matching field in state
  */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  /*
    Handles image selection:
    - Stores file in state (for upload)
    - Generates temporary preview URL for UI
    - Preview URL is NOT saved to database
  */
  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: previewUrl }));
  }

  /*
    Uploads image to Cloudinary via API route
    Returns Cloudinary URL on success
    Returns null on failure
  */
  async function uploadImage(file) {
    try {
      const data = new FormData();
      data.append("image", file);

      const res = await fetch("/api/uploads", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        toast.error(result.message || "Image upload failed");
        return null;
      }

      return result.url;
    } catch (err) {
      console.error(err);
      toast.error("Image upload error");
      return null;
    }
  }

  /*
    Form submission flow:
    1. Upload image if a new file is selected
    2. Get Cloudinary URL
    3. Call Server Action to update DB
    4. Show toast feedback
  */
  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent duplicate submissions
    if (loading) return;

    try {
      setLoading(true);

      /*
        Default to existing image
        This ensures image is not overwritten if user didn't change it
      */
      let imageUrl = user.image || "";

      /*
        Upload image only if user selected a new one
      */
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile);
        if (!uploadedUrl) return;
        imageUrl = uploadedUrl;
      }

      /*
        Server Action updates database
        Server Action uses session to identify user
      */
      const res = await UpdateProfile({
        username: formData.username,
        phone: formData.phone,
        country: formData.country,
        postalCode: formData.postalCode,
        image: imageUrl,
      });

      // console.log("response", res);

      if (!res?.success) {
        toast.error(res?.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully");
      router.refresh();

      /*
        Reset edit state after successful update
      */
      setEditing(false);
      setSelectedFile(null);

      // Reset file input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again");
    } finally {
      setLoading(false);
    }
  }

  //Handle Country Change
  function handleCountryChange(e) {
    const selectedCountry = e.target.value;

    const meta = COUNTRY_META[selectedCountry];

    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      dialCode: meta ? meta.code : "",
      phone: "",
    }));

    setPhoneError("");
  }

  //PhoneChnage
  function handlePhoneChange(e) {
    const value = e.target.value.replace(/\D/g, "");
    const meta = COUNTRY_META[formData.country];

    setFormData((prev) => ({ ...prev, phone: value }));

    if (!meta) {
      setPhoneError("Select Country First");
      return;
    }

    if (value.length !== meta.length) {
      setPhoneError(`Phone number must be ${meta.length} digits`);
    } else {
      setPhoneError("");
    }
  }
  /*
    Cancels editing:
    - Removes file input value
    - Exits edit mode
    
    NOTE: Form resets on page refresh because it's initialized from 'user' prop.
    The user prop comes from server, so it updates when page refreshes.
    Solution: Use database fetch or SWR/React Query to keep user data in sync.
  */
  function handleCancel() {
    // Restore original user data
    setFormData({
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      country: user.country || "",
      postalCode: user.postalCode || "",
      image: user.image || "",
    });

    // Clear the selected file
    setSelectedFile(null);

    // Reset file input value (file inputs can't be controlled by React)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Exit edit mode
    setEditing(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <main className="profile-container">
        {/* Profile image with fallback */}
        <div className="profile-header">
         <section className="profile-avatar">
           <Image
            src={formData.image || "/user.jpg"}
            alt="Profile"
            fill
            priority
            quality={100}
            className="object-cover  rounded-full"
          />
         </section>

          {/* File input shown only in edit mode */}
          {editing && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          )}

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="btn-edit self-start"
            >
              edit
            </button>
          )}
        </div>
        <section className="profile-section">
        {!editing ? (
          <div className="flex mt-4 mb-4 flex-col sm:flex-row  sm:items-center sm:gap-6 gap-1">
            {/* <span className="w-40 text-gray-600 font-medium">Name</span> */}
            <span className="text-3xl font-bold">
              {formData.username || "_"}
            </span>
          </div>
        ) : (
          // <input
          //   name="username"
          //   value={formData.username}
          //   onChange={handleChange}
          //   disabled={!editing}
          //   placeholder="Username"
          //   className="w-55 border rounded-2xl flex flex-col p-1 hover:cursor-pointer mt-5 ml-9 items-center  gap-3  "
          // />

          <div className="relative form-field">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" "
              disabled={!editing}
              className="
      peer
      w-full
      border
      rounded-lg
      mt-4
      px-3
      pt-5
      pb-2
      text-black
      focus:outline-none
      focus:ring-2
      focus:ring-purple-500
      disabled:bg-gray-100
    "
            />

            <label
              className="
      absolute
      left-3
      top-2
      text-sm
          font-bold
      text-gray-800/90
      bg-white
      px-1
      transition-all
      peer-placeholder-shown:top-4
      peer-placeholder-shown:text-base
      peer-placeholder-shown:text-gray-400
      peer-focus:top-2
      peer-focus:text-sm
      peer-focus:text-black
    "
            >
              Full name
            </label>
          </div>
        )}

        {/* email user */}
        {editing ? (
          <></>
        ) : (
          <>
            <div className="profile-row">
              <span className="profile-label">AMU ID</span>
              <span>{formData.email}</span>
            </div>
          </>
        )}

        {!editing ? (
          <div className="profile-row">
            <span className="profile-label">Country</span>
            <span>{formData.country || "_"}</span>
          </div>
        ) : (
          <div className="relative w-75 mt-2 mb-1">
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              disabled={!editing}
              className="peer w-full mt-2 appearance-none border border-gray-300 rounded-lg px-3 pt-5 pb-2 bg-white text-black focus:outline-none focus:border-purple-600 disabled:bg-gray-100"
            >
              <option value="" disabled hidden>India</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="absolute left-3 top-2 font-bold
      text-gray-800/90 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-black">
              Country
            </label>

            <span className="absolute right-3 top-4 text-gray-400 pointer-events-none">
              ▼
            </span>
          </div>
        )}
       
  {!editing ? (

  <div className="profile-row ">
    <span className="profile-label">
      Phone
    </span>

    <span className="text-black">
      {formData.phone
        ? `${COUNTRY_META[formData.country]?.code || ""} ${formData.phone}`
        : "_"}
    </span>
  </div>
) : (
  <div className="relative w-full sm:w-72">
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handlePhoneChange}
      placeholder=" "
      className="
        peer
        w-full
        border
        rounded-lg
        px-3
        mt-4
        pt-5
        pb-2
        text-gray-900
        focus:outline-none
        focus:ring-2
        focus:ring-purple-500
      "
    />

    <label
      className="
        absolute
        left-3
        top-2
        text-sm
       font-bold
      text-gray-800/90
        bg-white
        px-1
        transition-all
        peer-placeholder-shown:top-4
        peer-placeholder-shown:text-base
        peer-placeholder-shown:text-gray-400
        peer-focus:top-1
        peer-focus:text-sm
        peer-focus:text-black
      "
    >
      Phone{" "}
      {formData.country && (
        <span className="text-gray-400">
          ({COUNTRY_META[formData.country]?.code})
        </span>
      )}
    </label>

    {phoneError && (
      <p className="text-red-500 text-xs mt-1">
        {phoneError}
      </p>
    )}
  </div>
)}

       

        {!editing ? (
          <div className="profile-row">
            <span className="profile-label">Postal Code</span>
            <span>{formData.postalCode || "_"}</span>
          </div>
        ) : (
          // <input
          //   name="postalCode"
          //   className="w-55 border rounded-2xl p-1 hover:cursor-pointer mt-2 ml-9 items-center "
          //   value={formData.postalCode}
          //   onChange={handleChange}
          //   disabled={!editing}
          //   placeholder="Postal Code"
          // />

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder=" "
              disabled={!editing}
              className="
      peer
      w-full
      border
       mt-4
      rounded-lg
      px-3
      pt-5
      pb-2
      text-black
      focus:outline-none
      focus:ring-2
      focus:ring-purple-500
      disabled:bg-zinc-800/80
    "
            />

            <label
              className="
      absolute
      left-3
      top-2
      text-sm
        font-bold
      text-gray-800/90
      bg-white
      px-1
      transition-all
      peer-placeholder-shown:top-4
      peer-placeholder-shown:text-base
      peer-placeholder-shown:text-gray-400
      peer-focus:top-2
      peer-focus:text-sm
      peer-focus:text-black
    "
            >
              PostalCode
            </label>
          </div>
        )}

        {/* Action buttons */}
        {editing && (
          <div className="profile-actions">
            <button
              type="submit"
              className="btn-primary "
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              className="btn-danger"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
</section>
      </main>
    </form>
  );
}
