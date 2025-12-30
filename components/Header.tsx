/** * @format
 * @description HEADER: Industrial Sharp Navigation (Dark-Theme Optimized)
 */

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cpu } from 'lucide-react'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuOpen: () => void
}

export function Header({ onMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ease-in-out',
        isScrolled
          ? 'border-b border-white/5 bg-slate-950/80 py-4 shadow-2xl backdrop-blur-xl'
          : 'bg-transparent py-8',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* --- LOGO_NODE: Industrial Style --- */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center bg-brand transition-all group-hover:rotate-90 group-hover:bg-white">
            <Cpu className="text-slate-950" size={20} />
            <div className="absolute -right-1 -top-1 h-2 w-2 animate-pulse border border-slate-950 bg-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase italic leading-none tracking-tighter text-white">
              JP Visual<span className="text-brand">.Docs</span>
            </span>
            <span className="font-mono text-[6px] font-bold uppercase tracking-[0.3em] text-brand/50">
              Secure_Document_Gateway
            </span>
          </div>
        </Link>

        {/* --- DESKTOP_NAVIGATION: Terminal Style --- */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navigationConfig.mainNav.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative font-mono text-[10px] font-black uppercase tracking-widest transition-all',
                  isActive ? 'text-brand' : 'text-slate-500 hover:text-white',
                )}
              >
                {isActive && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 animate-pulse text-brand">
                    {'>'}
                  </span>
                )}
                {link.title}
              </Link>
            )
          })}
        </nav>

        {/* --- MOBILE_TRIGGER: Custom Industrial Burger --- */}
        <button
          onClick={onMenuOpen}
          aria-label="Toggle Menu"
          className="group flex h-12 w-12 flex-col items-center justify-center gap-1.5 border border-white/10 bg-white/5 text-white transition-all hover:border-brand hover:bg-brand hover:text-slate-950"
        >
          <span className="h-[2px] w-6 bg-current transition-transform group-hover:w-4" />
          <span className="h-[2px] w-6 bg-current" />
          <span className="h-[2px] w-4 bg-current transition-transform group-hover:w-6" />
        </button>
      </div>
    </header>
  )
}
