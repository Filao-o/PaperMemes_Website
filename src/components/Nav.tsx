'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    closeMenu();
    const target = document.querySelector(id);
    if (target) {
      // section présente sur la page courante → scroll doux
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    // sinon : on laisse le lien /#id naviguer vers l'accueil
  };

  return (
    <header ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="Papermemes — home">
          <Image
            src="/logo/papermeme-removebg.png"
            alt="Papermemes"
            width={120}
            height={120}
            style={{ width: 'auto', height: 120 }}
            className="logo-img"
            priority
          />
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li><a href="/#suite" onClick={e => scrollTo(e, '#suite')}>Fonctionnalités</a></li>
            <li><a href="/#how" onClick={e => scrollTo(e, '#how')}>Comment ça marche</a></li>
            <li><a href="/#why" onClick={e => scrollTo(e, '#why')}>Pourquoi PaperMemes</a></li>
            <li><a href="/#faq" onClick={e => scrollTo(e, '#faq')}>FAQ</a></li>
          </ul>
        </nav>
        <div className="nav-cta">
          <Link href="/pro" className="btn btn-gold" onClick={closeMenu}>PaperMemes Pro</Link>
          <a href="/#install" className="btn btn-nav" onClick={e => scrollTo(e, '#install')}>
            Installer l&apos;extension PaperMemes
          </a>
        </div>
        <button
          className="nav-burger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobileMenu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      <div id="mobileMenu" className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile menu">
        <nav>
          <ul>
            <li><a href="/#suite" onClick={e => scrollTo(e, '#suite')}>Fonctionnalités</a></li>
            <li><a href="/#how" onClick={e => scrollTo(e, '#how')}>Comment ça marche</a></li>
            <li><a href="/#why" onClick={e => scrollTo(e, '#why')}>Pourquoi PaperMemes</a></li>
            <li><a href="/#faq" onClick={e => scrollTo(e, '#faq')}>FAQ</a></li>
            <li><Link href="/pro" className="btn btn-mobile btn-gold" onClick={closeMenu}>PaperMemes Pro</Link></li>
            <li><a href="/#install" className="btn btn-mobile" onClick={e => scrollTo(e, '#install')}>Installer l&apos;extension PaperMemes</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
