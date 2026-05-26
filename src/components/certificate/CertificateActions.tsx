"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function CertificateActions({ certId }: { certId: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/certificate/${certId}`;
    if (navigator.share) {
      await navigator.share({ title: "My LearnThroughGame Certificate", url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex gap-3 mt-6 justify-center">
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/15 transition-colors"
      >
        Back to Dashboard
      </Link>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 font-medium rounded-xl hover:bg-yellow-500/30 transition-colors"
      >
        {copied ? <Check size={15} /> : <Share2 size={15} />}
        {copied ? "Link copied!" : "Share Certificate"}
      </button>
    </div>
  );
}
