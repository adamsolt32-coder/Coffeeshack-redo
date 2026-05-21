import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import appCss from '~/styles/app.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Coffee Shack | Best Coffee Shop in Wallington, London',
      },
      {
        name: 'description',
        content: 'Discover Coffee Shack in Wallington, London — rated 4.9★. Speciality coffee, fresh snacks, and warm service near Wallington station. Visit us today!',
      },
      {
        name: 'keywords',
        content: 'coffee shop in Wallington, best coffee near Wallington station, local café in Wallington, coffee and snacks Wallington, Coffee Shack, London coffee',
      },
      {
        name: 'google-site-verification',
        content: '',
      },
      { property: 'og:title', content: 'Coffee Shack | Best Coffee Shop in Wallington, London' },
      { property: 'og:description', content: 'Rated 4.9★ — speciality coffee, fresh snacks & warm service near Wallington station.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://coffeeshack.co.uk' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Coffee Shack | Best Coffee Shop in Wallington' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CafeOrCoffeeShop',
          name: 'Coffee Shack',
          image: '',
          '@id': '',
          url: 'https://coffeeshack.co.uk',
          telephone: '+442012345678',
          priceRange: '£1–10',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Leo House, 41 Railway Approach',
            addressLocality: 'Wallington',
            addressRegion: 'London',
            postalCode: 'SM6 0DX',
            addressCountry: 'GB',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 51.3598,
            longitude: -0.1512,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '07:00',
              closes: '17:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Saturday'],
              opens: '08:00',
              closes: '16:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Sunday'],
              opens: '09:00',
              closes: '15:00',
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '19',
            bestRating: '5',
          },
          servesCuisine: 'Coffee, Snacks, Light Meals',
          areaServed: 'Wallington, London',
        }),
      },
    ],
  }),
  notFoundComponent: () => <div>Route not found</div>,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body className="bg-cream-50">
        {children}
        <Scripts />
      </body>
    </html>
  )
}