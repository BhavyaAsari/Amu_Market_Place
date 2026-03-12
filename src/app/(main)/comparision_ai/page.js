import Comparision_AI_Client from "@/components/AI_Components/Client_Ai";

export default async function Comparision_AI({ searchParams }) {

  const resolvedSearchParams = await searchParams;

  const ids = resolvedSearchParams?.ids
    ? resolvedSearchParams.ids.split(",")
    : [];

  // // console.log("ids from URL:", ids);
  // console.log("Server received ids:", resolvedSearchParams?.ids);

  return <Comparision_AI_Client ids={ids} />;
}