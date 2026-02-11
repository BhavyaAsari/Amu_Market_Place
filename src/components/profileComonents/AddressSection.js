"use client";

import { LuHouse ,LuPlus,LuMapPin, LuMapPinCheckInside, LuMapPinOff, LuLocate} from "react-icons/lu";
import { FaMapMarkedAlt,FaLocationArrow } from "react-icons/fa";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteAddress, saveAddress } from "@/app/actions/addressAction";
import { useFormStatus } from "react-dom";
import { HiLocationMarker } from "react-icons/hi";


const initialState = {
  success: false,
  message: "",
  errors: {},
};

function SubmitButton({ editing }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="resetBtn bg-purple-600 text-white">
      {pending ? "Saving..." : editing ? "Update " : "Save "}
    </button>
  );
}

export default function AddressSection({ addresses = [], user }) {
  const [state, formAction] = useActionState(saveAddress, initialState);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const SuccessWay = useRef(false);
  const formRef = useRef(null);

 useEffect(() => {
  if (state.success && !SuccessWay.current) {
    SuccessWay.current = true;
    toast.success(state.message);

    setTimeout(() => {
      setOpen(false);
      setEditingId(null);
      formRef.current?.reset();
      router.refresh();
    }, 0);
  }

  if (!state.success && state.message) {
    toast.error(state.message);
    SuccessWay.current = false;
  }
}, [state, router]);

  function startAdd() {
    setEditingId(null);
    setOpen(true);
    SuccessWay.current = false;
  }

  function startEdit(addr) {
    setEditingId(addr._id);
    setOpen(true);
    SuccessWay.current = false;
  }

  async function handleDelete(id) {
    if (!confirm("Delete this address?")) return;

    const res = await deleteAddress(id);

    if (res.success) {
      toast.success("Address deleted");
      router.refresh();
    } else {
      toast.error("Delete Failed");
    }
  }

  function handleCancel() {
    setOpen(false);
    setEditingId(null);
    formRef.current?.reset();
    SuccessWay.current = false;
  }

  return (
    <div className="addressParentContainer">
      {/* HEADER */}
      <div className="addressTitle">
        <p className="text-2xl font-bold font-serif">Save Address</p>
       <button
  onClick={startAdd}
  className="
    inline-flex items-center justify-center gap-2
    w-full sm:w-44
    bg-purple-600 text-white
     py-3
    rounded-xl
    font-semibold text-lg
    transition-all duration-200
    hover:bg-purple-700 hover:shadow-lg hover:cursor-pointer
    active:translate-y-0 active:shadow-md
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
  "
>
  <LuPlus size={30} />
  Add address
</button>

      </div>

      {/* ================= ADDRESS LIST ================= */}
      {!open && (
        <>
          {addresses.length === 0 && (
           <>
           
           
            <HiLocationMarker size={100} className="text-purple-700 ml-auto mr-auto   "></HiLocationMarker>
            <p className="text-center text-xl ">No saved addresses yet.</p>
           </>
          )}

          <section className="addressCard">
            {addresses.map((addr) => (
              <div key={addr._id} className="addressMainCards">
                <section className="flex flex-col gap-3">
                  <p>
                 {/* <LuHouse ></LuHouse>  */}
                  <span className="font-semibold text-2xl">{addr.label}</span>
                    {addr.isDefault && <span> (Default)</span>}
                  </p>
                </section>

                <div className="flex flex-col gap-2 text-lg">
                  <span className="flex titleCard">
                    Postal Code:
                    <p className="font-normal">{addr.postalCode}</p>
                  </span>
                  <span className="flex titleCard">
                    Street:
                    <p className="font-normal">{addr.street}</p>
                  </span>
                  <span className="flex titleCard">
                    City:
                    <p className="font-normal">{addr.city}</p>
                  </span>
                  <span className="flex titleCard">
                    State:
                    <p className="font-normal">{addr.state}</p>
                  </span>
                  <span className="flex titleCard">
                    Country:
                    <p className="font-normal">{addr.country}</p>
                  </span>
                </div>

                <div className="resetBtns mt-2">
                  <button
                    onClick={() => startEdit(addr)}
                    className="cartBtn bg-purple-600 hover:text-purple-600 hover:bg-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="bg-white text-black cartBtn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      )}

      {/* ================= FORM ================= */}
      {open && (
        <section className="resetProfileContainer ">
          <form action={formAction} ref={formRef} className="flex flex-col gap-2" >
                        <h1 className="text-2xl text-center font-serif font-bold">Address Form</h1>

            {editingId && (
              <input type="hidden" name="addressId" value={editingId} />
            )}

            <input
              name="label"
              placeholder="Label"
              className="resetInput "
              defaultValue={
                editingId
                  ? addresses.find((a) => a._id === editingId)?.label
                  : ""
              }
            />

            <input
              name="street"
              placeholder="Street"
              className="resetInput"
              defaultValue={
                editingId
                  ? addresses.find((a) => a._id === editingId)?.street
                  : ""
              }
            />

            <input
              name="city"
              placeholder="City"
              className="resetInput"
              defaultValue={
                editingId
                  ? addresses.find((a) => a._id === editingId)?.city
                  : ""
              }
            />

            <input
              name="state"
              placeholder="State"
              className="resetInput"
              defaultValue={
                editingId
                  ? addresses.find((a) => a._id === editingId)?.state
                  : ""
              }
            />

            <input
              name="postalCode"
              placeholder="Postal Code"
              className="resetInput"
              defaultValue={
                editingId
                  ? addresses.find((a) => a._id === editingId)?.postalCode
                  : ""
              }
            />

            <input
              name="country"
              placeholder="Country"
              className="resetInput"
              defaultValue={
                editingId
                  ? addresses.find((a) => a._id === editingId)?.country
                  : ""
              }
            />

            <label className="flex  gap-2">
              <input
                type="checkbox"
                name="isDefault"
                defaultChecked={
                  editingId
                    ? addresses.find((a) => a._id === editingId)?.isDefault
                    : false
                }
              />
              Set as default address
            </label>

            <div className="resetBtns ">
              <SubmitButton editing={!!editingId} />
              <button
                type="button"
                onClick={handleCancel}
                className="resetBtn"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
