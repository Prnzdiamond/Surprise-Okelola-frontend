// composables/usePageMeta.js
export const usePageMeta = (pageData) => {
    const siteUrl = 'https://surprise-okelola.com'

    const setPageMeta = ({
        title,
        description,
        image,
        url,
        type = 'website',
        keywords = [],
        author,
        publishedTime,
        modifiedTime
    }) => {

        const fullTitle = title.includes('–') ? title : `${title} – Surprise Okelola`
        const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`
        const fullImage = image?.startsWith('http') ? image : `${siteUrl}${image || '/preview.jpg'}`

        useHead({
            title: fullTitle,
            meta: [
                { name: 'description', content: description },
                { name: 'keywords', content: keywords.join(', ') },
                { name: 'author', content: author || 'Surprise Okelola' },

                // Open Graph
                { property: 'og:title', content: fullTitle },
                { property: 'og:description', content: description },
                { property: 'og:image', content: fullImage },
                { property: 'og:image:width', content: '1200' },
                { property: 'og:image:height', content: '630' },
                { property: 'og:image:alt', content: `${title} - Preview Image` },
                { property: 'og:url', content: fullUrl },
                { property: 'og:type', content: type },
                { property: 'og:site_name', content: 'Surprise Okelola Portfolio' },

                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: fullTitle },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: fullImage },
                { name: 'twitter:image:alt', content: `${title} - Preview Image` },

                // Article specific (for blog posts)
                ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
                ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),

                // Additional SEO
                { name: 'robots', content: 'index, follow' },
                { name: 'googlebot', content: 'index, follow' },
            ],
            link: [
                { rel: 'canonical', href: fullUrl }
            ]
        })
    }

    return { setPageMeta }
}

// Usage examples:

// For About page
export const useAboutPageMeta = (ownerData) => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: 'About Me',
        description: ownerData?.bio || 'Learn more about Surprise Okelola, a social media manager, digital strategist, and video editor with expertise in content creation, brand building, and social media growth strategies.',
        url: '/about',
        image: ownerData?.avatar,
        keywords: [
            'about', 'social media manager', 'digital strategist', 'video editor',
            'content creator', 'brand building', 'social media growth', 'TikTok strategy',
            'Instagram management', 'YouTube content creation'
        ]
    })
}

// For Projects page
export const useProjectsPageMeta = () => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: 'My Projects & Portfolio',
        description: 'Explore my portfolio of successful social media campaigns, digital strategies, and video production projects. See case studies of brands that grew exponentially with our strategies.',
        url: '/projects',
        keywords: [
            'projects', 'portfolio', 'social media campaigns', 'video production',
            'digital strategy case studies', 'brand growth', 'content creation',
            'influencer collaborations', 'viral content'
        ]
    })
}

// For individual project page
export const useProjectPageMeta = (projectData) => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: projectData?.title || 'Project',
        description: projectData?.description || 'A social media, digital strategy, or video production project showcasing expertise in brand building and content creation.',
        url: `/projects/${projectData?.slug}`,
        image: projectData?.featured_image || projectData?.images?.[0],
        keywords: [
            ...(projectData?.technologies || []),
            'social media', 'digital marketing', 'project', 'case study', projectData?.title
        ],
        type: 'article',
        publishedTime: projectData?.created_at,
        modifiedTime: projectData?.updated_at
    })
}

// For Contact page
export const useContactPageMeta = () => {
    const { setPageMeta } = usePageMeta()

    return setPageMeta({
        title: 'Contact Me',
        description: 'Get in touch with Surprise Okelola for social media management, digital strategy, video editing, and content creation services. Let\'s grow your brand together.',
        url: '/contact',
        keywords: [
            'contact', 'hire social media manager', 'digital strategy services',
            'video editing', 'content creation services', 'brand growth services',
            'social media management for hire', 'freelance digital strategist'
        ]
    })
}