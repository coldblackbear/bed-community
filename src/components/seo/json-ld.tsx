import React from 'react'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface WebSiteJsonLdProps {
  name: string
  url: string
  description: string
}

export function WebSiteJsonLd({ name, url, description }: WebSiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ArticleJsonLdProps {
  headline: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url?: string
  }
  description: string
  url: string
}

export function ArticleJsonLd({
  headline,
  datePublished,
  dateModified,
  author,
  description,
  url,
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: '침대 커뮤니티',
      url: SITE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface OrganizationJsonLdProps {
  name: string
  url: string
  logo?: string
}

export function OrganizationJsonLd({ name, url, logo }: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
