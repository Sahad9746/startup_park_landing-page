'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   SVG ICONS
   ───────────────────────────────────────────── */
const Icon = {
  users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  trend: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  building: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  star: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  check: () => (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevron: (open: boolean) => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  ),
  arrow: () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
    </svg>
  ),
  spinner: () => (
    <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.2)" strokeWidth="4"/>
      <path d="M12 2a10 10 0 0110 10" stroke="#0A0600" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
  calendar: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  location: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  clock: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  diamond: () => (
    <svg width="7" height="7" viewBox="0 0 10 10" fill="currentColor">
      <polygon points="5,0 10,5 5,10 0,5"/>
    </svg>
  ),
};

/* ─── Section ornament ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
      <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.4))' }} />
      <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--gold-400)', whiteSpace: 'nowrap' as const }}>{text}</span>
      <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.4))' }} />
    </div>
  );
}

/* ─── Gold text helper ─── */
const goldText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #FFFBF0 0%, #F5E6A3 20%, #D4AF37 55%, #8A5C0F 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

/* ─── Glass card ─── */
function Card({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  return (
    <div {...rest} style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(201,162,39,0.2)',
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.5), transparent)' }} />
      {children}
    </div>
  );
}

/* ─── Gold button ─── */
function GoldBtn({ children, onClick, type = 'button', style, disabled }: {
  children: React.ReactNode; onClick?: () => void;
  type?: 'button' | 'submit'; style?: React.CSSProperties; disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
      padding: '0.95rem 2.5rem',
      background: disabled ? 'rgba(201,162,39,0.5)' : 'linear-gradient(135deg, #FFFBF0 0%, #E8C96A 30%, #C9A227 65%, #A67C1A 100%)',
      border: 'none', borderRadius: '6px',
      color: '#0A0600', fontFamily: "'Inter', sans-serif",
      fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const,
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: '0 0 30px rgba(201,162,39,0.3)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      ...style,
    }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(201,162,39,0.5)'; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,162,39,0.3)'; }}>
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */
export default function UnicornNight() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', company: '',
    termsAccepted: false,
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regState, setRegState] = useState<'idle' | 'submitting' | 'payment' | 'completing' | 'success'>('idle');
  const [registeredId, setRegisteredId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(p => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
    if (formErrors[name]) setFormErrors(p => { const n = { ...p }; delete n[name]; return n; });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); setServerError(null); setFormErrors({});
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim())  errs.fullName = 'Full name is required.';
    if (!formData.email.trim())     errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.phone.trim())     errs.phone = 'Phone number is required.';
    if (!formData.termsAccepted)    errs.termsAccepted = 'You must consent to proceed.';
    if (Object.keys(errs).length) {
      setFormErrors(errs); setIsSubmitting(false); return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, industry: 'Not specified', referral: 'Direct', dietary: [], requirements: '', isFundraising: false, investmentStage: '', helpNeeded: '', jobTitle: '' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegisteredId(data.registration.id);
        setRegState('payment');
        setIsModalOpen(true);
        setFormData({ fullName: '', email: '', phone: '', company: '', termsAccepted: false });
      } else setServerError(data.message || 'Registration failed. Please try again.');
    } catch { setServerError('Network error. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  const handleConfirmPayment = async () => {
    if (!registeredId) return;
    setRegState('completing');
    setServerError(null);
    try {
      const res = await fetch('/api/register/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: registeredId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegState('success');
        setIsModalOpen(false);
      } else {
        setServerError(data.message || 'Payment confirmation failed. Please try again.');
        setRegState('payment');
      }
    } catch {
      setServerError('Network error. Please try again.');
      setRegState('payment');
    }
  };

  const audience = [
    { Icon: Icon.users,    label: 'HNIs',                sub: 'High Net-Worth Individuals' },
    { Icon: Icon.trend,    label: 'Investors',            sub: 'Angels · VCs · Private Equity' },
    { Icon: Icon.building, label: 'Wealth Management',   sub: 'Advisory & Family Offices' },
    { Icon: Icon.star,     label: 'Business Leaders',    sub: "India's Next Changemakers" },
  ];



  const faqs = [
    { q: 'Who can attend Unicorn Night?', a: 'Unicorn Night is an invitation-only gathering for founders, investors, HNIs, business leaders, diplomats, and startup ecosystem stakeholders.' },
    { q: 'Is dinner included with the event?', a: 'Yes. All attendees will enjoy a complimentary gourmet dinner and refreshments as part of the event experience.' },
    { q: 'What should I bring to the event?', a: 'Please carry a valid photo ID and your event invitation/registration confirmation for smooth entry.' },
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(201,162,39,0.2)',
    borderRadius: '8px',
    color: '#F2ECD8',
    padding: '0.875rem 1.125rem',
    fontSize: '0.925rem',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.68rem', fontWeight: 600,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'rgba(242,236,216,0.5)', marginBottom: '0.5rem',
  };

  const iFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(201,162,39,0.55)';
    e.target.style.boxShadow = '0 0 0 3px rgba(201,162,39,0.08)';
    e.target.style.background = 'rgba(201,162,39,0.04)';
  };
  const iBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(201,162,39,0.2)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(255,255,255,0.04)';
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: "FAQ's", id: 'faqs' },
  ];

  return (
    <>
      {/* STARFIELD */}
      <div className="star-bg" aria-hidden>
        <div className="stars-sm" /><div className="stars-md" /><div className="stars-lg" />
      </div>

      {/* ════════════════════════════════
          HEADER
          ════════════════════════════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        height: '70px',
        background: scrolled ? 'rgba(3,8,18,0.92)' : 'rgba(3,8,18,0.25)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(201,162,39,0.15)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,2.5rem)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <Image src="/startup-park-logo.jpg" alt="Startup Park" width={120} height={36} style={{ objectFit: 'contain', filter: 'brightness(1.1)' }} />
          </a>

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {navLinks.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                padding: '0.45rem 1rem',
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: 'rgba(242,236,216,0.6)',
                borderRadius: '6px', fontFamily: "'Inter', sans-serif",
                transition: 'color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F2ECD8'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,236,216,0.6)'; e.currentTarget.style.background = 'transparent'; }}>
                {label}
              </button>
            ))}
            <GoldBtn onClick={() => scrollTo('register')} style={{ marginLeft: '0.75rem', padding: '0.5rem 1.375rem', fontSize: '0.76rem', borderRadius: '6px' }}>
              Register Now
            </GoldBtn>
          </div>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ════════════════════════════════
            HERO
            ════════════════════════════════ */}
        <section style={{ paddingTop: 'clamp(110px,14vw,160px)', paddingBottom: 'clamp(64px,8vw,90px)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,2.5rem)' }}>

            {/* Startup Park presents */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Image src="/startup-park-logo.jpg" alt="Startup Park" width={100} height={30} style={{ objectFit: 'contain', filter: 'brightness(1.1) opacity(0.9)' }} />
                <span style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'rgba(242,236,216,0.5)', letterSpacing: '0.06em' }}>presents</span>
              </div>
              {/* BENGALURU ornamental line */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', maxWidth: '260px', margin: '0 auto' }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.6))' }} />
                <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.32em', color: 'var(--gold-400)', textTransform: 'uppercase' }}>Bengaluru</span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.6))' }} />
              </div>
            </div>

            {/* Event Logo */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <div className="floating-unicorn" style={{ position: 'relative', width: 'clamp(160px, 25vw, 240px)', height: 'clamp(160px, 25vw, 240px)' }}>
                <Image
                  src="/unicorn-night-logo-transparent-v3.png"
                  alt="Unicorn Night"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* UNICORN NIGHT — Cinzel display */}
            <div style={{ marginBottom: '1.75rem', lineHeight: 0.88 }}>
              <div style={{
                fontFamily: "'Cinzel', 'Playfair Display', serif",
                fontSize: 'clamp(3.25rem, 13vw, 9.5rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                ...goldText,
                filter: 'drop-shadow(0 0 50px rgba(201,162,39,0.22))',
                userSelect: 'none',
              }}>
                <div>UNICORN</div>
                <div>NIGHT</div>
              </div>
            </div>

            {/* Taglines */}
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', fontStyle: 'italic', fontWeight: 500, color: '#F2ECD8', letterSpacing: '0.02em', marginBottom: '0.3rem' }}>
                An Exclusive Evening
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontStyle: 'italic', fontWeight: 400, color: 'rgba(242,236,216,0.65)', letterSpacing: '0.02em', marginBottom: '0.75rem' }}>
                Of Vision, Growth &amp; Partnerships
              </p>
              <div style={{ width: '48px', height: '1.5px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.7), transparent)', margin: '0 auto 1rem' }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(242,236,216,0.45)' }}>
                Where Vision Meets Capital
              </p>
            </div>

            {/* By Invitation Only */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.875rem', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: '3rem' }}>
              <Icon.diamond /> By Invitation Only <Icon.diamond />
            </div>

            {/* Audience grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              maxWidth: '740px', margin: '0 auto 3rem',
              border: '1px solid rgba(201,162,39,0.18)', borderRadius: '4px', overflow: 'hidden',
            }}>
              {audience.map(({ Icon: Ic, label, sub }, i) => (
                <div key={i} style={{
                  padding: '1.75rem 1rem', textAlign: 'center',
                  background: 'rgba(6,13,26,0.55)',
                  borderRight: i < 3 ? '1px solid rgba(201,162,39,0.12)' : 'none',
                  backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ color: 'var(--gold-400)', marginBottom: '0.625rem', display: 'flex', justifyContent: 'center' }}><Ic /></div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', fontWeight: 700, color: '#F2ECD8', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ fontSize: '0.62rem', color: 'rgba(242,236,216,0.4)', lineHeight: 1.5 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'rgba(242,236,216,0.6)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 3rem' }}>
              "An exclusive gathering of the minds, capital, and ambition shaping the future of Indian innovation."
            </p>

            {/* Date · Venue · Time */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0', maxWidth: '620px', margin: '0 auto 3rem', border: '1px solid rgba(201,162,39,0.22)', borderRadius: '6px', overflow: 'hidden' }}>
              {[
                { I: Icon.calendar, lines: ['21 JUNE 2026', 'SUNDAY'], label: 'Date' },
                { I: Icon.location, lines: ['STARTUP PARK,', 'BENGALURU'], label: 'Venue' },
                { I: Icon.clock,    lines: ['6PM', 'ONWARDS'], label: 'Time' },
              ].map(({ I, lines, label }, i) => (
                <div key={i} style={{
                  flex: 1, minWidth: '160px', padding: '1.5rem 1.25rem',
                  background: 'rgba(6,13,26,0.6)',
                  borderRight: i < 2 ? '1px solid rgba(201,162,39,0.12)' : 'none',
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  backdropFilter: 'blur(16px)',
                }}>
                  <div style={{ color: 'var(--gold-400)', flexShrink: 0 }}><I /></div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,162,39,0.55)', marginBottom: '0.25rem' }}>{label}</div>
                    {lines.map((l, j) => (
                      <div key={j} style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 'clamp(0.78rem, 1.8vw, 1rem)', color: j === 0 ? '#F2ECD8' : 'var(--gold-300)', lineHeight: 1.25 }}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <GoldBtn onClick={() => scrollTo('register')} style={{ fontSize: '0.9rem', padding: '1rem 3rem', gap: '0.6rem' }}>
              Register Now <Icon.arrow />
            </GoldBtn>

            {/* Bottom strip */}
            <div style={{ marginTop: '3.5rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(201,162,39,0.1)' }}>
              <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,162,39,0.4)' }}>
                Limited Seats &nbsp;&nbsp;·&nbsp;&nbsp; Exclusive Access &nbsp;&nbsp;·&nbsp;&nbsp; Lasting Impact
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            ABOUT
            ════════════════════════════════ */}
        <section id="about" style={{ padding: 'clamp(72px,9vw,110px) 0', position: 'relative', zIndex: 1, background: 'rgba(6,13,26,0.55)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,2.5rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionLabel text="About" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.875rem,5vw,3rem)', fontWeight: 700, color: '#F2ECD8', marginBottom: '0.875rem', lineHeight: 1.2 }}>
                The Ultimate Room for<br /><span style={goldText}>Next-Gen Scale</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
              {/* About text */}
              <div>
                <p style={{ fontSize: '1rem', color: 'rgba(242,236,216,0.65)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                  Join us for <strong style={{ color: '#F2ECD8' }}>Unicorn Night</strong>, an electrifying event designed by Startup Park — the leading 360° ecosystem for entrepreneurs globally. Throughout the year, we empower founders with funding, accelerators, and labs, but Unicorn Night is the culmination of it all.
                </p>
                <p style={{ fontSize: '1rem', color: 'rgba(242,236,216,0.65)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                  This goes beyond networking. It's a unique catalyst bringing together visionary founders, elite investors, high-net-worth individuals, and diplomats to define what comes next.
                </p>
                <p style={{ fontSize: '1rem', color: 'rgba(242,236,216,0.65)', lineHeight: 1.85 }}>
                  Whether you're seeking your next significant investment, initiating a transformative partnership, or participating in strategic discussions, this evening is designed for one purpose: <em style={{ color: 'var(--gold-300)' }}>limitless growth.</em>
                </p>
              </div>

              {/* What's Included */}
              <Card style={{ padding: '2.25rem 2rem', borderRadius: '14px' }}>
                <SectionLabel text="All Inclusive" />
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 700, color: '#F2ECD8', marginBottom: '1.75rem', textAlign: 'center' }}>
                  What's <span style={goldText}>Included</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'Entry to Startup Park, Bengaluru — 21 June 2026',
                    'Complimentary dinner and refreshments',
                    'Access to all keynote sessions and panel discussions',
                    'Professional networking opportunities',
                    'Event photos and highlight videos',
                    'Digital contact directory of attendees',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                      <div style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                        <Icon.check />
                      </div>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(242,236,216,0.6)', lineHeight: 1.65 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════
            REGISTER
            ════════════════════════════════ */}
        <section id="register" style={{ padding: 'clamp(72px,9vw,110px) 0', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,2.5rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel text="Register" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#F2ECD8', marginBottom: '0.75rem' }}>
                Register <span style={goldText}>Now</span>
              </h2>
              <p style={{ color: 'rgba(242,236,216,0.5)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                Submit your details below. Approved attendees receive a digital invitation within 24 hours.
              </p>
            </div>

            {regState === 'success' ? (
              <Card style={{ textAlign: 'center', padding: '3.5rem 2.5rem', borderRadius: '14px', border: '1px solid rgba(80,200,120,0.3)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(80,200,120,0.1)', border: '1px solid rgba(80,200,120,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#50C878" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', ...goldText }}>Registration Received!</h3>
                <p style={{ color: 'rgba(242,236,216,0.55)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
                  Our team will review your application and reach out within <strong style={{ color: '#F2ECD8' }}>24 hours</strong>.
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontStyle: 'italic', color: 'var(--gold-300)', fontSize: '1.05rem', marginBottom: '2rem' }}>
                  Together, let's create the next chapter of success.
                </p>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,236,216,0.35)' }}>By Startup Park LLP</p>
              </Card>
            ) : regState === 'payment' || regState === 'completing' ? (
              <Card style={{ padding: 'clamp(2rem,5vw,3rem)', borderRadius: '14px', textAlign: 'center' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', ...goldText }}>Registration Pending</h3>
                
                {serverError && (
                  <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '1.5rem', background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff7070', fontSize: '0.875rem' }}>
                    {serverError}
                  </div>
                )}

                <p style={{ color: 'rgba(242,236,216,0.6)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                  Thank you for submitting your details. To finalize your attendance at Unicorn Night, please complete the payment.
                </p>

                <GoldBtn 
                  onClick={() => setIsModalOpen(true)} 
                  style={{ width: '100%', padding: '1.1rem', fontSize: '0.88rem', borderRadius: '8px', letterSpacing: '0.12em' }}
                >
                  Pay Now / Show QR Code
                </GoldBtn>
              </Card>
            ) : (
              <Card style={{ padding: 'clamp(2rem,5vw,3rem)', borderRadius: '14px' }}>
                <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: '2rem' }}>Personal Information</h3>
                <form ref={formRef} onSubmit={submit} noValidate>
                  {serverError && (
                    <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '1.5rem', background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff7070', fontSize: '0.875rem' }}>
                      {serverError}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" style={labelStyle}>Full Name <span style={{ color: 'var(--gold-400)' }}>*</span></label>
                      <input id="fullName" name="fullName" type="text" required style={inputStyle} placeholder="Jane Doe"
                        value={formData.fullName} onChange={handle} onFocus={iFocus} onBlur={iBlur} />
                      {formErrors.fullName && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '0.4rem' }}>{formErrors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email Address <span style={{ color: 'var(--gold-400)' }}>*</span></label>
                      <input id="email" name="email" type="email" required style={inputStyle} placeholder="jane@company.com"
                        value={formData.email} onChange={handle} onFocus={iFocus} onBlur={iBlur} />
                      {formErrors.email && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '0.4rem' }}>{formErrors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" style={labelStyle}>Phone Number <span style={{ color: 'var(--gold-400)' }}>*</span></label>
                      <input id="phone" name="phone" type="tel" required style={inputStyle} placeholder="+91 98765 43210"
                        value={formData.phone} onChange={handle} onFocus={iFocus} onBlur={iBlur} />
                      {formErrors.phone && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '0.4rem' }}>{formErrors.phone}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" style={labelStyle}>Company / Organisation</label>
                      <input id="company" name="company" type="text" style={inputStyle} placeholder="Startup Park Ventures"
                        value={formData.company} onChange={handle} onFocus={iFocus} onBlur={iBlur} />
                    </div>
                  </div>

                  {/* Consent */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', cursor: 'pointer', marginBottom: '1.75rem' }}>
                    <input type="checkbox" name="termsAccepted" required
                      className="check-box"
                      style={{ marginTop: '2px' }}
                      checked={formData.termsAccepted} onChange={handle} />
                    <span style={{ fontSize: '0.85rem', color: 'rgba(242,236,216,0.55)', lineHeight: 1.7 }}>
                      I consent to professional photography and videography during the event. <span style={{ color: 'var(--gold-400)' }}>*</span>
                    </span>
                  </label>
                  {formErrors.termsAccepted && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '-1.25rem', marginBottom: '1.25rem' }}>{formErrors.termsAccepted}</p>}

                  <GoldBtn type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '1.1rem', fontSize: '0.88rem', borderRadius: '8px', letterSpacing: '0.12em' }}>
                    {isSubmitting ? <><Icon.spinner /> Submitting...</> : 'Submit Now'}
                  </GoldBtn>
                </form>

                {/* Closing line */}
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,162,39,0.1)', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontStyle: 'italic', fontSize: '1rem', color: 'var(--gold-300)', marginBottom: '0.4rem' }}>
                    Together, let's create the next chapter of success.
                  </p>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,236,216,0.3)' }}>
                    By Startup Park LLP
                  </p>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* ════════════════════════════════
            FAQs
            ════════════════════════════════ */}
        <section id="faqs" style={{ padding: 'clamp(72px,9vw,110px) 0', position: 'relative', zIndex: 1, background: 'rgba(6,13,26,0.5)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,2.5rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="FAQ's" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#F2ECD8' }}>
                Frequently Asked <span style={goldText}>Questions</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {faqs.map((faq, i) => (
                <Card key={i} style={{ borderRadius: '10px', cursor: 'pointer', borderColor: activeFaq === i ? 'rgba(201,162,39,0.45)' : 'rgba(201,162,39,0.2)', background: activeFaq === i ? 'linear-gradient(135deg, rgba(201,162,39,0.07) 0%, rgba(255,255,255,0.015) 100%)' : '', transition: 'all 0.25s' }}
                  onClick={() => setActiveFaq(p => p === i ? null : i)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.375rem 1.75rem' }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: '1rem', color: '#F2ECD8', paddingRight: '1rem' }}>{faq.q}</h3>
                    <span style={{ color: 'var(--gold-400)', flexShrink: 0 }}>{Icon.chevron(activeFaq === i)}</span>
                  </div>
                  <div style={{ maxHeight: activeFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease', paddingInline: '1.75rem', paddingBottom: activeFaq === i ? '1.375rem' : '0' }}>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(242,236,216,0.55)', lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ════════════════════════════════
          FOOTER
          ════════════════════════════════ */}
      <footer style={{ position: 'relative', zIndex: 1, background: '#030812', borderTop: '1px solid rgba(201,162,39,0.12)', padding: 'clamp(2rem,5vw,3rem) 0 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.25rem,5vw,2.5rem)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2.5rem 3rem', marginBottom: '2.5rem' }}>

            {/* Brand */}
            <div style={{ maxWidth: '260px' }}>
              <Image src="/startup-park-logo.jpg" alt="Startup Park" width={110} height={34} style={{ objectFit: 'contain', marginBottom: '0.875rem', filter: 'brightness(1) opacity(0.85)' }} />
              <p style={{ fontSize: '0.82rem', color: 'rgba(242,236,216,0.35)', lineHeight: 1.7 }}>
                India's Launchpad for Founders.<br />
                Innovate · Accelerate · Succeed.
              </p>
            </div>

            {/* Unicorn Night links */}
            <div>
              <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: '1.25rem' }}>Unicorn Night</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[['about','About'],['faqs',"FAQ's"],['register','Register']].map(([id, label]) => (
                  <button key={id} onClick={() => scrollTo(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'rgba(242,236,216,0.38)', textAlign: 'left', fontFamily: "'Inter',sans-serif", padding: 0, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-300)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,236,216,0.38)')}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: '1.25rem' }}>Contact</p>
              <a href="mailto:contact@thestartuppark.com" style={{ fontSize: '0.875rem', color: 'rgba(242,236,216,0.38)', display: 'block', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,236,216,0.38)')}>
                contact@thestartuppark.com
              </a>
              <p style={{ fontSize: '0.875rem', color: 'rgba(242,236,216,0.28)', marginBottom: '1.25rem' }}>Bengaluru, Karnataka, India</p>
              {/* Social icons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { href: 'https://www.instagram.com/thestartuppark?igsh=MXduOHZzNnIybThraA%3D%3D', Ic: Icon.instagram, label: 'Instagram' },
                  { href: 'https://www.facebook.com/thestartuppark/?rdid=P6I2uavbhuV9YMyj', Ic: Icon.facebook, label: 'Facebook' },
                  { href: 'https://x.com/startup_park', Ic: Icon.twitter, label: 'Twitter / X' },
                ].map(({ href, Ic, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ color: 'rgba(242,236,216,0.3)', transition: 'color 0.2s, transform 0.2s', display: 'flex' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-300)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,236,216,0.3)'; e.currentTarget.style.transform = 'none'; }}>
                    <Ic />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(201,162,39,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(242,236,216,0.22)' }}>© 2026 Startup Park. All Rights Reserved.</p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(242,236,216,0.22)' }}>Created by <span style={{ color: 'rgba(242,236,216,0.4)' }}>Admanics</span></p>
          </div>
        </div>
      </footer>

      {/* PAYMENT MODAL OVERLAY */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(3, 8, 18, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          animation: 'fadeIn 0.3s ease',
        }}>
          <Card style={{
            width: '100%',
            maxWidth: '380px',
            padding: '3rem 2rem 2rem',
            position: 'relative',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 15px 50px rgba(0,0,0,0.8), 0 0 30px rgba(201,162,39,0.15)',
            border: '1px solid rgba(201,162,39,0.3)',
            animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}>
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={regState === 'completing'}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'rgba(242,236,216,0.4)',
                fontSize: '1.25rem',
                cursor: regState === 'completing' ? 'not-allowed' : 'pointer',
                transition: 'color 0.2s',
                padding: '0.25rem',
                lineHeight: 1,
                zIndex: 10,
              }}
              onMouseEnter={e => { if (regState !== 'completing') e.currentTarget.style.color = '#F2ECD8'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,236,216,0.4)'; }}
            >
              ✕
            </button>
            
            {serverError && (
              <div style={{ padding: '0.875rem 1.125rem', borderRadius: '8px', marginBottom: '1.25rem', background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff7070', fontSize: '0.85rem' }}>
                {serverError}
              </div>
            )}

            <div style={{ display: 'inline-block', background: '#fff', borderRadius: '10px', padding: '10px', marginBottom: '2rem', border: '1px solid rgba(201,162,39,0.3)' }}>
              <Image 
                src="/payment_QR.jpeg" 
                alt="Payment QR Code" 
                width={300} 
                height={417} 
                style={{ borderRadius: '4px', display: 'block' }} 
                priority
              />
            </div>

            <GoldBtn 
              onClick={handleConfirmPayment} 
              disabled={regState === 'completing'} 
              style={{ width: '100%', padding: '1rem', fontSize: '0.85rem', borderRadius: '8px', letterSpacing: '0.1em' }}
            >
              {regState === 'completing' ? (
                <><Icon.spinner /> Confirming Payment...</>
              ) : (
                'Confirm Payment Completed'
              )}
            </GoldBtn>
          </Card>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @media (max-width: 560px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        
        /* Timeline Styles */
        .timeline-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 1.5rem 0;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, transparent 0%, rgba(201,162,39,0.35) 8%, rgba(201,162,39,0.35) 92%, transparent 100%);
          z-index: 0;
        }
        .timeline-line-glow {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, transparent 0%, rgba(201,162,39,0.08) 8%, rgba(201,162,39,0.08) 92%, transparent 100%);
          filter: blur(4px);
          z-index: 0;
        }
        .timeline-item {
          display: grid;
          grid-template-columns: 1fr 100px 1fr;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
          align-items: center;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-left-col {
          text-align: right;
          padding-right: 2.5rem;
        }
        .timeline-right-col {
          text-align: left;
          padding-left: 2.5rem;
        }
        .timeline-node-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
        }
        .timeline-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,162,39,0.2);
          border-radius: 12px;
          padding: 1.5rem 1.75rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .timeline-card-shimmer {
          position: absolute;
          top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,162,39,0.5), transparent);
        }
        .timeline-left-col .timeline-card:hover {
          border-color: rgba(201,162,39,0.45);
          transform: translateX(-4px);
        }
        .timeline-right-col .timeline-card:hover {
          border-color: rgba(201,162,39,0.45);
          transform: translateX(4px);
        }
        .timeline-tag {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-500);
          background: rgba(201,162,39,0.08);
          border: 1px solid rgba(201,162,39,0.25);
          padding: 0.2rem 0.6rem;
          border-radius: 3px;
          display: inline-block;
        }
        .timeline-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #F2ECD8;
          margin-bottom: 0.625rem;
          line-height: 1.35;
        }
        .timeline-desc {
          font-size: 0.85rem;
          color: rgba(242,236,216,0.5);
          line-height: 1.7;
        }
        .timeline-time {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--gold-400);
          white-space: nowrap;
        }
        .timeline-node {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.05) 100%);
          border: 1.5px solid rgba(201,162,39,0.55);
          box-shadow: 0 0 0 5px rgba(201,162,39,0.06), 0 0 20px rgba(201,162,39,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--gold-300);
          letter-spacing: 0.04em;
        }

        /* Responsive Timeline */
        @media (max-width: 768px) {
          .timeline-line, .timeline-line-glow {
            left: 22px;
            transform: none;
          }
          .timeline-item {
            display: flex;
            flex-direction: row;
            gap: 1.25rem;
            margin-bottom: 2.5rem;
            align-items: flex-start;
          }
          .timeline-col.spacer {
            display: none;
          }
          .timeline-col.active {
            flex: 1;
            width: 100%;
          }
          .timeline-left-col, .timeline-right-col {
            text-align: left;
            padding-left: 0;
            padding-right: 0;
          }
          .timeline-left-col .timeline-card:hover,
          .timeline-right-col .timeline-card:hover {
            transform: translateY(-2px);
          }
          .timeline-node-col {
            order: -1;
            flex-shrink: 0;
          }
          .timeline-node {
            width: 38px;
            height: 38px;
          }
          .timeline-time {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </>
  );
}
