import { connectDB } from "@/libs/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const result = await Product.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: "$price" },
          max: { $max: "$price" },
        },
      },
    ]);

    const { min = 0, max = 200000 } = result[0] ?? {};

    return Response.json({ min, max });
  } catch (error) {
    console.error("Error fetching price range", error);
    // Fall back to safe defaults so the slider still renders
    return Response.json({ min: 0, max: 200000 }, { status: 200 });
  }
}