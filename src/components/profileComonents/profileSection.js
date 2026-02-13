"use client";

/*
  This component runs on the client because:
  - It uses useState, useRef
  - It handles form inputs, file selection, and UI interaction
*/
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { LuPencil, LuPenLine } from "react-icons/lu";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineHashtag } from "react-icons/hi2";

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
        <section className="profile-section">
          {/* Hidden file input - accessible in both view and edit modes */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            ref={fileInputRef}
            className="hidden"
          />

          {!editing ? (
            // View Mode - Professional Card Layout
            <div className="w-full">
              {/* Header with background banner */}
              <div className="profile-banner">
                <Image
                  src="/banner.png"
                  alt="Banner"
                  fill
                  className="object-cover opacity-40"
                />
              </div>

              {/* Profile Card Container */}
              <div className="profile-info-wrapper">
                {/* Profile Header with Avatar, Name, and Edit Button */}
                <div className="profile-header-row">
                  {/* Avatar with purple border */}
                  <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-image">
                      <Image
                        src={formData.image || "/user.jpg"}
                        alt="Profile"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                      />
                    </div>
                    {/* Change Picture Button on Avatar */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      type="button"
                      className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition shadow-lg"
                      title="Change Profile Picture"
                    >
                      <LuPenLine size={16} />
                    </button>
                  </div>

                  {/* Profile Info */}
                  <div className="profile-name-section">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="profile-name-title">
                          {formData.username || "_"}
                        </h2>
                      </div>
                      <button
                        onClick={() => setEditing(true)}
                        type="button"
                        className="profile-edit-btn"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info Cards Grid */}
                <div className="profile-cards-grid">
                  {/* Contact Information Card */}
                  <div className="profile-card">
                    <div className="profile-card-header">
                      <HiOutlineEnvelope className="profile-card-icon" />
                      <p className="profile-card-label">Email</p>
                    </div>
                    <p className="profile-card-value">{formData.email || "_"}</p>
                  </div>

                  {/* Phone Card */}
                  <div className="profile-card">
                    <div className="profile-card-header">
                      <HiOutlinePhone className="profile-card-icon" />
                      <p className="profile-card-label">Phone</p>
                    </div>
                    <p className="profile-card-value">
                      {formData.phone
                        ? `${COUNTRY_META[formData.country]?.code || ""} ${formData.phone}`
                        : "_"}
                    </p>
                  </div>

                  {/* Location & ID Card */}
                  <div className="profile-card">
                    <div className="profile-card-header">
                      <HiOutlineMapPin className="profile-card-icon" />
                      <p className="profile-card-label">Location & ID</p>
                    </div>
                    <p className="profile-card-value">
                      {formData.country || "_"}, {formData.postalCode || "_"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode - Like image 1 with grid layout
            <div className="w-full">

              <h2 className="profile-form-title text-center">My Profile</h2>
              
              {/* Profile Picture Upload Section */}
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="profile-avatar-image-edit">
                  <Image
                    src={formData.image || "/user.jpg"}
                    alt="Profile"
                    fill
                    priority
                    quality={100}
                    className="object-cover"
                  />
                </div>
                
                {/* Change Picture Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="profile-btn-submit w-full max-w-xs"
                >
                  Choose Photo
                </button>
                {selectedFile && (
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {selectedFile.name} selected
                  </p>
                )}
              </div> 
                           

              {/* Row 1: First Name & Email */}
              <div className="profile-form-row">
                <div className="profile-field-wrapper">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder=" "
                    className="profile-input peer"
                  />
                  <label className="profile-label-float">
                    First Name
                  </label>
                </div>

                <div className="profile-field-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    placeholder=" "
                    className="profile-input peer disabled:bg-gray-100 disabled:text-gray-600"
                  />
                  <label className="profile-label-float">
                    Email Address
                  </label>
                </div>
              </div>

              {/* Row 2: Country & Phone */}
              <div className="profile-form-row">
                <div className="profile-field-wrapper">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="profile-select peer"
                  >
                    <option value="" disabled hidden></option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <label className="profile-label-float">
                    Country
                  </label>
                  <span className="profile-select-arrow">
                    ▼
                  </span>
                </div>

                <div className="profile-field-wrapper">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder=" "
                    className="profile-input peer"
                  />
                  <label className="profile-label-float">
                    Phone Number
                  </label>
                  {phoneError && (
                    <p className="profile-error">{phoneError}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Postal Code */}
              <div className="profile-postal-wrapper">
                <div className="profile-field-wrapper">
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder=" "
                    className="profile-input peer"
                  />
                  <label className="profile-label-float">
                    Postal Code
                  </label>
                </div>
              </div>

              {/* Action buttons */}
              <div className="profile-buttons-wrapper">
                <button
                  type="submit"
                  className="profile-btn-submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  className="profile-btn-cancel"
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
