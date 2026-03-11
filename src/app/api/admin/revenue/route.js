import { getRevenueData } from "@/app/actions/adminActions/getRevenueData";
import { NextResponse } from "next/server";

export async function GET(req) {

  try {

    const { searchParams } = new URL(req.url);

    const range = searchParams.get("range") || "monthly";

    const data = await getRevenueData(range);

    return NextResponse.json(data);

  } catch (error) {

    console.error("Revenue API Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }

}