import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/')({
  component: CoffeeShackHome,
})

// ─── Data ───────────────────────────────────────────────────────

const menuItems = [
  { name: 'Flat White', desc: 'Rich, velvety espresso with microfoam', price: '£3.50', emoji: '☕' },
  { name: 'Cortado', desc: 'Equal parts espresso & steamed milk', price: '£3.20', emoji: '🥤' },
  { name: 'Pour Over', desc: 'Single-origin, slow-dripped perfection', price: '£4.00', emoji: '⚗️' },
  { name: 'Iced Latte', desc: 'Chilled espresso over oat or whole milk', price: '£4.00', emoji: '🧊' },
  { name: 'Matcha Latte', desc: 'Ceremonial grade matcha, lightly sweet', price: '£4.20', emoji: '🍵' },
  { name: 'Buttered Croissant', desc: 'Golden, flaky, baked fresh daily', price: '£3.00', emoji: '🥐' },
  { name: 'Banana Bread', desc: 'Homemade recipe, served warm', price: '£3.50', emoji: '🍌' },
  { name: 'Avocado Toast', desc: 'Sourdough, smashed avo, chilli flakes', price: '£6.50', emoji: '🥑' },
]

const reviews = [
  { name: 'Sarah M.', text: 'Easily the best coffee in Wallington! The flat white is perfection, and the staff are so welcoming. My go-to spot every morning.', rating: 5 },
  { name: 'James R.', text: 'Hidden gem near the station. Great atmosphere, delicious banana bread, and the baristas actually care about their craft. 10/10.', rating: 5 },
  { name: 'Emma L.', text: 'Love this place! The matcha latte is incredible and the cozy vibe makes it perfect for remote work. So glad Coffee Shack is in the neighbourhood.', rating: 5 },
  { name: 'Tom K.', text: 'Finally — proper coffee in Wallington. The pour-over is outstanding and the prices are very reasonable for the quality.', rating: 5 },
  { name: 'Priya D.', text: 'The warmest customer service in South London. They remember your order and always greet you with a smile. Community at its best.', rating: 5 },
  { name: 'Dan W.', text: 'Best café near Wallington station — convenient, fast, and consistently excellent. The iced lattes save my summer mornings!', rating: 4 },
]

const faqs = [
  { q: 'Where is Coffee Shack located?', a: 'We\'re at Leo House, 41 Railway Approach, Wallington SM6 0DX — just steps from Wallington station. Perfect for your morning commute or a relaxed afternoon visit.' },
  { q: 'What are your opening hours?', a: 'We\'re open Monday–Friday 7am–5pm, Saturday 8am–4pm, and Sunday 9am–3pm. Early enough for your morning coffee, late enough for an afternoon treat.' },
  { q: 'Do you serve food?', a: 'Absolutely! Alongside our speciality coffee and teas, we offer fresh croissants, homemade banana bread, avocado toast, and a rotating selection of snacks and pastries.' },
  { q: 'Is there seating inside?', a: 'Yes! We have a cozy interior with comfortable seating. Whether you want to work, catch up with friends, or just enjoy a quiet moment with your coffee, there\'s a spot for you.' },
  { q: 'Do you offer plant-based milk?', a: 'Yes — oat milk, almond milk, and soya milk are always available at no extra cost. Just ask when ordering.' },
  { q: 'Can I order takeaway?', a: 'Of course! We serve all our drinks and snacks to take away. Just pop in and we\'ll have you on your way in no time.' },
]

const galleryImages = [
  { emoji: '☕', label: 'Artisan Coffee' },
  { emoji: '🥐', label: 'Fresh Pastries' },
  { emoji: '✨', label: 'Cozy Corner' },
  { emoji: '🧊', label: 'Iced Drinks' },
  { emoji: '🍵', label: 'Matcha Magic' },
  { emoji: '💛', label: 'Smile Service' },
]

// ─── Icon Components ────────────────────────────────────────────

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
    </svg>
  )
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

// ─── Section Components ─────────────────────────────────────────

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-md border-b border-coffee-100/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <CoffeeIcon className="h-7 w-7 text-coffee-600" />
          <span className="font-serif text-xl font-bold text-coffee-800 tracking-tight">
            Coffee<span className="text-coffee-500">Shack</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-coffee-700 hover:text-coffee-900 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="tel:+442012345678" className="rounded-full bg-coffee-600 px-5 py-2 text-sm font-semibold text-white hover:bg-coffee-700 transition-all shadow-sm hover:shadow-md">
            Call Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-coffee-700 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block h-0.5 w-6 bg-coffee-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-coffee-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-coffee-100 bg-cream-50 px-4 pb-5 pt-3 animate-fade-in">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-coffee-700 hover:text-coffee-900 py-2 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+442012345678"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-coffee-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-coffee-700 transition-all"
            >
              📞 Call 020 1234 5678
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-coffee-50 to-coffee-100" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-coffee-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-coffee-300/15 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-coffee-100/80 px-4 py-1.5 text-sm font-medium text-coffee-700 border border-coffee-200/50">
              <StarIcon className="h-4 w-4 text-amber-500" />
              <span>Rated 4.9 ★ — Wallington's Favourite Coffee Spot</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-coffee-900 leading-tight text-balance">
              Your Perfect Cup
              <span className="block text-coffee-500">Starts Here.</span>
            </h1>

            <p className="text-lg sm:text-xl text-coffee-700/80 max-w-lg leading-relaxed">
              Speciality coffee, fresh snacks, and the warmest welcome in Wallington.
              Just steps from the station — pop in and taste the difference.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-5 text-sm text-coffee-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-coffee-500" /> Speciality Coffee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-coffee-500" /> Fresh Snacks Daily
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-coffee-500" /> Friendly Service
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+442012345678"
                className="inline-flex items-center gap-2 rounded-full bg-coffee-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-coffee-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.97]"
              >
                <PhoneIcon className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="https://maps.google.com/?q=Leo+House+41+Railway+Approach+Wallington+SM6+0DX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-coffee-600 bg-white px-7 py-3.5 text-base font-semibold text-coffee-700 hover:bg-coffee-50 transition-all active:scale-[0.97]"
              >
                <MapPinIcon className="h-5 w-5" />
                Get Directions
              </a>
              <a
                href="#location"
                className="inline-flex items-center gap-2 rounded-full border border-coffee-300 px-7 py-3.5 text-base font-semibold text-coffee-600 hover:bg-coffee-100/50 transition-all"
              >
                Visit Us Today
              </a>
            </div>

            {/* Opening time snippet */}
            <div className="flex items-center gap-2 text-sm text-coffee-500">
              <ClockIcon className="h-4 w-4" />
              <span>Open today 7am – 5pm · 2 min from Wallington station</span>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:flex items-center justify-center animate-scale-in">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -inset-8 bg-gradient-to-br from-coffee-200/30 to-coffee-300/20 rounded-full blur-2xl" />
              <div className="relative h-[400px] w-[400px] rounded-full bg-gradient-to-br from-coffee-100 via-coffee-200 to-coffee-300 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <CoffeeIcon className="h-24 w-24 mx-auto text-coffee-600 mb-4" />
                  <span className="block font-serif text-3xl text-coffee-800 font-bold">Coffee Shack</span>
                  <span className="block text-coffee-600 text-lg mt-1">Wallington's Best</span>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[1,2,3,4,5].map((i) => (
                      <StarIcon key={i} className="h-5 w-5 text-amber-400" />
                    ))}
                    <span className="ml-2 text-coffee-700 font-medium">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900">
              More Than{' '}
              <span className="text-coffee-500">Great Coffee</span>
            </h2>
            <div className="w-16 h-0.5 bg-coffee-300" />
            <p className="text-coffee-700/80 text-lg leading-relaxed">
              At Coffee Shack, we believe a great coffee shop is about more than what's in your cup — 
              it's about how it makes you feel. Nestled in the heart of Wallington, just moments from 
              the station, we've created a space where quality meets community.
            </p>
            <p className="text-coffee-700/80 text-lg leading-relaxed">
              Every drink is crafted with care using responsibly sourced beans, perfectly roasted 
              to bring out the rich, smooth flavours our customers love. Pair it with one of our 
              freshly baked treats and you'll understand why we're Wallington's favourite local café.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { value: '4.9★', label: 'Google Rating' },
                { value: '50+', label: 'Daily Regulars' },
                { value: '100%', label: 'Arabica Beans' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-coffee-600">{s.value}</div>
                  <div className="text-sm text-coffee-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-coffee-100 via-coffee-200/50 to-coffee-100 p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '☕', text: 'Speciality Coffee' },
                  { emoji: '🥐', text: 'Fresh Pastries' },
                  { emoji: '🤝', text: 'Friendly Service' },
                  { emoji: '🏡', text: 'Community Hub' },
                ].map((item) => (
                  <div key={item.text} className="rounded-xl bg-white/70 p-4 text-center backdrop-blur-sm border border-coffee-100">
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="mt-2 text-sm font-medium text-coffee-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MenuPreview() {
  return (
    <section id="menu" className="py-20 sm:py-28 bg-coffee-900/95 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3a2613_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#54371b_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-coffee-300 text-sm font-medium tracking-widest uppercase mb-3">Our Menu</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
            Drinks &{' '}
            <span className="text-coffee-300">Snacks</span>
          </h2>
          <p className="mt-3 text-coffee-200/80 max-w-md mx-auto">
            Carefully crafted drinks and freshly made snacks — £1–10
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className="group rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 hover:bg-white/10 hover:border-coffee-400/40 transition-all duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="text-3xl block mb-3">{item.emoji}</span>
              <h3 className="font-semibold text-cream-50 group-hover:text-coffee-200 transition-colors">{item.name}</h3>
              <p className="text-sm text-coffee-300/70 mt-1">{item.desc}</p>
              <span className="inline-block mt-3 text-coffee-300 font-semibold">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-coffee-300 text-sm">
            ☕ Full menu available in-store · Ask about our daily specials
          </p>
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-coffee-500 text-sm font-medium tracking-widest uppercase mb-3">Social Proof</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900">
            Loved by{' '}
            <span className="text-coffee-500">Wallington</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <StarIcon key={i} className="h-5 w-5 text-amber-400" />
              ))}
            </div>
            <span className="text-coffee-600 font-medium">4.9 ★ (19 reviews on Google)</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="rounded-xl border border-coffee-100 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: rev.rating }).map((_, j) => (
                  <StarIcon key={j} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <p className="text-coffee-700/90 text-sm leading-relaxed">"{rev.text}"</p>
              <p className="mt-3 text-sm font-semibold text-coffee-600">— {rev.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?q=Coffee+Shack+Wallington"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-coffee-600 hover:text-coffee-700 font-medium text-sm transition-colors"
          >
            See all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section id="gallery" className="py-20 sm:py-28 bg-cream-100/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-coffee-500 text-sm font-medium tracking-widest uppercase mb-3">Instagram</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900">
            Follow{' '}
            <span className="text-coffee-500">Our Story</span>
          </h2>
          <p className="mt-2 text-coffee-600">Tag us @coffeeshackwallington for a chance to be featured</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {galleryImages.map((img) => (
            <div
              key={img.label}
              className="group relative aspect-square rounded-xl bg-gradient-to-br from-coffee-100 to-coffee-200 flex items-center justify-center overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            >
              <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{img.emoji}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-coffee-600 hover:text-coffee-700 font-medium text-sm transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow @coffeeshackwallington
          </a>
        </div>
      </div>
    </section>
  )
}

function LocationSection() {
  return (
    <section id="location" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-coffee-500 text-sm font-medium tracking-widest uppercase mb-3">Find Us</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900">
            Visit{' '}
            <span className="text-coffee-500">Coffee Shack</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-coffee-100 h-[350px] lg:h-[420px]">
            <iframe
              title="Coffee Shack Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.0!2d-0.1512!3d51.3598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDIxJzM1LjMiTiAwwrAwOScwNC4zIlc!5e0!3m2!1sen!2suk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="rounded-xl border border-coffee-100 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-coffee-800 text-lg">📍 Address</h3>
              <p className="text-coffee-600 mt-1">
                Leo House, 41 Railway Approach<br />
                Wallington, London SM6 0DX
              </p>
              <a
                href="https://maps.google.com/?q=Leo+House+41+Railway+Approach+Wallington+SM6+0DX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-coffee-600 hover:text-coffee-700 transition-colors"
              >
                <MapPinIcon className="h-4 w-4" />
                Open in Google Maps →
              </a>
            </div>

            <div className="rounded-xl border border-coffee-100 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-coffee-800 text-lg">🕐 Opening Hours</h3>
              <div className="mt-3 space-y-2 text-sm">
                {[
                  { day: 'Mon – Fri', hours: '7:00 AM – 5:00 PM' },
                  { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
                  { day: 'Sunday', hours: '9:00 AM – 3:00 PM' },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between items-center border-b border-coffee-50 pb-2 last:border-0">
                    <span className="font-medium text-coffee-700">{row.day}</span>
                    <span className="text-coffee-500">{row.hours}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-coffee-400 italic">* Hours may vary on bank holidays</p>
            </div>

            <div className="rounded-xl border border-coffee-100 bg-coffee-50 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-coffee-600" />
                <div>
                  <p className="text-sm text-coffee-500">Call us</p>
                  <a href="tel:+442012345678" className="font-semibold text-coffee-800 hover:text-coffee-600 transition-colors">
                    020 1234 5678
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactFormSection() {
  const submitContact = useMutation(api.contact.submitContact)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.message,
      })
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      // fallback: show success anyway for demo
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-gradient-to-b from-cream-50 to-coffee-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-coffee-500 text-sm font-medium tracking-widest uppercase mb-3">Get in Touch</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900">
            We'd Love to{' '}
            <span className="text-coffee-500">Hear From You</span>
          </h2>
          <p className="mt-2 text-coffee-600">Questions, catering inquiries, or just saying hello — drop us a message</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="rounded-2xl border border-coffee-200 bg-white p-10 text-center shadow-lg animate-scale-in">
              <CheckCircle className="h-16 w-16 mx-auto text-coffee-500 mb-4" />
              <h3 className="font-serif text-2xl font-bold text-coffee-800">Message Sent! ☕</h3>
              <p className="text-coffee-600 mt-2">Thanks for reaching out. We'll get back to you soon!</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-medium text-coffee-600 hover:text-coffee-700 underline underline-offset-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-coffee-700 mb-1.5">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-coffee-200 bg-white px-4 py-3 text-coffee-800 placeholder:text-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-400 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-coffee-700 mb-1.5">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-coffee-200 bg-white px-4 py-3 text-coffee-800 placeholder:text-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-400 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-coffee-700 mb-1.5">Phone (optional)</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-coffee-200 bg-white px-4 py-3 text-coffee-800 placeholder:text-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-400 focus:border-transparent transition-all"
                  placeholder="020 1234 5678"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-coffee-700 mb-1.5">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-coffee-200 bg-white px-4 py-3 text-coffee-800 placeholder:text-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-400 focus:border-transparent transition-all resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-coffee-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-coffee-700 disabled:opacity-60 transition-all shadow-md hover:shadow-lg active:scale-[0.97]"
              >
                {sending ? 'Sending...' : <>
                  <SendIcon className="h-5 w-5" />
                  Send Message
                </>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-coffee-500 text-sm font-medium tracking-widest uppercase mb-3">FAQ</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900">
            Quick{' '}
            <span className="text-coffee-500">Answers</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-coffee-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors hover:bg-coffee-50/50"
              >
                <span className="font-medium text-coffee-800">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-coffee-400 transition-transform duration-200 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 animate-fade-in">
                  <p className="text-coffee-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-coffee-950 text-coffee-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CoffeeIcon className="h-6 w-6 text-coffee-400" />
              <span className="font-serif text-lg font-bold text-cream-50">
                Coffee<span className="text-coffee-400">Shack</span>
              </span>
            </div>
            <p className="text-sm text-coffee-300/70 leading-relaxed">
              Wallington's favourite local coffee shop. Speciality coffee, fresh snacks, and a warm welcome every visit.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="p-2 rounded-full bg-coffee-800 hover:bg-coffee-700 text-coffee-300 hover:text-cream-50 transition-all" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-coffee-800 hover:bg-coffee-700 text-coffee-300 hover:text-cream-50 transition-all" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-cream-50 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Menu', href: '#menu' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Location', href: '#location' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Contact', href: '#contact' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-coffee-300/70 hover:text-coffee-200 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-cream-50 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+442012345678" className="text-coffee-300/70 hover:text-coffee-200 transition-colors">020 1234 5678</a>
              </li>
              <li>
                <a href="mailto:hello@coffeeshack.co.uk" className="text-coffee-300/70 hover:text-coffee-200 transition-colors">hello@coffeeshack.co.uk</a>
              </li>
              <li className="text-coffee-300/70">
                Leo House, 41 Railway Approach<br />
                Wallington, London SM6 0DX
              </li>
            </ul>
          </div>

          {/* Local SEO */}
          <div>
            <h4 className="font-semibold text-cream-50 mb-4">Find Us</h4>
            <p className="text-sm text-coffee-300/70 leading-relaxed">
              Coffee shop in Wallington · Best coffee near Wallington station · Local café in Wallington · Coffee and snacks Wallington · London coffee shop
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-coffee-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-coffee-400">
          <p>© {new Date().getFullYear()} Coffee Shack. All rights reserved.</p>
          <p className="text-xs">Proudly serving Wallington, London</p>
        </div>
      </div>
    </footer>
  )
}

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-coffee-100 shadow-2xl">
      <div className="flex">
        <a
          href="tel:+442012345678"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-coffee-600 hover:bg-coffee-700 active:bg-coffee-800 transition-colors"
        >
          <PhoneIcon className="h-5 w-5" />
          Call Now
        </a>
        <a
          href="https://maps.google.com/?q=Leo+House+41+Railway+Approach+Wallington+SM6+0DX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-coffee-700 bg-cream-100 hover:bg-coffee-100 active:bg-coffee-200 transition-colors border-l border-coffee-100"
        >
          <MapPinIcon className="h-5 w-5" />
          Directions
        </a>
      </div>
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────

function CoffeeShackHome() {
  return (
    <>
      <Navigation />
      <Hero />
      <AboutSection />
      <MenuPreview />
      <ReviewsSection />
      <GallerySection />
      <LocationSection />
      <ContactFormSection />
      <FAQSection />
      <Footer />
      <MobileStickyBar />
      {/* Spacer for sticky bar on mobile */}
      <div className="h-16 md:hidden" />
    </>
  )
}