"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Clock, ArrowUpRight } from "lucide-react";

import type { Service } from "@/constants/services-data";
import { CONTACT } from "@/constants/contact";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service: Service;
}

/**
 * ServiceCard (Production Safe)
 * - Guard ทุก access จาก service
 * - ใช้ CONTACT เป็น single source of truth
 * - ปลอดภัยต่อ runtime / Next Image
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  if (!service) return null;

  const lineUrl = CONTACT?.line?.url;
  const actionHref = lineUrl
    ? `${lineUrl}?text=${encodeURIComponent(
        `สนใจบริการ: ${service.name} (${service.id})`,
      )}`
    : "#";

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border bg-white transition",
        "hover:-translate-y-1 hover:shadow-xl",
      )}
    >
      {/* =====================
       * IMAGE
       * ===================== */}
      <div className="relative h-56 w-full">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        <div className="absolute left-4 top-4 flex gap-2">
          <Badge>{service.id}</Badge>
          {service.category && (
            <Badge variant="secondary">{service.category}</Badge>
          )}
        </div>

        {service.timeline && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-medium text-white">
            <Clock size={12} />
            {service.timeline}
          </div>
        )}
      </div>

      {/* =====================
       * CONTENT
       * ===================== */}
      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-2 text-lg font-bold">{service.name}</h3>

        {service.description && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {service.description}
          </p>
        )}

        {/* =====================
         * ACTIONS
         * ===================== */}
        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <span className="font-bold">
            {service.feeEstimate ?? "สอบถามราคา"}
          </span>

          <div className="flex gap-2">
            <Link
              href={`/services/${service.slug}`}
              className="flex h-10 w-10 items-center justify-center rounded-md border transition hover:bg-slate-50"
              aria-label={`ดูรายละเอียดบริการ ${service.name}`}
            >
              <ArrowUpRight size={16} />
            </Link>

            {lineUrl && (
              <a
                href={actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-[#06C755] px-4 text-xs font-bold text-white transition hover:opacity-90"
              >
                <MessageCircle size={14} />
                Consult
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
