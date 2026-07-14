import { sendGAEvent } from '@next/third-parties/google'

export const trackCtaClicked = (location: 'hero' | 'nav' | 'footer' | 'banner') =>
  sendGAEvent('event', 'cta_clicked', { location })

export const trackSignUp = (method: 'google' | 'email') =>
  sendGAEvent('event', 'sign_up', { method })

export const trackLogin = (method: 'google' | 'email') =>
  sendGAEvent('event', 'login', { method })

export const trackDashboardViewed = () =>
  sendGAEvent('event', 'dashboard_viewed', {})

export const trackArticleRead = (slug: string) =>
  sendGAEvent('event', 'article_read', { slug })
