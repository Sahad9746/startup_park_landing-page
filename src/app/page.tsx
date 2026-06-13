'use client';

import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   PREMIUM SVG ICON LIBRARY — no emojis
   ───────────────────────────────────────────── */
const Icon = {
  mic: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  handshake: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
    </svg>
  ),
  users: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  trend: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  building: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  star: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  camera: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  location: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
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
  diamond: () => (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
      <polygon points="5,0 10,5 5,10 0,5"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   ORNAMENTAL GOLD LINE DIVIDER
   ───────────────────────────────────────────── */
function GoldRule() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', color: 'var(--gold-400)', margin: '0 auto' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.5))' }} />
      <Icon.diamond />
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.5))' }} />
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
      <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.35))' }} />
      <span style={{ fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold-400)', whiteSpace: 'nowrap' }}>{text}</span>
      <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.35))' }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CARD
   ───────────────────────────────────────────── */
function Card({ children, style, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      {...rest}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(201,162,39,0.2)',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}>
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.55), transparent)',
      }} />
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function UnicornNight() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', company: '', jobTitle: '',
    industry: '', referral: '', dietary: [] as string[],
    requirements: '', isFundraising: false, investmentStage: '',
    helpNeeded: '', termsAccepted: false,
  });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onBlur = (e: FocusEvent) => {
      const t = e.target as HTMLInputElement;
      if (t.matches('.fi')) t.setAttribute('aria-invalid', t.checkValidity() ? 'false' : 'true');
    };
    const onInput = (e: Event) => {
      const t = e.target as HTMLInputElement;
      if (t.matches('.fi') && t.checkValidity()) t.removeAttribute('aria-invalid');
    };
    document.addEventListener('blur', onBlur, true);
    document.addEventListener('input', onInput, true);
    return () => { document.removeEventListener('blur', onBlur, true); document.removeEventListener('input', onInput, true); };
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') setFormData(p => ({ ...p, termsAccepted: checked }));
      else setFormData(p => ({ ...p, dietary: checked ? [...p.dietary, value] : p.dietary.filter(d => d !== value) }));
    } else if (type === 'radio' && name === 'isFundraising') {
      setFormData(p => ({ ...p, isFundraising: value === 'true' }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
    if (formErrors[name]) setFormErrors(p => { const n = { ...p }; delete n[name]; return n; });
  };

  const scrollToForm = () => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); setServerError(null); setFormErrors({});
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim())  errs.fullName = 'Full name is required.';
    if (!formData.email.trim())     errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.phone.trim())     errs.phone = 'Phone number is required.';
    if (!formData.company.trim())   errs.company = 'Company name is required.';
    if (!formData.jobTitle.trim())  errs.jobTitle = 'Job title is required.';
    if (!formData.industry)         errs.industry = 'Please select an industry.';
    if (!formData.referral)         errs.referral = 'Please tell us how you heard.';
    if (!formData.termsAccepted)    errs.termsAccepted = 'You must accept the terms to proceed.';
    if (Object.keys(errs).length) {
      setFormErrors(errs); setIsSubmitting(false);
      document.getElementsByName(Object.keys(errs)[0])[0]?.focus(); return;
    }
    try {
      const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        setFormData({ fullName:'',email:'',phone:'',company:'',jobTitle:'',industry:'',referral:'',dietary:[],requirements:'',isFundraising:false,investmentStage:'',helpNeeded:'',termsAccepted:false });
      } else if (data.errors) setFormErrors(data.errors);
      else setServerError(data.message || 'Registration failed. Please try again.');
    } catch { setServerError('Network error. Please check your connection and try again.'); }
    finally { setIsSubmitting(false); }
  };

  /* ── Data ── */
  const audience = [
    { Icon: Icon.users,    label: 'HNIs',               sub: 'High Net-Worth Individuals' },
    { Icon: Icon.trend,    label: 'Investors',           sub: 'Angels · VCs · Private Equity' },
    { Icon: Icon.building, label: 'Wealth Management',  sub: 'Advisory & Family Offices' },
    { Icon: Icon.star,     label: 'Business Leaders',   sub: "Karnataka's Next Changemakers" },
  ];

  const highlights = [
    { Icon: Icon.mic,       title: 'Keynote Sessions',      desc: 'Industry leaders share insights on building and backing India\'s next generation of unicorn companies.' },
    { Icon: Icon.handshake, title: 'Curated Networking',    desc: 'Structured introductions between HNIs, investors, and business leaders — every connection is intentional.' },
    { Icon: Icon.building,  title: 'Gourmet Dining',        desc: 'A multi-course dinner curated for premium conversation in a world-class Bengaluru venue.' },
    { Icon: Icon.trend,     title: 'Investment Showcase',   desc: 'High-conviction founders present directly to an exclusive room of capital allocators and decision-makers.' },
    { Icon: Icon.star,      title: 'The Unicorn Effect',    desc: 'Leave with relationships that shape careers, portfolios, and companies for the decade ahead.' },
    { Icon: Icon.camera,    title: 'Premium Coverage',      desc: '4K videography, professional photography, and a same-day highlight reel — your evening, beautifully documented.' },
  ];

  const faqs = [
    { q: 'Is this event free or paid?', a: 'Unicorn Night is a complimentary, invitation-only experience for vetted HNIs, investors, and business leaders. Registration is subject to a review. Approved attendees receive a digital entry pass.' },
    { q: 'Who is this event designed for?', a: 'High Net-Worth Individuals, active investors, wealth management professionals, and Karnataka\'s next generation of business leaders. Every seat is carefully vetted to ensure quality.' },
    { q: 'What is the dress code?', a: 'Smart Formal. This is a premium executive evening — business formal attire is expected and appropriate for the calibre of guests.' },
    { q: 'Will there be vegetarian and vegan options?', a: 'Yes. A fully curated gourmet menu covers all dietary preferences including vegetarian, vegan, and gluten-free options. Please specify your requirements during registration.' },
    { q: 'How are attendees selected?', a: 'Our committee reviews each application by role, industry, and alignment with the Unicorn Night community. We prioritise investors, HNIs, wealth managers, and strategic business leaders.' },
    { q: 'What happens after I register?', a: 'You\'ll receive a confirmation immediately. Approved attendees receive an official invitation with a digital QR entry pass and venue details within 24–48 hours.' },
  ];

  /* ── Styles ── */
  const S = {
    section: (bg?: string): React.CSSProperties => ({
      padding: 'clamp(72px, 9vw, 110px) 0',
      position: 'relative', zIndex: 1,
      ...(bg ? { background: bg } : {}),
    }),
    sectionTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 'clamp(2rem, 5vw, 3.25rem)',
      fontWeight: 700,
      lineHeight: 1.15,
      color: '#F2ECD8',
      marginBottom: '0.875rem',
    } as React.CSSProperties,
    label: {
      fontSize: '0.62rem', fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase' as const,
      color: 'rgba(242,236,216,0.5)', marginBottom: '0.5rem', display: 'block',
    },
    input: {
      width: '100%',
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(201,162,39,0.18)',
      borderRadius: '8px',
      color: '#F2ECD8',
      padding: '0.8rem 1rem',
      fontSize: '0.9rem',
      fontFamily: "'Inter', sans-serif",
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    } as React.CSSProperties,
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(201,162,39,0.5)';
    e.target.style.boxShadow = '0 0 0 3px rgba(201,162,39,0.07)';
    e.target.style.background = 'rgba(201,162,39,0.04)';
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(201,162,39,0.18)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(255,255,255,0.035)';
  };

  return (
    <>
      {/* ── STARFIELD BG ── */}
      <div className="star-bg" aria-hidden>
        <div className="stars-sm" />
        <div className="stars-md" />
        <div className="stars-lg" />
      </div>

      {/* ══════════════════════════════════════════════
          HEADER — modern, clean, premium
          ══════════════════════════════════════════════ */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        height: '68px',
        background: scrolled
          ? 'rgba(3,8,18,0.88)'
          : 'rgba(3,8,18,0.2)',
        backdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.6)' : 'blur(8px)',
        borderBottom: scrolled
          ? '1px solid rgba(201,162,39,0.15)'
          : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}>
        <div style={{
          maxWidth: '1160px', margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 2.5rem)',
          height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* ── Logo ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '0.55rem', fontStyle: 'italic', color: 'rgba(201,162,39,0.65)', letterSpacing: '0.08em', lineHeight: 1 }}>iQue presents</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              {/* Logo pill — like the poster */}
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.01em',
                color: '#F2ECD8',
                border: '1.5px solid rgba(242,236,216,0.75)',
                padding: '2px 12px 3px',
                borderRadius: '100px',
                lineHeight: 1.3,
              }}>
                Startup Park
              </div>
              {/* Separator */}
              <span style={{ color: 'rgba(201,162,39,0.4)', fontSize: '0.7rem' }}>·</span>
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--gold-400)',
              }}>Bengaluru</span>
            </div>
          </div>

          {/* ── Nav ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {['Highlights', 'Agenda', 'Register', 'FAQs'].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{
                padding: '0.45rem 0.875rem',
                fontSize: '0.75rem', fontWeight: 500,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'rgba(242,236,216,0.5)',
                borderRadius: '6px',
                transition: 'color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F2ECD8'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,236,216,0.5)'; e.currentTarget.style.background = 'transparent'; }}>
                {n}
              </a>
            ))}
            {/* CTA */}
            <button onClick={scrollToForm} style={{
              marginLeft: '0.75rem',
              padding: '0.5rem 1.25rem',
              background: 'var(--grad-gold)',
              border: 'none',
              borderRadius: '6px',
              color: '#0A0600',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '0.73rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(201,162,39,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(201,162,39,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 20px rgba(201,162,39,0.3)'; }}>
              Register Now
            </button>
          </div>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ══════════════════════════════════════════════
            HERO
            ══════════════════════════════════════════════ */}
        <section style={{ paddingTop: 'clamp(120px, 16vw, 175px)', paddingBottom: 'clamp(64px, 8vw, 96px)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>

            {/* Brand row */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.7rem', fontStyle: 'italic', color: 'rgba(201,162,39,0.6)', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>iQue presents</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 700,
                  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                  color: '#F2ECD8',
                  border: '2px solid rgba(242,236,216,0.75)',
                  padding: '5px 22px 7px',
                  borderRadius: '100px',
                  letterSpacing: '0.01em',
                }}>
                  Startup Park
                </div>
              </div>
              {/* BENGALURU ornamental row */}
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', maxWidth: '280px', margin: '1rem auto 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.6))' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.32em', color: 'var(--gold-400)', textTransform: 'uppercase' }}>Bengaluru</span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.6))' }} />
              </div>
            </div>

            {/* UNICORN NIGHT — giant title */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                fontFamily: "'Cinzel', 'Playfair Display', serif",
                fontSize: 'clamp(3.5rem, 16vw, 11rem)',
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
                background: 'linear-gradient(160deg, #FFFBF0 0%, #F5E6A3 18%, #D4AF37 50%, #8A5C0F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 50px rgba(201,162,39,0.2))',
                userSelect: 'none',
              }}>
                <div>UNICORN</div>
                <div>NIGHT</div>
              </div>
            </div>

            {/* Tagline */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#F2ECD8', marginBottom: '0.35rem',
              }}>
                An Exclusive Evening
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
                fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(242,236,216,0.55)',
              }}>
                Where Vision Meets Capital
              </p>
              <div style={{ width: '48px', height: '2px', background: 'var(--grad-gold-h)', margin: '1.25rem auto 0' }} />
            </div>

            {/* By Invitation Only */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: '3.5rem',
            }}>
              <Icon.diamond /> By Invitation Only <Icon.diamond />
            </div>

            {/* Audience grid — 4 columns, no emojis */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              maxWidth: '720px', margin: '0 auto 3.5rem',
              border: '1px solid rgba(201,162,39,0.2)', borderRadius: '2px',
              overflow: 'hidden',
            }}>
              {audience.map(({ Icon: Ic, label, sub }, i) => (
                <div key={i} style={{
                  padding: '1.75rem 1rem',
                  textAlign: 'center',
                  background: 'rgba(6,13,26,0.55)',
                  borderRight: i < 3 ? '1px solid rgba(201,162,39,0.15)' : 'none',
                  backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ color: 'var(--gold-400)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                    <Ic />
                  </div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '0.82rem', fontWeight: 700, color: '#F2ECD8', marginBottom: '0.3rem', letterSpacing: '0.02em' }}>{label}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(242,236,216,0.45)', lineHeight: 1.5 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'rgba(242,236,216,0.65)',
              lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 3rem',
            }}>
              A curated gathering of leaders, innovators &amp; changemakers shaping the future of business in India.
            </p>

            {/* Date + Venue */}
            <div style={{
              display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0',
              maxWidth: '540px', margin: '0 auto 3rem',
              border: '1px solid rgba(201,162,39,0.22)', borderRadius: '6px', overflow: 'hidden',
            }}>
              {[
                { I: Icon.calendar, top: '21 JUNE', bot: '2026', label: 'Date' },
                { I: Icon.location, top: 'STARTUP PARK,', bot: 'BENGALURU', label: 'Venue' },
              ].map(({ I, top, bot, label }, i) => (
                <div key={i} style={{
                  flex: 1, minWidth: '210px', padding: '1.5rem 1.75rem',
                  background: 'rgba(6,13,26,0.6)',
                  borderRight: i === 0 ? '1px solid rgba(201,162,39,0.15)' : 'none',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  backdropFilter: 'blur(16px)',
                }}>
                  <div style={{ color: 'var(--gold-400)', flexShrink: 0 }}><I /></div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: '#F2ECD8', lineHeight: 1.25 }}>{top}</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--gold-300)', lineHeight: 1.25 }}>{bot}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={scrollToForm} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.95rem 2.5rem',
                background: 'var(--grad-gold)',
                border: 'none', borderRadius: '6px',
                color: '#0A0600', fontFamily: "'Inter',sans-serif",
                fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(201,162,39,0.3), 0 4px 20px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(201,162,39,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,162,39,0.3)'; }}>
                Request Invitation <Icon.arrow />
              </button>
              <a href="#highlights" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.95rem 2.5rem',
                background: 'transparent',
                border: '1px solid rgba(201,162,39,0.4)', borderRadius: '6px',
                color: 'rgba(242,236,216,0.75)', fontFamily: "'Inter',sans-serif",
                fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.7)'; e.currentTarget.style.color = '#F2ECD8'; e.currentTarget.style.background = 'rgba(201,162,39,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)'; e.currentTarget.style.color = 'rgba(242,236,216,0.75)'; e.currentTarget.style.background = 'transparent'; }}>
                Explore the Evening
              </a>
            </div>

            {/* Bottom marquee text */}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(201,162,39,0.1)' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,162,39,0.45)' }}>
                Limited Seats &nbsp;&nbsp;·&nbsp;&nbsp; Exclusive Access &nbsp;&nbsp;·&nbsp;&nbsp; Lasting Impact
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            HIGHLIGHTS
            ══════════════════════════════════════════════ */}
        <section id="highlights" style={S.section('rgba(9,18,32,0.5)')}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionLabel text="The Experience" />
              <h2 style={S.sectionTitle}>Where <span style={{ background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Deals Begin</span></h2>
              <p style={{ color: 'rgba(242,236,216,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto' }}>
                A meticulously curated evening delivering premium knowledge, access, and connections for India's most ambitious leaders.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
              {highlights.map(({ Icon: Ic, title, desc }) => (
                <Card key={title} style={{ padding: '2rem 1.875rem', transition: 'transform 0.3s, border-color 0.3s' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { const el = e.currentTarget; el.style.transform = 'translateY(-5px)'; el.style.borderColor = 'rgba(201,162,39,0.4)'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'rgba(201,162,39,0.2)'; }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '10px',
                    background: 'rgba(201,162,39,0.07)', border: '1px solid rgba(201,162,39,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold-400)', marginBottom: '1.25rem',
                  }}>
                    <Ic />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', fontWeight: 700, color: '#F2ECD8', marginBottom: '0.65rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(242,236,216,0.5)', lineHeight: 1.7 }}>{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            AGENDA — Premium Alternating Timeline
            ══════════════════════════════════════════════ */}
        <section id="agenda" style={S.section()}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <SectionLabel text="The Evening" />
              <h2 style={S.sectionTitle}>
                Evening <span style={{ background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Programme</span>
              </h2>
              <p style={{ color: 'rgba(242,236,216,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '420px', margin: '0 auto' }}>
                A curated flow of high-value sessions, gourmet dining, and organic premium networking.
              </p>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>

              {/* ── Central glowing vertical line ── */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0, bottom: 0,
                width: '1px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, transparent 0%, rgba(201,162,39,0.35) 8%, rgba(201,162,39,0.35) 92%, transparent 100%)',
                zIndex: 0,
              }} />
              {/* Glow overlay on line */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: 0, bottom: 0,
                width: '3px',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, transparent 0%, rgba(201,162,39,0.08) 8%, rgba(201,162,39,0.08) 92%, transparent 100%)',
                filter: 'blur(4px)',
                zIndex: 0,
              }} />

              {/* ── Timeline Events ── */}
              {[
                { time: '6:00 PM', num: '01', title: 'Arrival & Welcome Cocktails',    desc: 'Curated welcome drinks, badge collection, and curated introductions in the Grand Foyer. The evening begins.', tag: 'Networking' },
                { time: '6:30 PM', num: '02', title: 'Opening Address',                desc: 'Startup Park leadership set the vision for the evening, welcoming Bengaluru\'s most influential business community.', tag: 'Keynote' },
                { time: '7:00 PM', num: '03', title: 'The Unicorn Blueprint',          desc: 'A tier-1 investor or unicorn founder shares their blueprint for building and backing India\'s next billion-dollar companies.', tag: 'Keynote' },
                { time: '7:45 PM', num: '04', title: 'Panel: Capital & Strategy',      desc: 'HNIs, fund managers, and wealth advisors discuss capital deployment, portfolio strategy, and high-growth sector opportunities.', tag: 'Panel' },
                { time: '8:30 PM', num: '05', title: 'Gourmet Dinner & Networking',   desc: 'Multi-course dinner with curated table introductions. Each seat is intentionally placed — every conversation is a potential partnership.', tag: 'Dinner' },
                { time: '9:30 PM', num: '06', title: 'Lounge & Closing',              desc: 'An open premium lounge where the evening\'s most meaningful conversations continue. The night ends when deals do.', tag: 'Networking' },
              ].map(({ time, num, title, desc, tag }, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 1fr',
                    gap: '0',
                    marginBottom: i < 5 ? '3rem' : '0',
                    position: 'relative', zIndex: 1,
                    alignItems: 'center',
                  }}>
                    {/* Left column — card or spacer */}
                    <div style={{ paddingRight: '2.5rem', ...(isLeft ? {} : { visibility: 'hidden' }) }}>
                      <div
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(201,162,39,0.2)',
                          borderRadius: '12px',
                          padding: '1.75rem 2rem',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'border-color 0.3s, transform 0.3s',
                          cursor: 'default',
                          textAlign: 'right',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,162,39,0.5)';
                          (e.currentTarget as HTMLDivElement).style.transform = 'translateX(-4px)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,162,39,0.2)';
                          (e.currentTarget as HTMLDivElement).style.transform = 'none';
                        }}
                      >
                        {/* Top shimmer */}
                        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.5), transparent)' }} />
                        {/* Tag */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.875rem' }}>
                          <span style={{
                            fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em',
                            textTransform: 'uppercase', color: 'var(--gold-500)',
                            background: 'rgba(201,162,39,0.08)',
                            border: '1px solid rgba(201,162,39,0.2)',
                            padding: '0.2rem 0.6rem', borderRadius: '3px',
                          }}>{tag}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', fontWeight: 700, color: '#F2ECD8', marginBottom: '0.625rem', lineHeight: 1.3 }}>{title}</h3>
                        <p style={{ fontSize: '0.84rem', color: 'rgba(242,236,216,0.5)', lineHeight: 1.7 }}>{desc}</p>
                      </div>
                    </div>

                    {/* Center — node */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      {/* Time label */}
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--gold-400)', whiteSpace: 'nowrap' }}>{time}</span>
                      {/* Gold ring node */}
                      <div style={{
                        width: '44px', height: '44px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(201,162,39,0.15) 0%, rgba(201,162,39,0.05) 100%)',
                        border: '1.5px solid rgba(201,162,39,0.55)',
                        boxShadow: '0 0 0 5px rgba(201,162,39,0.06), 0 0 20px rgba(201,162,39,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span style={{ fontFamily: "'Cinzel',serif", fontSize: '0.65rem', fontWeight: 700, color: 'var(--gold-300)', letterSpacing: '0.04em' }}>{num}</span>
                      </div>
                    </div>

                    {/* Right column — card or spacer */}
                    <div style={{ paddingLeft: '2.5rem', ...(!isLeft ? {} : { visibility: 'hidden' }) }}>
                      <div
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(201,162,39,0.2)',
                          borderRadius: '12px',
                          padding: '1.75rem 2rem',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'border-color 0.3s, transform 0.3s',
                          cursor: 'default',
                          textAlign: 'left',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,162,39,0.5)';
                          (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,162,39,0.2)';
                          (e.currentTarget as HTMLDivElement).style.transform = 'none';
                        }}
                      >
                        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.5), transparent)' }} />
                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.875rem' }}>
                          <span style={{
                            fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em',
                            textTransform: 'uppercase', color: 'var(--gold-500)',
                            background: 'rgba(201,162,39,0.08)',
                            border: '1px solid rgba(201,162,39,0.2)',
                            padding: '0.2rem 0.6rem', borderRadius: '3px',
                          }}>{tag}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', fontWeight: 700, color: '#F2ECD8', marginBottom: '0.625rem', lineHeight: 1.3 }}>{title}</h3>
                        <p style={{ fontSize: '0.84rem', color: 'rgba(242,236,216,0.5)', lineHeight: 1.7 }}>{desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom strip */}
            <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(201,162,39,0.1)' }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,162,39,0.4)' }}>
                21 June 2026 &nbsp;·&nbsp; Startup Park, Bengaluru &nbsp;·&nbsp; 6:00 PM — 10:00 PM IST
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            WHAT'S INCLUDED
            ══════════════════════════════════════════════ */}
        <section style={S.section('rgba(9,18,32,0.5)')}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>
            <Card style={{ maxWidth: '840px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem)', borderRadius: '14px', border: '1px solid rgba(201,162,39,0.22)' }}>
              <SectionLabel text="All Inclusive" />
              <h2 style={{ ...S.sectionTitle, textAlign: 'center', marginBottom: '2.5rem' }}>
                What's <span style={{ background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Included</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem 2rem' }}>
                {[
                  'All-access invitation to Startup Park, Bengaluru — 21 June 2026',
                  'Complimentary multi-course gourmet dinner with curated beverages',
                  'Access to all keynotes, panel discussions, and fireside sessions',
                  'Professional networking headshots by the event photographer',
                  'Same-day highlight reel assets shared to all attendees',
                  'Curated digital contact directory of the evening\'s participants',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <div style={{
                      flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
                      background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
                    }}>
                      <Icon.check />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(242,236,216,0.6)', lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            REGISTRATION FORM
            ══════════════════════════════════════════════ */}
        <section id="register" style={S.section()}>
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="Register" />
              <h2 style={S.sectionTitle}>Claim Your <span style={{ background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Invitation</span></h2>
              <p style={{ color: 'rgba(242,236,216,0.5)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto' }}>
                Applications are reviewed in the order received. Approved attendees receive a digital QR entry pass within 24–48 hours.
              </p>
            </div>

            {isSuccess ? (
              <Card style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center', padding: '4rem 3rem', borderRadius: '14px', border: '1px solid rgba(80,200,120,0.3)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(80,200,120,0.1)', border: '1px solid rgba(80,200,120,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#50C878" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.875rem', background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Application Received
                </h3>
                <p style={{ color: 'rgba(242,236,216,0.55)', lineHeight: 1.75, marginBottom: '2rem' }}>
                  Our committee will review your application within <strong style={{ color: '#F2ECD8' }}>24–48 hours</strong>. Approved guests receive a VIP digital pass with QR code, venue details, and a calendar invite.
                </p>
                <button onClick={() => setIsSuccess(false)} style={{ padding: '0.75rem 2rem', background: 'transparent', border: '1px solid rgba(201,162,39,0.4)', borderRadius: '6px', color: 'rgba(242,236,216,0.75)', fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>
                  Register Another Guest
                </button>
              </Card>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate>
                {serverError && (
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '2rem', background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff7070', fontSize: '0.875rem' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {serverError}
                  </div>
                )}

                {/* ── Personal Information ── */}
                <Card style={{ padding: 'clamp(1.75rem,4vw,2.75rem)', borderRadius: '12px', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: '2rem' }}>Personal Information</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    {[
                      { id: 'fullName', label: 'Full Name', type: 'text', ph: 'Jane Doe', req: true },
                      { id: 'email',    label: 'Email Address', type: 'email', ph: 'jane@company.com', req: true },
                      { id: 'phone',    label: 'Phone Number', type: 'tel', ph: '+91 98765 43210', req: true },
                      { id: 'company',  label: 'Company / Organisation', type: 'text', ph: 'Startup Park Ventures', req: true },
                    ].map(({ id, label, type, ph, req }) => (
                      <div key={id}>
                        <label htmlFor={id} style={S.label}>{label}{req && <span style={{ color: 'var(--gold-400)' }}> *</span>}</label>
                        <input type={type} id={id} name={id} className="fi"
                          style={S.input} placeholder={ph}
                          value={(formData as any)[id]} onChange={handle}
                          required={req}
                          onFocus={inputFocus} onBlur={inputBlur}
                        />
                        {formErrors[id] && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '0.4rem' }}>{formErrors[id]}</p>}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* ── Professional Details ── */}
                <Card style={{ padding: 'clamp(1.75rem,4vw,2.75rem)', borderRadius: '12px', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: '2rem' }}>Professional Details</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label htmlFor="jobTitle" style={S.label}>Job Title / Role <span style={{ color: 'var(--gold-400)' }}>*</span></label>
                      <input type="text" id="jobTitle" name="jobTitle" className="fi"
                        style={S.input} placeholder="Founder / Managing Partner / CXO"
                        value={formData.jobTitle} onChange={handle} required onFocus={inputFocus} onBlur={inputBlur} />
                      {formErrors.jobTitle && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '0.4rem' }}>{formErrors.jobTitle}</p>}
                    </div>
                    <div>
                      <label htmlFor="industry" style={S.label}>Industry / Sector <span style={{ color: 'var(--gold-400)' }}>*</span></label>
                      <select id="industry" name="industry" className="fi"
                        style={{ ...S.input, appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23C9A227' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.875rem center', paddingRight: '2.5rem' } as React.CSSProperties}
                        value={formData.industry} onChange={handle} required onFocus={inputFocus} onBlur={inputBlur}>
                        <option value="">Select your industry</option>
                        {['Technology', 'Finance / Fintech', 'Wealth Management', 'Real Estate', 'Manufacturing', 'Healthcare / Biotech', 'Education', 'E-Commerce', 'Other'].map(o => <option key={o} value={o} style={{ background: '#0D1A2E' }}>{o}</option>)}
                      </select>
                      {formErrors.industry && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '0.4rem' }}>{formErrors.industry}</p>}
                    </div>
                    <div>
                      <label htmlFor="referral" style={S.label}>How did you hear about Unicorn Night? <span style={{ color: 'var(--gold-400)' }}>*</span></label>
                      <select id="referral" name="referral" className="fi"
                        style={{ ...S.input, appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23C9A227' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.875rem center', paddingRight: '2.5rem' } as React.CSSProperties}
                        value={formData.referral} onChange={handle} required onFocus={inputFocus} onBlur={inputBlur}>
                        <option value="">Select an option</option>
                        {['Startup Park Website', 'Email Invite', 'LinkedIn', 'WhatsApp Group', 'Friend / Referral', 'Other'].map(o => <option key={o} value={o} style={{ background: '#0D1A2E' }}>{o}</option>)}
                      </select>
                      {formErrors.referral && <p style={{ color: '#ff7070', fontSize: '0.75rem', marginTop: '0.4rem' }}>{formErrors.referral}</p>}
                    </div>
                    <div>
                      <label style={S.label}>Actively Fundraising / Deploying Capital?</label>
                      <div style={{ display: 'flex', gap: '2rem', marginTop: '0.6rem' }}>
                        {[['true', 'Yes'], ['false', 'No']].map(([val, lbl]) => (
                          <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'rgba(242,236,216,0.7)' }}>
                            <input type="radio" name="isFundraising" value={val}
                              style={{ appearance: 'none', width: '17px', height: '17px', border: '1px solid rgba(201,162,39,0.3)', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', position: 'relative', flexShrink: 0 } as React.CSSProperties}
                              checked={String(formData.isFundraising) === val} onChange={handle} />
                            {lbl}
                          </label>
                        ))}
                      </div>
                    </div>
                    {formData.isFundraising && (
                      <div>
                        <label htmlFor="investmentStage" style={S.label}>Investment Stage / Ticket Size</label>
                        <select id="investmentStage" name="investmentStage" className="fi"
                          style={{ ...S.input, appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23C9A227' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.875rem center', paddingRight: '2.5rem' } as React.CSSProperties}
                          value={formData.investmentStage} onChange={handle} onFocus={inputFocus} onBlur={inputBlur}>
                          <option value="">Select stage</option>
                          {['Angel / HNI', 'Pre-seed', 'Seed', 'Series A', 'Series B+', 'Growth / PE'].map(o => <option key={o} value={o} style={{ background: '#0D1A2E' }}>{o}</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                </Card>

                {/* ── Preferences ── */}
                <Card style={{ padding: 'clamp(1.75rem,4vw,2.75rem)', borderRadius: '12px', marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: '2rem' }}>Preferences & Accessibility</p>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <label style={S.label}>Dietary Requirements</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: '0.875rem', marginTop: '0.625rem' }}>
                      {['Vegetarian', 'Vegan', 'Gluten-Free', 'Non-Vegetarian', 'No Restrictions'].map(d => (
                        <label key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'rgba(242,236,216,0.6)', userSelect: 'none' }}>
                          <input type="checkbox" name="dietary" value={d}
                            style={{ appearance: 'none', width: '16px', height: '16px', border: '1px solid rgba(201,162,39,0.3)', borderRadius: '3px', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', flexShrink: 0 } as React.CSSProperties}
                            checked={formData.dietary.includes(d)} onChange={handle} />
                          {d}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.25rem' }}>
                    <div>
                      <label htmlFor="requirements" style={S.label}>Special Requirements / Accessibility</label>
                      <textarea id="requirements" name="requirements" className="fi"
                        style={{ ...S.input, resize: 'vertical', minHeight: '90px' }} rows={3}
                        placeholder="e.g. wheelchair access, dietary allergies..."
                        value={formData.requirements} onChange={handle}
                        onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                    <div>
                      <label htmlFor="helpNeeded" style={S.label}>How can Startup Park support your journey?</label>
                      <textarea id="helpNeeded" name="helpNeeded" className="fi"
                        style={{ ...S.input, resize: 'vertical', minHeight: '90px' }} rows={3}
                        placeholder="e.g. investor introductions, mentorship, co-working..."
                        value={formData.helpNeeded} onChange={handle}
                        onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                  </div>
                </Card>

                {/* Terms */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', cursor: 'pointer' }}>
                    <input type="checkbox" name="termsAccepted"
                      style={{ appearance: 'none', width: '17px', height: '17px', border: '1px solid rgba(201,162,39,0.3)', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', cursor: 'pointer', flexShrink: 0, marginTop: '2px' } as React.CSSProperties}
                      checked={formData.termsAccepted} onChange={handle} required />
                    <span style={{ fontSize: '0.875rem', color: 'rgba(242,236,216,0.55)', lineHeight: 1.7 }}>
                      I agree to the <span style={{ color: 'var(--gold-300)', cursor: 'pointer' }}>terms &amp; conditions</span> and <span style={{ color: 'var(--gold-300)', cursor: 'pointer' }}>privacy policy</span>. I consent to professional photography and videography during the event. <span style={{ color: 'var(--gold-400)' }}>*</span>
                    </span>
                  </label>
                  {formErrors.termsAccepted && <p style={{ color: '#ff7070', fontSize: '0.78rem', marginTop: '0.5rem', marginLeft: '1.875rem' }}>{formErrors.termsAccepted}</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={isSubmitting} style={{
                  width: '100%', padding: '1.1rem',
                  background: isSubmitting ? 'rgba(201,162,39,0.5)' : 'var(--grad-gold)',
                  border: 'none', borderRadius: '8px',
                  color: '#0A0600', fontFamily: "'Inter',sans-serif",
                  fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  boxShadow: '0 0 30px rgba(201,162,39,0.25)',
                  transition: 'opacity 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.boxShadow = '0 0 50px rgba(201,162,39,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(201,162,39,0.25)'; }}>
                  {isSubmitting ? <><Icon.spinner /> Securing Your Seat...</> : 'Submit Registration Request'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FAQs
            ══════════════════════════════════════════════ */}
        <section id="faqs" style={S.section('rgba(9,18,32,0.5)')}>
          <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel text="FAQs" />
              <h2 style={S.sectionTitle}>Frequently Asked <span style={{ background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</span></h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {faqs.map((faq, i) => (
                <Card key={i} style={{ borderRadius: '8px', cursor: 'pointer', borderColor: activeFaq === i ? 'rgba(201,162,39,0.4)' : 'rgba(201,162,39,0.2)', background: activeFaq === i ? 'linear-gradient(135deg, rgba(201,162,39,0.06) 0%, rgba(255,255,255,0.015) 100%)' : '', transition: 'all 0.25s' }}
                  onClick={() => setActiveFaq(p => p === i ? null : i)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.75rem' }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: '0.975rem', color: '#F2ECD8', paddingRight: '1rem' }}>{faq.q}</h3>
                    <span style={{ color: 'var(--gold-400)', flexShrink: 0 }}>{Icon.chevron(activeFaq === i)}</span>
                  </div>
                  <div style={{ maxHeight: activeFaq === i ? '240px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease', paddingInline: '1.75rem', paddingBottom: activeFaq === i ? '1.375rem' : '0' }}>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(242,236,216,0.55)', lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            BOTTOM CTA
            ══════════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(56px, 7vw, 80px) 0', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(201,162,39,0.1)', textAlign: 'center' }}>
          <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>
            <GoldRule />
            <h2 style={{ fontFamily: "'Cinzel','Playfair Display',serif", fontSize: 'clamp(1.875rem,5vw,3.5rem)', fontWeight: 900, lineHeight: 1.15, marginTop: '2.5rem', marginBottom: '0.875rem' }}>
              <span style={{ background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Limited Seats.</span>{' '}
              <span style={{ color: '#F2ECD8' }}>Unlimited Connections.</span>
            </h2>
            <p style={{ color: 'rgba(242,236,216,0.5)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>21 June 2026 &nbsp;·&nbsp; Startup Park, Bengaluru &nbsp;·&nbsp; By Invitation Only</p>
            <button onClick={scrollToForm} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1rem 3rem', background: 'var(--grad-gold)', border: 'none', borderRadius: '6px',
              color: '#0A0600', fontFamily: "'Inter',sans-serif",
              fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', boxShadow: '0 0 30px rgba(201,162,39,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(201,162,39,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 0 30px rgba(201,162,39,0.3)'; }}>
              Request Your Invitation <Icon.arrow />
            </button>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <footer style={{ position: 'relative', zIndex: 1, background: '#030812', borderTop: '1px solid rgba(201,162,39,0.12)', padding: 'clamp(2rem,4vw,2.75rem) 0 1.5rem' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 2.5rem)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2.5rem 3rem', marginBottom: '2.5rem' }}>
            <div style={{ maxWidth: '260px' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '0.95rem', fontWeight: 700, border: '1.5px solid rgba(242,236,216,0.6)', display: 'inline-flex', padding: '2px 12px 3px', borderRadius: '100px', color: '#F2ECD8', marginBottom: '0.75rem' }}>Startup Park</div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(242,236,216,0.4)', lineHeight: 1.7 }}>India's Launchpad for Founders.<br />Innovate · Accelerate · Succeed.</p>
            </div>
            <div>
              <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: '1.25rem' }}>Unicorn Night</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[['#highlights','Highlights'],['#agenda','Agenda'],['#register','Register'],['#faqs','FAQs']].map(([href, label]) => (
                  <a key={href} href={href} style={{ fontSize: '0.85rem', color: 'rgba(242,236,216,0.4)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-300)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,236,216,0.4)')}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: '1.25rem' }}>Contact</p>
              <a href="mailto:contact@thestartuppark.com" style={{ fontSize: '0.85rem', color: 'rgba(242,236,216,0.4)', display: 'block', marginBottom: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-300)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,236,216,0.4)')}>
                contact@thestartuppark.com
              </a>
              <p style={{ fontSize: '0.85rem', color: 'rgba(242,236,216,0.3)' }}>Bengaluru, Karnataka, India</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(201,162,39,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(242,236,216,0.25)' }}>© {new Date().getFullYear()} Startup Park · iQue. All Rights Reserved.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['LinkedIn','Instagram','Twitter'].map(s => (
                <a key={s} href="#" style={{ fontSize: '0.72rem', color: 'rgba(242,236,216,0.25)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-300)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,236,216,0.25)')}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 560px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        select option { background: #0D1A2E !important; }
      `}</style>
    </>
  );
}
