'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type Tab = 'login' | 'register' | 'reset';

interface Props {
  open: boolean;
  onClose: () => void;
  defaultTab?: Tab;
}

export default function AuthModal({ open, onClose, defaultTab = 'login' }: Props) {
  const { login, register, loginWithGoogle, resetPassword } = useAuth();
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset fields when modal opens/tab changes
  useEffect(() => {
    if (open) {
      setTab(defaultTab);
      setEmail('');
      setPassword('');
      setDisplayName('');
      setError('');
      setInfo('');
    }
  }, [open, defaultTab]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const friendly = (code: string) => {
    const map: Record<string, string> = {
      'auth/invalid-email': 'Adresse email invalide.',
      'auth/user-not-found': 'Aucun compte associé à cet email.',
      'auth/wrong-password': 'Mot de passe incorrect.',
      'auth/email-already-in-use': 'Un compte existe déjà avec cet email.',
      'auth/weak-password': 'Mot de passe trop faible (6 caractères minimum).',
      'auth/too-many-requests': 'Trop de tentatives. Réessaie dans quelques minutes.',
      'auth/popup-closed-by-user': '',
    };
    return map[code] ?? 'Une erreur est survenue. Réessaie.';
  };

  const handle = async (fn: () => Promise<void>) => {
    setError('');
    setInfo('');
    setBusy(true);
    try {
      await fn();
      onClose();
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? '';
      const msg = friendly(code);
      if (msg) setError(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async () => {
    setError('');
    setInfo('');
    setBusy(true);
    try {
      await resetPassword(email);
      setInfo('Email de réinitialisation envoyé. Vérifie ta boîte mail.');
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? '';
      setError(friendly(code));
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="auth-overlay"
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={tab === 'login' ? 'Connexion' : tab === 'register' ? 'Créer un compte' : 'Mot de passe oublié'}
    >
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose} aria-label="Fermer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {tab !== 'reset' && (
          <div className="auth-tabs">
            <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')}>Connexion</button>
            <button className={`auth-tab${tab === 'register' ? ' active' : ''}`} onClick={() => setTab('register')}>Créer un compte</button>
          </div>
        )}

        {tab === 'reset' && (
          <div className="auth-header">
            <h2>Mot de passe oublié</h2>
            <p>Entre ton email pour recevoir un lien de réinitialisation.</p>
          </div>
        )}

        <div className="auth-body">
          {/* Google */}
          {tab !== 'reset' && (
            <>
              <button
                className="btn-google"
                onClick={() => handle(loginWithGoogle)}
                disabled={busy}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuer avec Google
              </button>
              <div className="auth-divider"><span>ou</span></div>
            </>
          )}

          {/* Email */}
          {tab === 'register' && (
            <label className="auth-field">
              <span>Pseudo</span>
              <input
                type="text"
                placeholder="TonPseudo"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                autoComplete="username"
              />
            </label>
          )}

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              placeholder="toi@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>

          {tab !== 'reset' && (
            <label className="auth-field">
              <span>Mot de passe</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={tab === 'register' ? 'new-password' : 'current-password'}
              />
            </label>
          )}

          {error && <p className="auth-error">{error}</p>}
          {info && <p className="auth-info">{info}</p>}

          {tab === 'login' && (
            <>
              <button
                className="btn btn-primary auth-submit"
                disabled={busy}
                onClick={() => handle(() => login(email, password))}
              >
                {busy ? 'Connexion…' : 'Se connecter'}
              </button>
              <button className="auth-forgot" onClick={() => setTab('reset')}>
                Mot de passe oublié ?
              </button>
            </>
          )}

          {tab === 'register' && (
            <button
              className="btn btn-primary auth-submit"
              disabled={busy}
              onClick={() => handle(() => register(email, password, displayName))}
            >
              {busy ? 'Création…' : 'Créer mon compte'}
            </button>
          )}

          {tab === 'reset' && (
            <>
              <button
                className="btn btn-primary auth-submit"
                disabled={busy}
                onClick={handleReset}
              >
                {busy ? 'Envoi…' : 'Envoyer le lien'}
              </button>
              <button className="auth-forgot" onClick={() => setTab('login')}>
                ← Retour à la connexion
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
