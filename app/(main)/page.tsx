"use client"

import React, { useState } from "react"
import HeroSection from "@/components/section/HeroSection"
import AboutSection from "@/components/section/AboutSection"
import ServicesSection from "@/components/section/ServicesSection"
import GuaranteeSection from "@/components/section/GuaranteeSection"
import FAQSection from "@/components/section/FAQSection"
import ReviewsSection from "@/components/section/ReviewsSection"
import CartSection from "@/components/section/CartSection"

interface CartItem {
  id: string
  name: string
  price: string
}

export default function MainPage() {
  const [selectedServices, setSelectedServices] = useState<CartItem[]>([])

  const handleRemove = (id: string) => {
    setSelectedServices((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className="flex w-full flex-col gap-16">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GuaranteeSection />
      <FAQSection />
      <ReviewsSection />
      <CartSection
        selectedServices={selectedServices}
        onRemove={handleRemove}
      />
    </main>
  )
}
