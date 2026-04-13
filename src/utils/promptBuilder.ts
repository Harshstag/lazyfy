export type Platform = "slack" | "email" | "linkedin" | "reply";
export type Tone = "polite" | "assertive" | "neutral" | "warm";
export type ContextLevel = "junior" | "peer" | "manager" | "client";

export interface TranslationParams {
  rawText: string;
  platform: Platform;
  tone: Tone;
  contextLevel?: ContextLevel;
}

export function buildPrompt({
  rawText,
  platform,
  tone,
  contextLevel = "peer",
}: TranslationParams): string {
  const platformRules = {
    slack:
      "Keep it concise, clear, and action-oriented. Suitable for a quick chat ping. Do not use email subject lines or formal sign-offs.",
    email:
      "Format as a professional email. Include a brief, clear subject line (starting with 'Subject: '), a proper greeting, the body, and a professional sign-off.",
    linkedin:
      "Format as a polished, brand-safe LinkedIn post suitable for a public professional audience. Use appropriate spacing and professional language.",
    reply:
      "Draft this as a tactful response to an ongoing thread. Address the points clearly but professionally, maintaining context continuity.",
  };

  const toneRules = {
    polite: "Ensure the tone is gentle, respectful, and accommodating.",
    assertive:
      "Ensure the tone is firm, direct, and confident without being aggressive or rude.",
    neutral:
      "Ensure the tone is objective, factual, and devoid of strong emotion.",
    warm: "Ensure the tone is friendly, encouraging, and collaborative.",
  };

  const contextRules = {
    junior: "The recipient is junior to the sender. Be guiding and clear.",
    peer: "The recipient is a peer/colleague. Keep it collaborative and horizontal.",
    manager: "The recipient is a manager/superior. Be respectful and concise.",
    client:
      "The recipient is an external client. Be extremely professional and polished.",
  };

  return `
You are an expert corporate communications editor. Your task is to rewrite a raw, informal, and potentially blunt or emotional message into a polished, professional workplace communication.
The input may be in Hindi, Hinglish, or English. You must detect the language, but the output must always be in clear, professional English.

Input Text:
"""
${rawText}
"""

Instructions:
1. Preserve the original core intent, urgency, and business meaning.
2. Remove any rude, insulting, threatening, passive-aggressive, or sloppy phrasing.
3. Do not make the user sound like a robot; keep it feeling natural.
4. Channel/Platform: ${platformRules[platform]}
5. Desired Tone: ${toneRules[tone]}
6. Audience Context: ${contextRules[contextLevel]}

Provide ONLY the final rewritten text. Do not include any meta-commentary, explanations, or quotes around the output. 
  `.trim();
}
