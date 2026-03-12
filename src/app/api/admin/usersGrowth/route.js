import { getUsersGrowth } from "@/app/actions/adminActions/getUsersGrowth";

export async function GET(req) {

  try {

    const { searchParams } = new URL(req.url);

    const range = searchParams.get("range") || "monthly";

    const data = await getUsersGrowth(range);

    return Response.json(data);

  } catch (error) {

    console.error("Users growth API error:", error);

    return Response.json(
      { error: "Failed to fetch users growth data" },
      { status: 500 }
    );

  }

}