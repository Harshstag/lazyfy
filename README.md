<div align="center">

# 😴 Lazyfy 

**Write the *real* thing. Send the *right* thing.**

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" alt="Google Gemini" />
</p>

</div>

---

## 🧐 What is Lazyfy?

We know corporate communication is exhausting. Sometimes you just want to say _"kal tak bhejo warna issue hoga"_ without causing an HR incident. 

**Lazyfy** is your AI-powered filter that takes your raw, emotional, or blunt inputs in **Hindi, Hinglish, or English**, and instantly rewrites them into polished, professional workplace communication tailored to your specific audience. 


<div align="center">
  <img src="screenshots/screenshot-1.png" width="32%" alt="Lazyfy Step 1" />
  <img src="screenshots/screenshot-2.png" width="32%" alt="Lazyfy Step 2" />
  <img src="screenshots/screenshot-3.png" width="32%" alt="Lazyfy Step 3" />
</div>


## ✨ Features

- 🎯 **Contextual Variations:** Generate tailored messages for Slack/Teams, Email, LinkedIn, or quick Replies.
- 🎭 **Adjustable Tone:** Shift your message's tone between Polite, Assertive, Neutral, or Warm.
- 👥 **Audience Targeting:** Keep the right distance by selecting your audience context—Junior, Peer, Manager, or Client.
- 🔒 **Privacy First:** Your text is processed instantly via the Google Gemini API and is **never** stored permanently in any database.
- 💅 **Modern & Fluid UI:** Beautiful dark mode aesthetics powered by Tailwind CSS and smooth micro-animations using Framer Motion.


## 🛠 Tech Stack

| Category | Technologies |
| -------- | ------------ |
| **Frontend** | Next.js (App Router), React 19, Tailwind CSS v4, Framer Motion |
| **Icons** | Lucide React |
| **AI Integration** | `@google/genai` (Gemini 2.5 Flash) |
| **Hosting** | Vercel (Edge-ready) |

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository and install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment variables:**
   Rename \`.env.example\` to \`.env.local\` (or create a new \`.env.local\` file) and add your Gemini API Key.
   \`\`\`env
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

3. **Run the local development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## ⚡ Deployment

Lazyfy is fully optimized for Vercel. 

1. Push your code to GitHub.
2. Import the project in your Vercel Dashboard.
3. Add the `GEMINI_API_KEY` to the Environment Variables settings in Vercel.
4. Deploy in seconds!

## 🤝 Credits

Created by **Harsh Singh** ([@harshstag](https://github.com/harshstag)).

---
> **Disclaimer:** AI can make mistakes. Always review the output before hitting send on critical communications.
