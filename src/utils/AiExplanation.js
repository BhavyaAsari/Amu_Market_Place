export default async function generateExplanation({ purpose, mode, products }) {
  try {
    if (!products || products.length === 0) {
      return "No products available for analysis.";
    }

    const isInsight = mode === "insight";

    const sorted = [...products].sort(
      (a, b) => b.finalScore - a.finalScore
    );

    const winner = sorted[0];

    const formattedProducts = sorted
      .map((p, index) => {
        return `
Product ${index + 1}: ${p.name}
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

    // -------- SYSTEM PROMPT --------
    const systemPrompt = isInsight
      ? `
You are a premium laptop performance analyst.

Strict Rules:
- DO NOT write paragraphs.
- Use bullet points ONLY.
- Every explanation line must start with •
- Do NOT display numerical scores.
- Do NOT show raw score comparisons.
- Do NOT invent specifications.
- Keep each bullet concise (1–2 lines max).
- Maintain a professional analytical tone.
`
      : `
You are an expert laptop comparison analyst.

Strict Rules:
- Use bullet points only.
- Do NOT display numerical scores.
- Do NOT mention score comparisons.
- Do NOT show markdown symbols.
- Keep content concise and structured.
- Maximum 180 words.
Tone: confident, analytical, premium.
`;

    // -------- USER PROMPT --------
    const userPrompt = isInsight
      ? `
Purpose: ${purpose}

Product Analyzed:
${formattedProducts}

Write the response using ONLY bullet points in the exact structure below.

🧠 Performance Overview
• 3–4 bullets about overall positioning and capability

⚙ Processor & Multitasking
• 3–4 bullets about CPU & RAM real-world impact

💾 Storage & Responsiveness
• 2–3 bullets about speed and daily workflow impact

🔋 Battery & Mobility
• 2–3 bullets about portability and endurance

🎯 Real-World Suitability
• 3–4 bullets about ideal users and usage scenarios

📊 Strategic Positioning
• 2–3 bullets about market segment and value

Important:
- NO paragraphs.
- ONLY bullet points.
- Each bullet must begin with •
- Do not show numbers or raw metrics.
`
      : `
Purpose: ${purpose}
Decision Mode: ${mode}

System Ranking:
Winner: ${winner.name}

Comparison Data:
${formattedProducts}

Write the response using ONLY bullet points in this structure:

🏆 Best Overall
• One strong reason it ranks first

💼 Ideal Use Cases
• 3–4 user types

✅ Key Advantages
• 3–5 clear strengths

⚖ Considerations
• 2–3 trade-offs

🤝 Where Other Options May Be Better
• 2–3 scenarios

🎯 Final Recommendation
• One decisive closing statement

Important:
- No paragraphs.
- Bullet points only.
- Do not show numbers.
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "z-ai/glm-4.5-air:free",
          temperature: isInsight ? 0.35 : 0.25,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("data",data);

    if (!response.ok) {
  console.error("OpenRouter error:", data);
  return "AI service temporarily unavailable.";
}

    return (
      data?.choices?.[0]?.message?.content ||
      "Explanation could not be generated."
    );
  } catch (error) {
    console.error("AI Explanation error:", error);
    return "Explanation unavailable.";
  }
}