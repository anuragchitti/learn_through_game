import { Trophy, Award } from "lucide-react";
import { getCertificate } from "@/lib/db";
import { getUserProfile } from "@/lib/db";
import { getCourseBySlug } from "@/data/courses";
import { notFound } from "next/navigation";
import CertificateActions from "@/components/certificate/CertificateActions";

type Props = { params: Promise<{ id: string }> };

export default async function CertificatePage({ params }: Props) {
  const { id } = await params;

  const cert = await getCertificate(id);
  if (!cert) notFound();

  const [profile, course] = await Promise.all([
    getUserProfile(cert.userId),
    Promise.resolve(getCourseBySlug(cert.courseSlug)),
  ]);

  const recipientName = profile?.username ?? "Learner";
  const courseName = course?.title ?? cert.courseSlug;
  const courseIcon = course?.icon ?? "🎓";
  const issuedDate = new Date(cert.issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Certificate card */}
        <div className="relative p-10 rounded-3xl border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 text-center">
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-yellow-500/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-yellow-500/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-yellow-500/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-yellow-500/40 rounded-br-lg" />

          <Trophy size={48} className="text-yellow-400 mx-auto mb-4" />

          <div className="text-sm text-yellow-400/70 font-medium tracking-widest uppercase mb-2">
            Certificate of Completion
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">LearnThroughGame</h1>
          <p className="text-white/50 mb-8">This certifies that</p>

          <div className="text-4xl font-bold text-white mb-2">{recipientName}</div>
          <p className="text-white/50 mb-8">has successfully completed all levels of</p>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 mb-8">
            <span className="text-2xl">{courseIcon}</span>
            <Award size={20} className="text-yellow-400" />
            <span className="text-xl font-bold text-white">{courseName}</span>
          </div>

          <div className="text-white/30 text-sm mb-2">Issued on {issuedDate}</div>
          <div className="font-mono text-xs text-white/20">{id}</div>
        </div>

        <CertificateActions certId={id} />
      </div>
    </div>
  );
}
