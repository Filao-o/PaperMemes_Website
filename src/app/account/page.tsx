'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/');
  }, [loading, user, router]);

  if (loading || !user) return null;

  const avatar = user.photoURL;
  const initials = user.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : user.email?.slice(0, 2).toUpperCase() ?? '?';

  return (
    <main className="account-page">
      <div className="container">
        <div className="account-card">
          <div className="account-avatar">
            {avatar ? (
              <Image src={avatar} alt="" width={80} height={80} className="account-avatar-img" />
            ) : (
              <span className="account-avatar-initials">{initials}</span>
            )}
          </div>

          <div className="account-info">
            <h1>{user.displayName ?? 'Mon compte'}</h1>
            <p className="account-email">{user.email}</p>
            {user.emailVerified === false && (
              <p className="account-warning">Email non vérifié</p>
            )}
          </div>

          <div className="account-meta">
            <div className="account-meta-item">
              <span className="account-meta-label">Membre depuis</span>
              <span className="account-meta-value">
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
                  : '—'}
              </span>
            </div>
            <div className="account-meta-item">
              <span className="account-meta-label">Plan</span>
              <span className="account-meta-value account-plan-free">Gratuit</span>
            </div>
          </div>

          <button className="btn btn-ghost-nav account-logout" onClick={logout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </main>
  );
}
