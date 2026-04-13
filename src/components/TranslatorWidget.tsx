"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCw, Send, CheckCircle2, MessageSquare, Mail, Reply } from "lucide-react";
import { Platform, Tone, ContextLevel } from "@/utils/promptBuilder";


const PRESET_HINTS = [
  "mujhe mat sikha apna kaam kar",
  "yeh bilkul bakwas approach hai",
  "bhai ye kaam abhi tak kyu nahi hua?",
  "kal tak bhejo warna issue hoga",
];

export default function TranslatorWidget() {
  const [rawText, setRawText] = useState("");
  const [platform, setPlatform] = useState<Platform>("slack");
  const [tone, setTone] = useState<Tone>("polite");
  const [contextLevel, setContextLevel] = useState<ContextLevel>("peer");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTranslate = async (e?: React.FormEvent, isRegenerate = false) => {
    if (e) e.preventDefault();
    if (!rawText.trim()) return;

    setIsLoading(true);
    setError("");
    if (!isRegenerate) setResult("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText, platform, tone, contextLevel }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to translate");
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <form onSubmit={handleTranslate} className="w-full flex justify-center">
        {/* Main widget container */}
        <div className="w-[100%] max-w-[800px] flex flex-col gap-6">
          {/* Top Options Bar (Platform mimicking the tabs in screenshot) */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-center">
            {[
              { id: "slack", label: "Slack / Teams", icon: MessageSquare, desc: "Casual team messages" },
              { id: "email", label: "Email", icon: Mail, desc: "Professional emails" },
              { id: "linkedin", label: "LinkedIn", icon: Send, desc: "Public posts" },
              { id: "reply", label: "Reply", icon: Reply, desc: "Tactful response" },
            ].map((p) => {
              const active = platform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as Platform)}
                  className={`relative flex flex-col items-center justify-center p-3 px-4 rounded-xl border-2 transition-all duration-300 ease-out flex-1 min-w-[110px] sm:max-w-[160px] ${
                    active
                      ? "border-primary bg-gradient-to-br from-primary/20 to-[#3b82f6]/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)] scale-[1.02] z-10"
                      : "border-surface-hover bg-surface hover:bg-surface-hover/80 text-gray-400 hover:text-gray-200 hover:border-[#3b82f6]/40"
                  }`}
                >
                  <div className={`p-1.5 rounded-full mb-1 transition-colors duration-300 ${active ? "bg-primary text-white" : "text-gray-500"}`}>
                    <p.icon size={active ? 18 : 16} strokeWidth={active ? 2.5 : 2} />
                  </div>
                  <div className={`font-semibold tracking-wide transition-all ${active ? "text-sm" : "text-xs"}`}>
                    {p.label}
                  </div>
                  <span className={`text-[10px] hidden sm:block font-medium tracking-wide mt-0.5 transition-all ${active ? "text-blue-200" : "text-gray-500"}`}>
                    {p.desc}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-4 items-center justify-center flex-wrap">
            {/* Secondary Toggles */}
            <div className="flex items-center gap-2 text-sm bg-surface rounded-md border border-surface-hover p-1">
              <span className="px-2 text-gray-400 font-medium">Tone</span>
              {(["polite", "assertive", "neutral", "warm"] as Tone[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`px-3 py-1 rounded capitalize transition-all ${tone === t ? "bg-surface-hover text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm bg-surface rounded-md border border-surface-hover p-1">
              <span className="px-2 text-gray-400 font-medium">To</span>
              {(["junior", "peer", "manager", "client"] as ContextLevel[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setContextLevel(c)}
                  className={`px-3 py-1 rounded capitalize transition-all ${contextLevel === c ? "bg-surface-hover text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="relative group">
            <textarea
              className="w-full bg-surface border border-surface-hover rounded-xl p-4 pr-16 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none min-h-[140px] text-lg transition-all"
              placeholder="What you really want to say... (Hindi, Hinglish, or English)"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              maxLength={500}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleTranslate();
                }
              }}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 pointer-events-none">
              {rawText.length}/500
            </div>

            <button
              type="submit"
              disabled={isLoading || !rawText.trim()}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-primary hover:bg-primary-hover text-black w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Send size={18} className="ml-1" />
              )}
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 tracking-wide">
            Press <kbd className="px-1 py-0.5 bg-surface border border-surface-hover rounded leading-none">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-surface border border-surface-hover rounded leading-none">Shift+Enter</kbd> for new line
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {PRESET_HINTS.map((hint, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setRawText(hint)}
                className="text-xs px-3 py-1.5 rounded-full border border-surface-hover bg-background hover:border-primary/50 hover:text-primary transition-all text-gray-400"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Output / Errors Area */}
      <div className="w-full max-w-[800px] mx-auto min-h-[150px]">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 bg-red-950/30 border border-red-900/50 rounded-xl text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {result && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface border border-primary/30 rounded-xl p-6 relative overflow-hidden group shadow-[0_0_15px_rgba(226,183,20,0.1)]"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <h3 className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">Polished Output</h3>
              <p className="text-white whitespace-pre-wrap text-lg font-light leading-relaxed">
                {result}
              </p>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-surface-hover/50">
                <span className="text-xs text-gray-500 mr-auto italic">
                  Shifted from raw emotion to {tone} {platform} format.
                </span>

                <button
                  type="button"
                  onClick={() => handleTranslate(undefined, true)}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
                  Regenerate
                </button>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-sm bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
