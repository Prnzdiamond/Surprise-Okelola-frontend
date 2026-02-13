<template>
  <NuxtLayout>
    <Analytics />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'
import { Analytics } from '@vercel/analytics/nuxt'
import { useOwnerStore } from '~/stores/ownerStore'
import { computed, onMounted, ref, watch } from 'vue'

const ownerStore = useOwnerStore()
const isOwnerLoaded = ref(false)

// Base SEO configuration
const siteUrl = 'https://surprise-okelola.com'
const defaultTitle = 'Surprise Okelola – Social Media Manager & Digital Strategist'
const defaultDescription = 'Surprise Okelola is a social media manager, digital strategist, and video editor specializing in content creation and brand building. Transform your social media presence with data-driven strategies and compelling video content.'
const defaultImage = 'https://surprise-okelola.com/preview.jpg'

// Computed values for dynamic content
const owner = computed(() => ownerStore.owner)

const dynamicTitle = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.name) return defaultTitle
  return `${owner.value.name} – ${owner.value.headline || 'Full-stack Developer'}`
})

const dynamicDescription = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.bio) return defaultDescription
  return owner.value.bio.slice(0, 160) // SEO optimal length
})

const dynamicImage = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.avatar) return defaultImage
  return owner.value.avatar
})

const keywords = computed(() => {
  if (!isOwnerLoaded.value || !owner.value?.tech_stack) {
    return 'social media management, digital strategy, video editing, content creation, brand building, TikTok, Instagram, YouTube'
  }
  return owner.value.tech_stack.map(tech => tech.technology || tech.name || tech).join(', ')
})


// Set initial SEO head
useHead({
  title: dynamicTitle,
  link: [
    // Canonical URL
    { rel: 'canonical', href: siteUrl },
    
    // Favicon and app icons
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    
    // Preconnect for performance
    { rel: 'preconnect', href: 'https://res.cloudinary.com' },
    { rel: 'dns-prefetch', href: 'https://res.cloudinary.com' },
  
  ]

,
__dangerouslyDisableSanitizersByTagID: {
  'ld-json': ['innerHTML']
}

})

// Initialize theme
const { initTheme, setupSystemWatcher } = useTheme()

// Watch for owner data changes and update loaded state
watch(owner, (newOwner) => {
  isOwnerLoaded.value = !!newOwner
}, { immediate: true })

// Client-side initialization
onMounted(async () => {
  // Initialize theme first (synchronous)
  initTheme()
  setupSystemWatcher()
  
  // Check if owner data is already available (from layout or other components)
  if (ownerStore.owner) {
    isOwnerLoaded.value = true
  } else {
    // Only fetch if not already available - let layout handle the main fetch
    // This is a backup in case layout doesn't load for some reason
    setTimeout(async () => {
      if (!ownerStore.owner && !ownerStore.loading) {
        try {
          await ownerStore.ensureOwner()
        } catch (error) {
          console.warn('Backup owner fetch failed:', error)
        }
      }
    }, 100)
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>