import TranslatorWidget from "@/components/TranslatorWidget";
import { SmilePlus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start pt-16 md:pt-24 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse delay-75" />
          <div className="absolute inset-2 bg-gradient-to-tr from-primary to-blue-500 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.6)] animate-pulse" />
          <div className="relative bg-black w-8 h-8 rounded-full border-2 border-primary/50" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl">
          Write the <span className="text-primary italic">real</span> thing.
          <br />
          Send the <span className="text-primary italic">right</span> thing.
        </h1>
      </div>

      {/* Main Widget */}
      <TranslatorWidget />

      {/* Explanatory / About Section */}
      <footer className="mt-32 w-full max-w-3xl text-center space-y-12 pb-12">
        <div className="space-y-4">
          <p className="text-sm tracking-widest text-gray-500 uppercase font-semibold">Scroll to explore &darr;</p>
        </div>

        <div className="text-left space-y-8 bg-surface p-8 rounded-2xl border border-surface-hover">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <SmilePlus className="text-primary" /> What is Lazyfy?
            </h3>
            <p className="text-gray-400">
              We know corporate communication is exhausting. Sometimes you just want to say <span className="italic text-gray-300">"kal tak bhejo warna issue hoga"</span> without causing an HR incident. Lazyfy is your AI-powered filter that takes your raw, emotional, or blunt inputs in Hindi, Hinglish, or English, and instantly rewrites them into polished, professional workplace communication tailored to your specific audience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <h4 className="font-semibold text-white mb-1">Privacy First</h4>
                <p className="text-gray-400 text-sm">Your text is processed instantly via API and is not stored permanently in any database by Lazyfy.</p>
             </div>
             <div>
                <h4 className="font-semibold text-white mb-1">Multiple Flavors</h4>
                <p className="text-gray-400 text-sm">Whether it's a quick Slack ping, a well-formatted email, or a public LinkedIn post, we have you covered.</p>
             </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 flex flex-col items-center gap-2">
          <p>Created by Harsh Singh (@harshstag)</p>
          <p className="max-w-md">Disclaimer: AI can make mistakes. Always review the output before hitting send on critical communications.</p>
        </div>
      </footer>
    </div>
  );
}
