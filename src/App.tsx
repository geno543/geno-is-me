import { useLayoutEffect, useRef, useState } from 'react'
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
  image: string
  layoutClass: string
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [activeGalleryItem, setActiveGalleryItem] = useState<GalleryItem | null>(null)
  const cvUrl = '/My__CV%20(3)%20(1).pdf'
  const galleryBase = `${import.meta.env.BASE_URL}gallery/`
  const clydeBase = `${import.meta.env.BASE_URL}clyde/`
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
      href: 'https://telqai.stemcsclub.org/',
    },
    {
      title: 'EOCS',
      subtitle: 'Egyptian Olympiad in Computational Science',
      period: 'Initiative',
      detail: 'A national competition and curriculum ecosystem for students interested in computational and algorithmic thinking.',
      href: 'https://www.eocs.net/',
    },
    {
      title: 'CALM',
      subtitle: 'TypeScript Web Product',
      period: 'Production',
      detail: 'A shipped web experience built with TypeScript and deployed publicly with iterative product updates.',
      href: 'https://github.com/geno543/CALM',
    },
    {
      title: 'Genatica',
      subtitle: 'AI/Software Project',
      period: 'R&D',
      detail: 'A TypeScript-based technical project from your GitHub portfolio focused on applied implementation.',
      href: 'https://github.com/geno543/Genatica',
    },
    {
      title: 'ENCOT',
      subtitle: 'Python Engineering Project',
      period: 'Research',
      detail: 'A Python project in your repository set demonstrating computational and engineering workflows.',
      href: 'https://github.com/geno543/ENCOT',
    },
    {
      title: 'Phiga Competition',
      subtitle: 'Competition Platform',
      period: 'Platform',
      detail: 'A production web platform for competition activities and participant-facing information.',
      href: 'https://github.com/geno543/Phiga-competition',
    },
    {
      title: 'Tholasy',
      subtitle: 'Educational Product',
      period: 'Venture',
      detail: 'A JavaScript-based educational product project with public deployment and active iteration.',
      href: 'https://github.com/geno543/tholasy',
    },
  ]

  const galleryItems: GalleryItem[] = [
    {
      title: 'First Hack Club Hackathon',
      caption: 'My first Hack Club hackathon experience and one of the moments that pushed me deeper into building.',
      image: `${galleryBase}counterspell.webp`,
      layoutClass: 'md:col-span-4 md:row-span-2',
    },
    {
      title: 'First ECPC Participation',
      caption: 'My first ECPC participation with my friend Yaseen.',
      image: `${galleryBase}ecpc-first.jpeg`,
      layoutClass: 'md:col-span-2 md:row-span-1 md:translate-y-6',
    },
    {
      title: 'First ML Session I Taught',
      caption: 'A milestone where I taught my first machine learning session.',
      image: `${galleryBase}ml-session.jpeg`,
      layoutClass: 'md:col-span-3 md:row-span-2 md:-translate-y-2',
    },
    {
      title: 'EOCS Organizing',
      caption: "The image of me with the participants and the team at the end of Egypt's Computational Science Olympiad.",
      image: `${galleryBase}eocs-organize.jpg`,
      layoutClass: 'md:col-span-3 md:row-span-1 md:translate-y-4',
    },
    {
      title: 'NASA Space Apps Winner',
      caption: 'Winning NASA Space Apps Cairo and taking first place.',
      image: `${galleryBase}nasa-winner.png`,
      layoutClass: 'md:col-span-2 md:row-span-1 md:-translate-y-5',
    },
    {
      title: 'Pizza Party',
      caption: 'One of my favorite community memories with the team.',
      image: `${galleryBase}pizza-party.jpeg`,
      layoutClass: 'md:col-span-4 md:row-span-1 md:translate-y-2',
    },
    {
      title: 'Me at 5 Years Old',
      caption: 'A personal childhood memory.',
      image: `${galleryBase}me-age-5.jpg`,
      layoutClass: 'md:col-span-2 md:row-span-1',
    },
    {
      title: 'My Cat',
      caption: 'A random but important part of life: my cat.',
      image: `${galleryBase}my-cat.jpg`,
      layoutClass: 'md:col-span-2 md:row-span-1',
    },
    {
      title: 'Scrapyard Hackathon',
      caption: 'Scrapyard, the first hackathon I organized with 180 participants.',
      image: `${galleryBase}scrapyard-180.jpg`,
      layoutClass: 'md:col-span-3 md:row-span-1',
    },
    {
      title: 'Scrapyard Team Photo',
      caption: 'Another Scrapyard memory with the full group.',
      image: `${galleryBase}scrapyard-team.jpg`,
      layoutClass: 'md:col-span-3 md:row-span-1',
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
    <div ref={pageRef} className="min-h-screen bg-transparent text-ink">
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
              <p data-hero-body className="mt-3 max-w-2xl font-mono text-sm text-muted">
                These are some projects. If you need more, go to my{' '}
                <a href="https://github.com/geno543" target="_blank" rel="noreferrer" className="text-copy transition-colors hover:text-title">
                  GitHub
                </a>
                .
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 data-hero-title className="max-w-2xl font-serif text-5xl leading-[1.05] text-title sm:text-6xl">
                    Gallery
                  </h1>
                  <p data-hero-body className="mt-6 max-w-2xl font-mono text-sm text-muted">
                    Real moments from the build. Click any image to open it in a larger view.
                  </p>
                </div>
                <img
                  src={`${clydeBase}clyde-2.png`}
                  alt="Clyde McBride"
                  className="h-24 w-auto object-contain sm:h-28"
                  loading="lazy"
                />
              </div>
            </section>

            <section className="mt-10" data-reveal>
              <div className="grid gap-5 md:auto-rows-[280px] md:grid-cols-6">
                {galleryItems.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveGalleryItem(item)}
                    className={`group overflow-hidden rounded-xl border border-line/90 bg-[#0a1b15]/70 text-left transition-all duration-300 hover:-translate-y-1 hover:border-copy/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copy ${item.layoutClass}`}
                  >
                    <div className="h-[72%] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-2xl leading-tight text-title">{item.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-copy">{item.caption}</p>
                    </div>
                  </button>
                ))}
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
                  Resume / CV
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
                Resume / CV
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

      {activeGalleryItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActiveGalleryItem(null)}
        >
          <div
            className="w-full max-w-6xl rounded-xl border border-line/90 bg-[#0b1d16] p-3 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
              <div>
                <h3 className="font-serif text-3xl leading-tight text-title sm:text-4xl">{activeGalleryItem.title}</h3>
                <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-copy sm:text-base">{activeGalleryItem.caption}</p>
              </div>
              <button
                type="button"
                className="rounded-md border border-line/90 px-3 py-1 font-mono text-xs text-muted transition-colors hover:text-title"
                onClick={() => setActiveGalleryItem(null)}
              >
                close
              </button>
            </div>
            <img
              src={activeGalleryItem.image}
              alt={activeGalleryItem.title}
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
