// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
import url from "./server/api/url";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', 'nuxt-security', '@nuxt/image', 'nuxt-gtag', '@nuxtjs/sitemap'],


  site: {
    url: "https://surprise-okelola.com",
    name: "Surprise Okelola - Social Media Manager & Digital Strategist",
    description: "Surprise Okelola is a social media manager, digital strategist, and video editor specializing in content creation and brand building. Transform your social media presence with data-driven strategies and compelling video content.",
  },

  sitemap: {
    defaults: {
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    },
    urls: [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0, // highest priority
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/projects',
        changefreq: 'weekly',
        priority: 0.9,
      }
    ],
    sources: ['/api/url']
  }
  ,
  image: {
    provider: 'ipx',
    domains: ['res.cloudinary.com'],
    dir: 'public',
    quality: 80,
    format: ['webp', 'avif'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: ['ed64e78b8c36.ngrok-free.app']
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BACKEND_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'https://surprise-okelola-api.duckdns.org/api'),
      allowedHosts: [
        'surprise-okelola.com',
        'surprise-okelola.vercel.app'
      ]
    }
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'https://res.cloudinary.com',
          'https://*.cloudinary.com',
          'https://www.googletagmanager.com'
        ],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : []),
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://va.vercel-scripts.com'
        ],
        'connect-src': [
          "'self'",
          'https://surprise-okelola-api.duckdns.org',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://va.vercel-scripts.com',
          ...(process.env.NODE_ENV === 'development' ? ['http://localhost:8000', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'] : [])
        ],
        'style-src': [
          "'self'",
          'https:',
          "'unsafe-inline'"
        ],
        'base-uri': ["'none'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
      }
    }
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Surprise Okelola' },
        { name: 'publisher', content: 'Surprise Okelola' },
        { name: 'keywords', content: 'social media management, digital strategy, video editing, content creation, brand building, social media manager' },
        { name: 'og:title', content: 'Surprise Okelola - Social Media Manager & Digital Strategist' },
        { name: 'og:description', content: 'Transform your social media presence with expert management, digital strategy, and compelling video content.' },
        { name: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@surprise.okelola' }
      ]
    }
  },

  gtag: {
    id: 'G-WQY37LSGQW'
  }
})