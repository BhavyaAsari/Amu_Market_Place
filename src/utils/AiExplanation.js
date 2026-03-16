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

Rules:
• Bullet points only
• No paragraphs
• No numeric scores
• No raw comparisons
• Concise professional insights
`
      : `
You are an expert laptop comparison analyst.

Rules:
• Bullet points only
• No numbers or scores
• No markdown symbols
• Maximum 180 words
Tone: confident, analytical
`;

    // -------- USER PROMPT --------
    const userPrompt = isInsight
      ? `
Purpose: ${purpose}

Products:
${formattedProducts}

Respond EXACTLY in this structure.

🧠 Performance Overview
• bullets

⚙ Processor & Multitasking
• bullets

💾 Storage & Responsiveness
• bullets

🔋 Battery & Mobility
• bullets

🎯 Real-World Suitability
• bullets

📊 Strategic Positioning
• bullets
`
      : `
Purpose: ${purpose}
Decision Mode: ${mode}

Winner: ${winner.name}

Products:
${formattedProducts}

Respond EXACTLY in this structure.

🏆 Best Overall
• bullet

💼 Ideal Use Cases
• bullets

✅ Key Advantages
• bullets

⚖ Considerations
• bullets

🤝 Where Other Options May Be Better
• bullets

🎯 Final Recommendation
• bullet
`;

    // -------- API CALL --------

    const callAI = async (model) => {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            temperature: isInsight ? 0.35 : 0.25,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "AI request failed");
      }

      return data?.choices?.[0]?.message?.content;
    };

    try {
      return await callAI("meta-llama/llama-3.1-8b-instruct");
    } catch (error) {
      console.warn("Primary model failed. Trying fallback model...");

      // fallback model
      return await callAI("mistralai/mistral-7b-instruct");
    }

  } catch (error) {
    console.error("AI Explanation error:", error);
    return "AI explanation currently unavailable.";
  }
}