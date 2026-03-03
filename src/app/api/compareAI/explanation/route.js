import { unstable_cache } from "next/cache";
import { generateExplanation } from "@/utils/AiExplanation";

export async function POST(req) {

    const {purpose,mode,products} = await req.json();

    //Cache key 
    const key = [
        "compare-explanation",
        purpose,
        mode,
        ...products.map(p => p.name).sort()
    ];

    const getcachedExplanation = unstable_cache(

        async () => {

            console.log("calling LLM");
            return await generateExplanation({products,mode,purpose});
        },
        key,
        {

            revalidate:60*60
        }
    );

    const explanation = await getcachedExplanation();

    return Response.json({explanation});
    
}