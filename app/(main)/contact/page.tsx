'use client';

import { Activity } from 'lucide-react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-yellow-400 selection:text-black">
      {/* 🛠️ System Header */}
      <section className="border-b-2 border-slate-900 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Activity size={18} strokeWidth={3} />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                Establish_Connection
              </span>
            </div>
            <h1 className="font-heading text-6xl font-black uppercase italic tracking-tighter text-slate-900 md:text-8xl">
              GET IN <span className="text-primary">TOUCH</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 🧩 Main Content */}
      <section className="mx-auto max-w-[1440px] px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
