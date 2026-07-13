'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

type AuthTab = 'login' | 'register';

export default function Nav() {
  const { user, loading, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>('login');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
        setUserMenuOpen(false);
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
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const openAuth = (tab: AuthTab) => {
    setAuthTab(tab);
    setAuthOpen(true);
    setMenuOpen(false);
  };

  const avatar = user?.photoURL;
  const initials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? '?';

  return (
    <>
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
            {loading && <div className="nav-avatar-skeleton" />}

            {!loading && !user && (
              <>
                <button className="btn btn-ghost-nav" onClick={() => openAuth('login')}>
                  Connexion
                </button>
                <button className="btn btn-nav" onClick={() => openAuth('register')}>
                  S&apos;inscrire
                </button>
              </>
            )}

            {!loading && user && (
              <div className="nav-user">
                <button
                  className="nav-avatar"
                  onClick={() => setUserMenuOpen(o => !o)}
                  aria-label="Mon compte"
                  aria-expanded={userMenuOpen}
                >
                  {avatar ? (
                    <Image src={avatar} alt="" width={36} height={36} className="nav-avatar-img" />
                  ) : (
                    <span className="nav-avatar-initials">{initials}</span>
                  )}
                </button>

                {userMenuOpen && (
                  <div className="nav-user-menu">
                    <div className="nav-user-info">
                      <span className="nav-user-name">{user.displayName ?? 'Mon compte'}</span>
                      <span className="nav-user-email">{user.email}</span>
                    </div>
                    <hr className="nav-user-sep" />
                    <Link href="/account" className="nav-user-item" onClick={() => setUserMenuOpen(false)}>
                      Mon compte
                    </Link>
                    <button
                      className="nav-user-item nav-user-logout"
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}
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
              {!loading && !user && (
                <>
                  <li>
                    <button className="mobile-auth-ghost" onClick={() => openAuth('login')}>
                      Connexion
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-mobile" onClick={() => openAuth('register')}>
                      S&apos;inscrire
                    </button>
                  </li>
                </>
              )}
              {!loading && user && (
                <li>
                  <button className="mobile-auth-ghost" onClick={() => { logout(); closeMenu(); }}>
                    Se déconnecter
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
    </>
  );
}
