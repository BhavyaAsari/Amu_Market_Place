export async function generateExplanation({ purpose, mode, products }) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",

      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "stepfun/step-3.5-flash",
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: `You are a technical laptop comparison engine.
Use ONLY the provided numerical scores and price.
Do NOT infer specs from names.
Do NOT add external knowledge.
Do NOT modify rankings.
Be concise and analytical.
Maximum 120 words.
                        `,
            },

            {
              role: "user",
              content: `
                        Purpose: ${purpose}
Mode: ${mode}

Data:
${JSON.stringify(products)}

The product with highest finalScore is the winner.

Explain why it ranks higher.
Reference only score differences.
Mention trade-offs if any.
                        `,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    return data?.choices?.[0]?.message?.content || "NO explanation generated";
  } catch (error) {
    console.error("AI Explanation error", error);
    return "Eplanation unavailable ";
  }
}
