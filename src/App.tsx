import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type Item = {
  title: string
  subtitle: string
  period: string
  detail: string
  href?: string
}

type GalleryItem = {
  title: string
  caption: string
  status: string
  layoutClass: string
  toneClass: string
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const cvUrl = '/My__CV%20(3)%20(1).pdf'
  const actionLinkClass =
    'inline-flex items-center rounded-md border border-line/90 bg-paper/40 px-3 py-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-copy hover:bg-[#10241c] hover:text-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5945]'

  const experience: Item[] = [
    {
      title: 'Software Engineering Intern',
      subtitle: 'Novomind GmbH, Germany',
      period: '2025',
      detail: 'Worked on production backend systems and applied AI features in a full-time paid internship.',
    },
    {
      title: 'AI Agent Developer',
      subtitle: 'Dama Creative Agency',
      period: '2025 - Present',
      detail: 'Building autonomous AI workflows and shipping client-facing AI automation solutions.',
    },
    {
      title: 'Upcoming SWE Intern',
      subtitle: 'Paymob, Egypt',
      period: '2026',
      detail: 'Selected as the youngest accepted on-site intern candidate for the upcoming internship cycle.',
    },
    {
      title: 'President, Computer Science Club',
      subtitle: 'STEM High School, Cairo',
      period: '2024 - Present',
      detail: 'Led 800+ members, managed 30 mentors, and coordinated 300+ technical sessions.',
    },
  ]

  const highlights = [
    '1st Place, Egyptian Artificial Intelligence Olympiad (National Champion).',
    'Global Honorable Mention, NASA International Space Apps Challenge (Top 60 / 18,800 teams).',
    'Founder, Egyptian Olympiad in Computational Science with 800+ participants.',
    'Built 60+ projects in AI, web, and app development.',
  ]

  const projects: Item[] = [
    {
      title: 'Oppy',
      subtitle: 'AI Opportunity Platform',
      period: 'Startup',
      detail: 'A retrieval-powered platform that helps students discover and track scholarships, internships, and competitions.',
      href: 'https://oppy.community',
    },
    {
      title: 'TELQAI',
      subtitle: 'Arabic AI Learning Program',
      period: 'Education',
      detail: 'A practical training program introducing learners to modern AI systems and autonomous agent workflows.',
      href: 'https://github.com/geno543',
    },
    {
      title: 'EOCS',
      subtitle: 'Egyptian Olympiad in Computational Science',
      period: 'Initiative',
      detail: 'A national competition and curriculum ecosystem for students interested in computational and algorithmic thinking.',
      href: 'https://github.com/geno543',
    },
  ]

  const galleryItems: GalleryItem[] = [
    {
      title: 'AI Product Build',
      caption: 'Hero shot placeholder for your AI product workspace and prototype.',
      status: 'image pending',
      layoutClass: 'md:col-span-4 md:row-span-2',
      toneClass: 'bg-[#0d251d]/70',
    },
    {
      title: 'Hardware + Robotics',
      caption: 'Placeholder for robotics setup, boards, and build process snapshots.',
      status: 'image pending',
      layoutClass: 'md:col-span-2 md:row-span-1 md:translate-y-6',
      toneClass: 'bg-[#102c22]/65',
    },
    {
      title: 'Hackathon Moments',
      caption: 'Placeholder for team collaboration and shipping moments on event day.',
      status: 'image pending',
      layoutClass: 'md:col-span-3 md:row-span-2 md:-translate-y-2',
      toneClass: 'bg-[#0b2019]/70',
    },
    {
      title: 'Stage + Talks',
      caption: 'Placeholder for conference demos, talks, and award presentations.',
      status: 'image pending',
      layoutClass: 'md:col-span-3 md:row-span-1 md:translate-y-4',
      toneClass: 'bg-[#123126]/60',
    },
    {
      title: 'Lab Notes',
      caption: 'Placeholder for whiteboards, architecture sketches, and model iteration snapshots.',
      status: 'image pending',
      layoutClass: 'md:col-span-2 md:row-span-1 md:-translate-y-5',
      toneClass: 'bg-[#0f2a20]/65',
    },
    {
      title: 'Community Impact',
      caption: 'Placeholder for mentorship sessions, workshops, and student project showcases.',
      status: 'image pending',
      layoutClass: 'md:col-span-4 md:row-span-1 md:translate-y-2',
      toneClass: 'bg-[#0b231b]/70',
    },
  ]

  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isProjectsPage = normalizedPath === '/projects'
  const isGalleryPage = normalizedPath === '/gallery'
  const isHomePage = !isProjectsPage && !isGalleryPage

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.from('[data-hero-nav]', { y: -14, opacity: 0, duration: 0.55 })
        .from('[data-hero-title]', { y: 22, opacity: 0, duration: 0.65 }, '-=0.22')
        .from('[data-hero-body]', { y: 16, opacity: 0, duration: 0.55, stagger: 0.12 }, '-=0.35')

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((section) => {
        gsap.from(section, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[760px] px-6 pb-20 pt-5 sm:px-8">
        <header className="mb-20 border-b border-line pb-4">
          <nav data-hero-nav className="flex items-center justify-between font-mono text-sm text-muted">
            <a href="/" className="transition-colors hover:text-ink">
              Geno
            </a>
            <div className="flex items-center gap-6">
              <a href={isHomePage ? '#work' : '/#work'} className="transition-colors hover:text-ink">
                Work
              </a>
              <a href="/projects" className="transition-colors hover:text-ink">
                Projects
              </a>
              <a href="/gallery" className="transition-colors hover:text-ink">
                Gallery
              </a>
            </div>
          </nav>
        </header>

        {isProjectsPage ? (
          <main id="top">
            <section data-reveal>
              <h1 data-hero-title className="max-w-2xl font-serif text-5xl leading-[1.05] text-title sm:text-6xl">
                Projects
              </h1>
              <p data-hero-body className="mt-6 max-w-2xl font-mono text-sm text-muted">
                Selected products and initiatives I built, led, or launched.
              </p>
            </section>

            <section className="mt-12" data-reveal>
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((item, index) => (
                  <article
                    key={item.title}
                    className="group rounded-md border border-line/90 bg-[#081b14]/45 p-5 transition-all duration-200 hover:border-copy/70 hover:bg-[#0d261d]"
                  >
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      <span>{`0${index + 1}`}</span>
                      <span>{item.period}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl leading-tight text-title">{item.title}</h3>
                    <p className="mt-1 font-mono text-sm text-muted">{item.subtitle}</p>
                    <p className="mt-4 text-base leading-relaxed text-copy">{item.detail}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex font-mono text-sm text-copy transition-colors group-hover:text-title"
                      >
                        view project
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          </main>
        ) : isGalleryPage ? (
          <main id="top">
            <section data-reveal>
              <h1 data-hero-title className="max-w-2xl font-serif text-5xl leading-[1.05] text-title sm:text-6xl">
                Gallery
              </h1>
              <p data-hero-body className="mt-6 max-w-2xl font-mono text-sm text-muted">
                A creative wall for your build journey. Share product shots, prototypes, event moments, and behind-the-scenes visuals.
              </p>
            </section>

            <section className="mt-10" data-reveal>
              <div className="relative">
                <span className="pointer-events-none absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-gradient-to-b from-copy/40 via-copy/20 to-transparent md:block" />
                <div className="grid gap-4 md:auto-rows-[150px] md:grid-cols-6 md:gap-5">
                  {galleryItems.map((item) => (
                    <article
                      key={item.title}
                      className={`group relative overflow-hidden rounded-md border border-line/90 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-copy/70 ${item.layoutClass} ${item.toneClass}`}
                    >
                      <span className="absolute right-4 top-4 h-[9px] w-[9px] rounded-full border border-copy/80 bg-paper shadow-[0_0_10px_rgba(136,169,154,0.4)]" />
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{item.status}</p>
                          <h3 className="mt-2 font-serif text-2xl leading-tight text-title">{item.title}</h3>
                        </div>
                        <p className="max-w-[36ch] text-sm leading-relaxed text-copy">{item.caption}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </main>
        ) : (
          <main id="top">
            <section data-reveal>
              <h1 data-hero-title className="max-w-2xl font-serif text-5xl leading-[1.05] text-title sm:text-6xl">
                Mohamed Ramadan
              </h1>
              <p data-hero-body className="mt-6 font-mono text-base text-muted">
                AI Engineer, Builder, Student - Cairo, Egypt
              </p>
              <p data-hero-body className="mt-10 max-w-2xl font-serif text-4xl leading-tight text-copy sm:text-[2.55rem]">
                Building useful AI products, education systems, and technical communities that create measurable outcomes.
              </p>
              <div data-hero-body className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm text-muted">
                <a href="mailto:Mohamedr7825@gmail.com" className={actionLinkClass}>
                  email
                </a>
                <a href="https://github.com/geno543" target="_blank" rel="noreferrer" className={actionLinkClass}>
                  github
                </a>
                <a href={cvUrl} target="_blank" rel="noreferrer" className={actionLinkClass}>
                  portfolio
                </a>
              </div>
            </section>

            <section id="work" className="mt-20" data-reveal>
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Experience</h2>
              <div className="mt-4 border-t border-line">
                {experience.map((item) => (
                  <article key={item.title} className="border-b border-line py-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                      <div>
                        <h3 className="font-serif text-3xl text-title">{item.title}</h3>
                        <p className="mt-1 font-mono text-sm text-muted">@ {item.subtitle}</p>
                        <p className="mt-3 max-w-xl text-base leading-relaxed text-copy">{item.detail}</p>
                      </div>
                      <p className="shrink-0 font-mono text-sm text-muted">{item.period}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-16" data-reveal>
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Highlights</h2>
              <ul className="mt-4 space-y-3 border-t border-line pt-5 text-base leading-relaxed text-copy">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </main>
        )}

        <footer className="mt-12 border-t border-line/90 bg-[#081711]/50 text-sm text-copy">
          <div className="flex flex-col gap-2 px-0 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-muted">Geno</p>
            <div className="flex items-center gap-5 font-mono">
              <a href={cvUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-title">
                portfolio
              </a>
              <a href="mailto:Mohamedr7825@gmail.com" className="transition-colors hover:text-title">
                email
              </a>
              <a href="https://github.com/geno543" target="_blank" rel="noreferrer" className="transition-colors hover:text-title">
                github
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
