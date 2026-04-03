'use client'

import { type ChangeEvent, type FocusEvent, type FormEvent, useEffect, useMemo, useState } from 'react'

type Project = {
  title: string
  description: string
  imageLabel: string
  imageAccent: string
  link: string
}

type SkillGroup = {
  title: string
  items: string[]
}

type ContactFormData = {
  name: string
  email: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

const navigationItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'A personal portfolio site built to introduce my background, highlight my frontend learning journey, and create a clear way for recruiters to connect with me.',
    imageLabel: 'Personal portfolio homepage preview',
    imageAccent: 'from-amber-200 via-orange-200 to-rose-200',
    link: 'https://github.com/muh-dixon',
  },
  {
    title: 'Frontend Practice Project',
    description:
      'A project card placeholder for one of my Frontend Simplified builds using HTML, CSS, and JavaScript. This section is ready for my updated screenshots and live links.',
    imageLabel: 'Frontend project placeholder card',
    imageAccent: 'from-sky-200 via-cyan-200 to-emerald-200',
    link: 'https://github.com/muh-dixon',
  },
  {
    title: 'React Learning Project',
    description:
      'A space for a newer React-focused project as I continue building out my portfolio with stronger case studies and more polished production work.',
    imageLabel: 'Timer widgets and session cards',
    imageAccent: 'from-indigo-200 via-blue-200 to-teal-200',
    link: 'https://github.com/muh-dixon',
  },
]

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'Background',
    items: ['Computer Science', 'Towson University', 'Remote collaboration', 'Web development'],
  },
  {
    title: 'Current Focus',
    items: ['Frontend Simplified', 'Responsive UI', 'Accessibility', 'Portfolio refinement'],
  },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/muh-dixon',
    ariaLabel: 'Visit Shabil Dixon on GitHub',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-shabil-dixon-ba7ab8263/',
    ariaLabel: 'Visit Shabil Dixon on LinkedIn',
  },
  {
    label: 'Resume',
    href: '#contact',
    ariaLabel: 'Jump to the contact section for resume requests',
  },
]

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  message: '',
}

const validateForm = (data: ContactFormData) => {
  const errors: ContactFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please use a valid email address.'
  }

  if (!data.message.trim()) {
    errors.message = 'Please add a short message.'
  } else if (data.message.trim().length < 20) {
    errors.message = 'Please share at least 20 characters so I have enough context.'
  }

  return errors
}

const PortfolioHeader = ({
  darkMode,
  onToggleDarkMode,
}: {
  darkMode: boolean
  onToggleDarkMode: () => void
}) => {
  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur ${
        darkMode ? 'border-white/10 bg-slate-950/85' : 'border-black/10 bg-white/85'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className={`text-sm font-semibold uppercase tracking-[0.28em] transition ${
            darkMode
              ? 'text-slate-100 hover:text-blue-300'
              : 'text-slate-900 hover:text-blue-700'
          }`}
        >
          Shabil Dixon
        </a>

        <div className="flex items-center gap-3">
          <nav aria-label="Primary" className="hidden gap-6 md:flex">
            {navigationItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm transition ${
                  darkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              darkMode
                ? 'border-slate-700 text-slate-100 hover:border-slate-200 hover:bg-slate-900'
                : 'border-slate-300 text-slate-900 hover:border-slate-900 hover:bg-slate-100'
            }`}
          >
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </div>
    </header>
  )
}

const SectionHeading = ({
  darkMode,
  eyebrow,
  title,
  description,
}: {
  darkMode: boolean
  eyebrow: string
  title: string
  description: string
}) => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.25em] ${
          darkMode ? 'text-blue-300' : 'text-blue-700'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
          darkMode ? 'text-white' : 'text-slate-950'
        }`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  )
}

const ProjectCard = ({ darkMode, project }: { darkMode: boolean; project: Project }) => {
  return (
    <article
      className={`group overflow-hidden rounded-3xl border shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
        darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
      }`}
    >
      <div
        className={`flex h-48 items-end bg-gradient-to-br ${project.imageAccent} p-6`}
        role="img"
        aria-label={project.imageLabel}
      >
        <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-medium text-slate-800 backdrop-blur">
          {project.imageLabel}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
            {project.title}
          </h3>
          <p className={`mt-3 text-sm leading-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {project.description}
          </p>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center text-sm font-semibold transition ${
            darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-900'
          }`}
        >
          View project
        </a>
      </div>
    </article>
  )
}

const AboutSection = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <section id="about" className="px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="mx-auto flex w-full max-w-sm justify-center">
          <div
            className={`relative w-full overflow-hidden rounded-[2rem] border p-8 shadow-lg ${
              darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
            }`}
          >
            <div
              className={`absolute inset-x-8 top-8 h-28 rounded-full bg-gradient-to-r blur-2xl ${
                darkMode
                  ? 'from-blue-500/30 via-cyan-400/20 to-amber-300/20'
                  : 'from-blue-200 via-cyan-200 to-amber-200'
              }`}
            />
            <div
              className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-700 to-blue-700 text-6xl font-semibold text-white"
              role="img"
              aria-label="Photo placeholder for Shabil Dixon"
            >
              SD
            </div>
            <p
              className={`relative mt-6 text-center text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Photo placeholder for your headshot or profile image.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center lg:text-left">
          <SectionHeading
            darkMode={darkMode}
            eyebrow="About"
            title="I'm building a frontend career grounded in strong fundamentals and steady improvement."
            description="I'm Shabil Dixon, a Towson University graduate with a B.A. in Computer Science focused on growing into frontend web development through hands-on projects and continuous practice."
          />

          <p
            className={`mx-auto mt-6 max-w-xl text-base leading-7 lg:mx-0 ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            I&apos;m currently learning through Frontend Simplified, where I&apos;m strengthening my
            skills in HTML, CSS, JavaScript, and React while building projects that move me closer
            to remote frontend opportunities.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {skillGroups.map(group => (
              <div
                key={group.title}
                className={`rounded-2xl border p-5 text-left ${
                  darkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <h3
                  className={`text-sm font-semibold uppercase tracking-[0.16em] ${
                    darkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {group.title}
                </h3>
                <ul className={`mt-3 space-y-2 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {group.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const ContactSection = ({ darkMode }: { darkMode: boolean }) => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    email: false,
    message: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => validateForm(formData), [formData])
  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof ContactFormData
    const { value } = event.target

    setFormData(current => ({
      ...current,
      [field]: value,
    }))
    setSubmitted(false)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof ContactFormData

    setTouched(current => ({
      ...current,
      [field]: true,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) {
      setTouched({
        name: true,
        email: true,
        message: true,
      })
      return
    }

    setSubmitted(true)
    setFormData(initialFormData)
    setTouched({
      name: false,
      email: false,
      message: false,
    })
  }

  return (
    <section id="contact" className="px-6 py-20 sm:py-24">
      <div
        className={`mx-auto grid max-w-6xl gap-10 rounded-[2rem] border p-8 shadow-lg md:grid-cols-[0.9fr_1.1fr] md:p-12 ${
          darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
        }`}
      >
        <div>
          <p
            className={`text-sm font-semibold uppercase tracking-[0.25em] ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}
          >
            Contact
          </p>
          <h2
            className={`mt-3 text-3xl font-semibold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-950'
            }`}
          >
            Let&apos;s build something useful together.
          </h2>
          <p className={`mt-4 max-w-md text-base leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Share a project idea, an entry-level opportunity, or a collaboration. This demo form
            uses client-side validation and keeps the submit button disabled until everything is
            ready.
          </p>

          <div className={`mt-8 space-y-3 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <p>GitHub: github.com/muh-dixon</p>
            <p>Open to remote frontend web development opportunities.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
              className={`mt-2 w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 ${
                darkMode
                  ? 'border-slate-700 bg-slate-900 text-white focus:border-blue-400 focus:ring-blue-500/30'
                  : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-blue-200'
              }`}
            />
            {errors.name && touched.name ? (
              <p
                id="name-error"
                role="alert"
                className={`mt-2 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              className={`mt-2 w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 ${
                darkMode
                  ? 'border-slate-700 bg-slate-900 text-white focus:border-blue-400 focus:ring-blue-500/30'
                  : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-blue-200'
              }`}
            />
            {errors.email && touched.email ? (
              <p
                id="email-error"
                role="alert"
                className={`mt-2 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="message"
              className={`block text-sm font-medium ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
              className={`mt-2 w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 ${
                darkMode
                  ? 'border-slate-700 bg-slate-900 text-white focus:border-blue-400 focus:ring-blue-500/30'
                  : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-blue-200'
              }`}
            />
            {errors.message && touched.message ? (
              <p
                id="message-error"
                role="alert"
                className={`mt-2 text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                {errors.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:hover:bg-slate-400"
          >
            Send message
          </button>

          {submitted ? (
            <p
              className={`text-sm font-medium ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}
              role="status"
            >
              Thanks for reaching out. This form is ready for your updated contact workflow.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

const PortfolioFooter = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <footer className={`border-t px-6 py-8 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between ${
          darkMode ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        <p>(c) 2026 Shabil Dixon. Built with Next.js and Tailwind CSS.</p>

        <div className="flex gap-5">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.ariaLabel}
              className={`transition ${darkMode ? 'hover:text-white' : 'hover:text-slate-950'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

const Module5Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setHeroVisible(true)

    document.documentElement.classList.add('scroll-smooth')

    return () => {
      document.documentElement.classList.remove('scroll-smooth')
    }
  }, [])

  return (
    <div
      id="top"
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.6),_transparent_38%),linear-gradient(180deg,_#fffdf7_0%,_#f8fafc_48%,_#eef2ff_100%)] text-slate-900'
      }`}
    >
      <PortfolioHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(current => !current)} />

      <main>
        <section className="px-6 pb-20 pt-16 sm:pb-24 sm:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className={`transition-all duration-700 ${
                heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <p
                className={`text-sm font-semibold uppercase tracking-[0.28em] ${
                  darkMode ? 'text-blue-300' : 'text-blue-700'
                }`}
              >
                Frontend Developer
              </p>
              <h1
                className={`mt-5 text-5xl font-semibold tracking-tight sm:text-6xl ${
                  darkMode ? 'text-white' : 'text-slate-950'
                }`}
              >
                Hey, I&apos;m Shabil.
              </h1>
              <p
                className={`mt-6 max-w-xl text-lg leading-8 ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                I&apos;m a Towson University Computer Science graduate looking for remote work in
                frontend web development and continuing to grow through Frontend Simplified.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-center"
                >
                  Contact Me
                </a>
                <a
                  href="#projects"
                  className={`rounded-md border px-4 py-2 text-center transition ${
                    darkMode
                      ? 'border-slate-700 text-slate-100 hover:border-slate-200 hover:bg-slate-900'
                      : 'border-slate-300 text-slate-900 hover:border-slate-900 hover:bg-white/60'
                  }`}
                >
                  View Projects
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className={`absolute -left-10 top-10 h-32 w-32 rounded-full blur-3xl ${
                  darkMode ? 'bg-amber-200/10' : 'bg-amber-300/30'
                }`}
              />
              <div
                className={`absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-400/30'
                }`}
              />
              <div
                className={`relative overflow-hidden rounded-[2rem] border p-8 shadow-xl backdrop-blur ${
                  darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/80'
                }`}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950 p-5 text-white">
                    <p className="text-sm text-slate-300">Current focus</p>
                    <p className="mt-8 text-2xl font-semibold">Frontend web development</p>
                  </div>
                  <div className="rounded-3xl bg-amber-100 p-5 text-slate-900">
                    <p className="text-sm text-slate-600">Recent wins</p>
                    <p className="mt-8 text-2xl font-semibold">CS degree + portfolio growth</p>
                  </div>
                  <div
                    className={`rounded-3xl p-5 ${
                      darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                      Tooling
                    </p>
                    <p className="mt-8 text-2xl font-semibold">HTML, CSS, JavaScript, React</p>
                  </div>
                  <div className="rounded-3xl bg-blue-600 p-5 text-white">
                    <p className="text-sm text-blue-100">Available for</p>
                    <p className="mt-8 text-2xl font-semibold">Remote frontend roles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              darkMode={darkMode}
              eyebrow="Projects"
              title="Projects from my learning journey, with room for updated case studies."
              description="Your older portfolio had project placeholders, so I kept this section grounded in your real direction while leaving it easy to swap in stronger project names, screenshots, and live demos."
            />

            <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projects.map(project => (
                <ProjectCard key={project.title} darkMode={darkMode} project={project} />
              ))}
            </div>
          </div>
        </section>

        <AboutSection darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
      </main>

      <PortfolioFooter darkMode={darkMode} />
    </div>
  )
}

export default Module5Portfolio
