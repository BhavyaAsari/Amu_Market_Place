export default async function generateProductDescription(specs) {
  try {
    const prompt = `
Write a short e-commerce style laptop description (20–25 words).

Specs:
Processor: ${specs.processor}
RAM: ${specs.ram}
Storage: ${specs.storage}

Tone: professional, concise.
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
          model: "stepfun/step-3.5-flash",
          temperature: 0.3,
          max_tokens: 2000,
            
          messages: [
            {
              role: "system",
              content:
                "You generate concise laptop product descriptions for e-commerce.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const description = data?.choices?.[0]?.message?.content;

console.log("AI TEXT:", description);

return description;
  } catch (error) {
    console.error("AI description error:", error);
    return null;
  }
}