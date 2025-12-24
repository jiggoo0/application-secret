'use client';

/**
 * 🏗️ JP-VISOUL: Industrial Service Card
 * Design: Industrial Neobrutalism (0px radius, Slate-900 borders, Hard shadows)
 */
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Terminal, ArrowUpRight } from 'lucide-react';

// Keywords config
const FUNNEL_KEYWORDS = ['ตั๋วเครื่องบิน', 'โรงแรม'];
const VISA_KEYWORDS = ['วีซ่า', 'ตั๋วเครื่องบิน'];

const matchKeywords = (title, keywords) => keywords.every((kw) => title.includes(kw));
const matchAny = (title, keywords) => keywords.some((kw) => title.includes(kw));

const ServiceCard = ({ service }) => {
  const {
    title = '',
    features = [],
    price = '-',
    ctaText = 'ดูรายละเอียด',
    ctaUrl = '#',
    images = [],
  } = service;

  const imageSrc = images[0] || '/placeholder.webp';
  const isFunnel = matchKeywords(title, FUNNEL_KEYWORDS);
  const isVisa = matchAny(title, VISA_KEYWORDS);

  const targetUrl = isFunnel ? `/flight-booking?service=${encodeURIComponent(title)}` : ctaUrl;

  // 🏗️ Industrial Card Styling (Strict Neobrutalism)
  const cardClassName = `flex flex-col border-2 border-slate-900 bg-white transition-all duration-200 h-full group relative
    ${
      isFunnel
        ? 'shadow-neo-lg border-[3px] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-xl'
        : 'shadow-neo hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg'
    }`;

  return (
    <article className={cardClassName}>
      {/* 🏷️ Badge: Document Status */}
      <div
        className={`absolute right-0 top-0 z-10 border-b-2 border-l-2 border-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest ${isFunnel ? 'bg-primary text-white' : 'bg-slate-900 text-white'}`}
      >
        {isFunnel ? 'Priority_System' : 'Standard_Payload'}
      </div>

      {/* Image: Blueprint Frame */}
      <div className="relative h-56 w-full overflow-hidden border-b-2 border-slate-900 bg-slate-50">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover contrast-125 grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={isFunnel || isVisa}
        />
        {/* Decorative Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10 transition-opacity group-hover:opacity-0"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '15px 15px',
          }}
        ></div>
      </div>

      {/* Body: Engineering Report */}
      <div className="flex-grow space-y-4 p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
            <Terminal size={12} strokeWidth={3} />
            <span>Doc_Type: {isVisa ? 'VISA_ASSET' : 'GEN_ASSET'}</span>
          </div>
          <h3 className="font-heading text-xl font-black uppercase italic tracking-tighter text-slate-900 transition-colors group-hover:text-primary">
            {title}
          </h3>
        </div>

        <ul className="space-y-3">
          {features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" strokeWidth={3} />
              <span className="font-sans text-sm font-bold leading-tight text-slate-600">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: Price & Deploy Action */}
      <div className="mt-auto space-y-4 border-t-2 border-slate-100 p-6">
        <div className="flex items-end justify-between">
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Unit_Price:
          </span>
          <div className="text-right">
            <span className="font-heading text-2xl font-black italic text-slate-900">{price}</span>
            <span className="block text-[8px] font-bold uppercase tracking-tighter text-slate-400">
              VAT_NOT_INCLUDED
            </span>
          </div>
        </div>

        <Link href={targetUrl} target={isFunnel ? '_self' : '_blank'} className="block">
          <Button
            className={`w-full rounded-none border-2 border-slate-900 py-7 text-xs font-black uppercase tracking-[0.2em] shadow-neo-sm transition-all active:translate-x-0 active:translate-y-0 active:shadow-none ${
              isFunnel
                ? 'bg-primary text-white hover:bg-slate-900'
                : 'bg-white text-slate-900 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              {isFunnel ? 'Execute_Payload' : ctaText}
              <ArrowUpRight size={16} strokeWidth={3} />
            </span>
          </Button>
        </Link>

        {isFunnel && (
          <div className="-skew-x-6 transform bg-slate-900 p-2">
            <p className="text-center text-[9px] font-black uppercase italic tracking-tighter text-yellow-400">
              * Preview_Watermark_Enabled_Before_Final_Payment
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export default ServiceCard;
