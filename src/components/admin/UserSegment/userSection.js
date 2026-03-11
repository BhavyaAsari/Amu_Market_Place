"use client";

import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import Table from "../Reusable_Components/Table";
import { LuPencil } from "react-icons/lu";
import { LuBan } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/router";

export default function UserSegment({ users }) {

  const formattedRows = users.map((user, index) => ({
    id: user._id,
    image:user.image,
    number: index + 1,
    name: user.username || user.email.split("@")[0],
    email: user.email,
    provider: user.provider,
    status: user.status || "active",
    joined: new Date(user.createdAt).toLocaleDateString()
  }));

   const initial = users.username?.charAt(0).toUpperCase();
   console.log("initial",initial)

   const router = useRouter();

  const columns = [
    { key: "image", label: "#",

        render:(value,row) => {

         

            return (

                <div>
                
                {row.image ? (

                     <div className="relative w-15 h-15 ">
                        <Image
                        fill
                    src={row.image}
                    alt="user"
                    className="rounded-full object-cover"/>
                    </div>
                ):(
            <div className="relative w-15 h-15 ">
                        <Image
                        fill
                    src="/default.png"
                    alt="user"
                    className="rounded-full object-cover"/>
                    </div>
          

                )}

                

                </div>
            )
        }
     },

    { key: "name", 
      label: "Name",
      render:(value) => (

        <span className="font-bold text-sm text-gray-800">{value}</span>
      )},

    { key: "email", label: "Email",
        render:(value) => (

        <span className="font-semibold text-sm text-purple-700">{value}</span>
      )
     },

    {
      key: "provider",
      label: "Provider",
      render: (value) => {

       if(value === "google") {

         return (

            <div className="items-center flex bg-purple-200 rounded-lg p-1 gap-2">
                <FcGoogle size={30}/>
                <span className="text-[15px]">Google</span>
            </div>
        )
       } 

        return (
      <div className="flex rounded-lg bg-violet-200 items-center p-1 gap-2">
        <MdEmail size={30} className="text-purple-600" />
        <span className="text-[15px] font-sans">Email</span>
      </div>
    );
       

      }


      
      
      
    },

    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {value}
        </span>
      )
    },

    { key: "joined", label: "Joined on" },

    {key: "actions", label: "Actions",
     render: (_,row) => (

        <div className="flex items-center gap-2">
            <button className="BtnAction text-purple-500 hover:text-purple-800
            "
            onClick={() => router.push(`/admin/Users/edit/${row.id}`)}>

                <LuPencil size={18} />

            </button>
            <button className="BtnAction text-red-600 hover:text-red-800">

                <LuBan size={18}/>

            </button>
        </div>
     )
    }
  ];


  return (
    <main>
     <div className="mb-6">
  <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
  <p className="text-gray-500 text-sm">
    Manage all registered users.
  </p>
</div>
      <Table columns={columns} rows={formattedRows} />
    </main>
  );
}