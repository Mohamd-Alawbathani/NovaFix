const LANGUAGES = {
  ar: "Arabic",
  en: "English",
  es: "Spanish",
  zh: "Simplified Chinese",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function extractText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];

  for (const item of data?.output || []) {
    if (item?.type !== "message") continue;

    for (const c of item?.content || []) {
      if (c?.type === "output_text" && typeof c.text === "string") {
        parts.push(c.text);
      }
    }
  }

  return parts.join("\n").trim();
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return json({ error: "AI_NOT_CONFIGURED" }, 503);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const message = String(body?.message || "").trim().slice(0, 4000);

    const lang =
      ["ar", "en", "es", "zh"].includes(body?.lang)
        ? body.lang
        : "ar";

    const history =
      Array.isArray(body?.history)
        ? body.history.slice(-40)
        : [];

    if (!message) {
      return json({ error: "Message is required" }, 400);
    }

    const safeHistory = history
      .filter(
        (m) =>
          m &&
          ["user", "assistant"].includes(m.role)
      )
      .map((m) => ({
        role: m.role,
        content: String(m.content || "").slice(0, 5000),
      }));

    const language = LANGUAGES[lang] || "Arabic";

    const instructions = `
You are Nova AI, a natural conversational customer-support assistant for NovaFix Digital Solutions.

Speak like a capable human support agent, not like a scripted bot.

Reply in ${language}.

LANGUAGE AND CONVERSATION:

- Understand casual wording, typos, slang, greetings, short replies, and incomplete messages.
- In Arabic, understand Modern Standard Arabic and common Saudi/Gulf Arabic.
- If the customer says "السلام عليكم", reply naturally with a greeting.
- If the customer only says "هلا", "hello", "hola", or another greeting, greet them naturally and ask how you can help.
- Do not start every answer with "فهمت", "I understand", or "Got it".
- Use previous messages to understand short replies like:
  "ايوه"
  "لا"
  "ما ضبط"
  "نفس المشكلة"
  "وش اسوي الحين"
- Preserve context across the conversation.
- Ask only the smallest useful follow-up question.
- Do not sound robotic.
- Match the response length to the user's message.
- A greeting should get a short natural response.
- A complicated issue can get clear step-by-step troubleshooting.

CUSTOMER SUPPORT:

- Help with official account recovery and account security.
- Only assist with accounts the customer owns or is explicitly authorized to manage.
- Never ask for passwords.
- Never ask for OTP codes.
- Never ask for SMS verification codes.
- Never ask for backup codes.
- Never ask for cookies, tokens, or authentication secrets.
- Do not help bypass 2FA.
- Do not help bypass authentication.
- Do not help access another person's account.
- Do not provide phishing, credential theft, malware, session hijacking, or password guessing instructions.
- If the user asks for unauthorized access, refuse briefly and redirect them to legitimate recovery methods.
- Ask for non-sensitive details when useful:
  platform name,
  exact error message,
  whether they still have access to the linked email,
  whether they still have access to the linked phone number,
  and which official recovery steps they already tried.
- Never guarantee account recovery.
- If a human NovaFix employee should take over, clearly tell the customer.
- Never invent actions, approvals, account status, tickets, or platform decisions.
`;

    const cleanHistory = [...safeHistory];

    const last = cleanHistory[cleanHistory.length - 1];

    if (
      last?.role === "user" &&
      last.content.trim() === message
    ) {
      cleanHistory.pop();
    }

    const input = [
      ...cleanHistory,
      {
        role: "user",
        content: message,
      },
    ];

    try {
      const response = await fetch(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },

          body: JSON.stringify({
            model:
              process.env.OPENAI_MODEL ||
              "gpt-5.6-sol",

            reasoning: {
              mode:
                process.env.OPENAI_REASONING_MODE ||
                "pro",

              effort:
                process.env.OPENAI_REASONING_EFFORT ||
                "max",
            },

            max_output_tokens: 1800,

            store: false,

            instructions,

            input,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "OpenAI error:",
          data?.error?.message || response.status
        );

        return json(
          { error: "AI request failed" },
          502
        );
      }

      const reply = extractText(data);

      if (!reply) {
        return json(
          { error: "Empty AI response" },
          502
        );
      }

      return json({
        reply,

        model:
          process.env.OPENAI_MODEL ||
          "gpt-5.6-sol",

        reasoning_mode:
          process.env.OPENAI_REASONING_MODE ||
          "pro",

        reasoning_effort:
          process.env.OPENAI_REASONING_EFFORT ||
          "max",
      });
    } catch (error) {
      console.error(
        "AI function error:",
        error
      );

      return json(
        { error: "AI service unavailable" },
        503
      );
    }
  },
};
