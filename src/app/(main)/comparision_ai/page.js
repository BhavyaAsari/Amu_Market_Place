import Comparision_AI_Client from "@/components/AI_Components/Client_Ai";

export default async function Comparision_AI({ searchParams }) {

 const resolvedSearchParams = await searchParams;

// const ids = resolvedSearchParams?.ids
//     ? resolvedSearchParams.ids.split(",")
//     : [];

const ids = [
    "15-ec2145ax-699e8c",
    "ideapad-gaming-3-57bfa3",
    "yoga-6-078f44",
    

  ];

   
    console.log("ids",ids)

  return <Comparision_AI_Client ids={ids} />;
}