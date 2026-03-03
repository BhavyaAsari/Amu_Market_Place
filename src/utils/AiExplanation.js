export async function generateExplanation({ purpose, mode, products }) {
  try {
    if (!products || products.length === 0) {
      return "No products available for analysis.";
    }

    // Sort products by finalScore
    const sorted = [...products].sort(
      (a, b) => b.finalScore - a.finalScore
    );

    const winner = sorted[0];

    // Build readable internal comparison text (hidden from user)
    const formattedProducts = sorted
      .map((p, index) => {
        return `
Product ${index + 1}: ${p.name}
Final Score: ${p.finalScore}
Price: ₹${p.price}

Component Strength Indicators:
CPU: ${p.cpuScore}
RAM: ${p.ramScore}
Storage: ${p.storageScore}
Battery: ${p.batteryScore}
Portability: ${p.portabilityScore}
`;
      })
      .join("\n");

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
          temperature: 0.25,
          messages: [
            {
              role: "system",
              content: `
You are an expert laptop comparison analyst.

Strict Rules:
- Do NOT display any numerical scores.
- Do NOT mention score values or comparisons like "5 vs 3".
- Do NOT show asterisks or markdown symbols.
- Do NOT infer specs not provided.
- Do NOT calculate totals.
- Do NOT change ranking.

Output Requirements:
- Use clean GPT-style formatting.
- Use emojis appropriately.
- Use section headings without markdown symbols.
- Keep paragraphs short and readable.
- Maximum 180 words.
Tone: confident, analytical, premium.
              `,
            },
            {
              role: "user",
              content:`Purpose: ${purpose}
Decision Mode: ${mode}

System Ranking:
Winner: ${winner.name}

Comparison Data:
${formattedProducts}

Write the response in the following exact structure:

🏆 Best Overall
• One clear line explaining why it ranks first
• Mention the type of performance strength it has

💼 Ideal Use Cases
• List 3–4 types of users or workloads it is best suited for

✅ Key Advantages
• Bullet points explaining strengths
• Focus on real-world benefits

⚖ Considerations
• Mention trade-offs briefly

🤝 Where Other Options May Be Better
• Mention scenarios where alternatives make more sense

🎯 Final Recommendation
• One decisive closing statement

Important:
Do not show numbers.
Do not write long paragraphs.
Use bullet points only.
Keep it clean and structured.`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return (
      data?.choices?.[0]?.message?.content ||
      "Explanation could not be generated."
    );
  } catch (error) {
    console.error("AI Explanation error:", error);
    return "Explanation unavailable.";
  }
}