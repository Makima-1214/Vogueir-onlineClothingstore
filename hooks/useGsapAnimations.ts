'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapAnimations() {
  useEffect(() => {
    // Small delay to let Next.js hydrate fully
    const ctx = gsap.context(() => {
      // ── NAVBAR slide down ──────────────────────────────────────────
      gsap.from('[data-anim="navbar"]', {
        y: -60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      // ── HERO text stagger ──────────────────────────────────────────
      gsap.from('[data-anim="hero-badge"]', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('[data-anim="hero-title"]', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.45,
      })
      gsap.from('[data-anim="hero-desc"]', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.6,
      })
      gsap.from('[data-anim="hero-cta"]', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.75,
      })
      gsap.from('[data-anim="hero-image"]', {
        scale: 1.05,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
        delay: 0.2,
      })

      // ── SECTION HEADINGS — fade up on scroll ──────────────────────
      gsap.utils.toArray<HTMLElement>('[data-anim="section-heading"]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
      })

      // ── CATEGORY TILES — stagger scale+fade ───────────────────────
      gsap.utils.toArray<HTMLElement>('[data-anim="category-tile"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          scale: 0.97,
          duration: 0.65,
          delay: i * 0.08,
          ease: 'power3.out',
        })
      })

      // ── PRODUCT CARDS — stagger fade up ───────────────────────────
      const cardGroups = gsap.utils.toArray<HTMLElement>('[data-anim="product-grid"]')
      cardGroups.forEach((grid) => {
        const cards = grid.querySelectorAll<HTMLElement>('[data-anim="product-card"]')
        gsap.from(cards, {
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        })
      })

      // ── COLLECTION TILES ──────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-anim="collection-tile"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
        })
      })

      // ── CTA STRIP — fade up ────────────────────────────────────────
      gsap.from('[data-anim="cta-text"]', {
        scrollTrigger: {
          trigger: '[data-anim="cta-strip"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
      gsap.from('[data-anim="cta-btn"]', {
        scrollTrigger: {
          trigger: '[data-anim="cta-strip"]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power3.out',
      })

      // ── BENTO / ABOUT sections ────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-anim="fade-up"]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
      })

      // ── FEATURES icons ────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-anim="feature-item"]').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.55,
          delay: i * 0.1,
          ease: 'power3.out',
        })
      })
    })

    return () => ctx.revert()
  }, [])
}
