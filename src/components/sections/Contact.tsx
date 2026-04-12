import { Mail, MapPin, FolderGit2, Phone } from "lucide-react";
import { portfolioData } from "@/src/data/portfolio";

export function Contact() {
  const { contactInfo } = portfolioData;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold text-zinc-900">Contact</h2>
      <div className="mt-8 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700 shadow-sm md:grid-cols-2">
        <a className="inline-flex items-center gap-2 hover:text-emerald-600" href={`mailto:${contactInfo.email}`}>
          <Mail size={18} />
          {contactInfo.email}
        </a>
        <a className="inline-flex items-center gap-2 hover:text-emerald-600" href={contactInfo.github} target="_blank" rel="noreferrer">
          <FolderGit2 size={18} />
          GitHub
        </a>
        <a className="inline-flex items-center gap-2 hover:text-emerald-600" href={`tel:${contactInfo.phone.replace(/-/g, "")}`}>
          <Phone size={18} />
          {contactInfo.phone}
        </a>
        <p className="inline-flex items-center gap-2">
          <MapPin size={18} />
          {contactInfo.location}
        </p>
      </div>
      <footer className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-500">{contactInfo.footerText}</footer>
    </section>
  );
}
