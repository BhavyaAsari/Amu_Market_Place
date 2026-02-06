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
            <label className="cursor-pointer text-lg  underline">
              Change Photo
              <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />
            </label>
          )}

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              type="button"
              className="btn-edit self-start"
            >
              edit
            </button>
          )}
        </div>
        <section className="profile-section">
          {!editing ? (
            // View Mode - Like image 2
            <div className="w-full space-y-4">
              <h2 className="text-4xl font-serif font-bold text-black">
                {formData.username || "_"}
              </h2>
              <div className="profile-row">
                <span className="profile-label">AMU ID</span>
                <span className="text-black">{formData.email}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Country</span>
                <span className="text-black">{formData.country || "_"}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Phone</span>
                <span className="text-black">
                  {formData.phone
                    ? `${COUNTRY_META[formData.country]?.code || ""} ${formData.phone}`
                    : "_"}
                </span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Postal Code</span>
                <span className="text-black">{formData.postalCode || "_"}</span>
              </div>
            </div>
          ) : (
            // Edit Mode - Like image 1 with grid layout
            <div className="w-full">
              <h2 className="text-2xl font-bold text-black mb-6">My Profile</h2>
              
              {/* Row 1: First Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=" "
                    className="
                      peer
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      px-4
                      pt-5
                      pb-2
                      text-black
                      bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                      focus:border-transparent
                    "
                  />
                  <label className="absolute left-4 top-2 text-sm font-semibold text-gray-700 bg-white px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600">
                    First Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    placeholder=" "
                    className="
                      peer
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      px-4
                      pt-5
                      pb-2
                      text-black
                      bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                      focus:border-transparent
                      disabled:bg-gray-100
                      disabled:text-gray-600
                    "
                  />
                  <label className="absolute left-4 top-2 text-sm font-semibold text-gray-700 bg-white px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600">
                    Email Address
                  </label>
                </div>
              </div>

              {/* Row 2: Country & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="
                      peer
                      w-full
                      appearance-none
                      border
                      border-gray-300
                      rounded-lg
                      px-4
                      pt-5
                      pb-2
                      text-black
                      bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                      focus:border-transparent
                    "
                  >
                    <option value="" disabled hidden></option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <label className="absolute left-4 top-2 text-sm font-semibold text-gray-700 bg-white px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600">
                    Country
                  </label>
                  <span className="absolute right-4 top-3.5 text-gray-400 pointer-events-none text-lg">
                    ▼
                  </span>
                </div>

                <div className="relative">
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
                      border-gray-300
                      rounded-lg
                      px-4
                      pt-5
                      pb-2
                      text-black
                      bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                      focus:border-transparent
                    "
                  />
                  <label className="absolute left-4 top-2 text-sm font-semibold text-gray-700 bg-white px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600">
                    Phone Number
                  </label>
                  {phoneError && (
                    <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Postal Code */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder=" "
                    className="
                      peer
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      px-4
                      pt-5
                      pb-2
                      text-black
                      bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-purple-500
                      focus:border-transparent
                    "
                  />
                  <label className="absolute left-4 top-2 text-sm font-semibold text-gray-700 bg-white px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-600">
                    Postal Code
                  </label>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn-primary flex-1 text-lg"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  className="btn-primary flex-1 bg-white text-black border-2 border-gray-300"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </form>
  );
}
