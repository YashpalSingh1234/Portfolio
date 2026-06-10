import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Architecture } from '@/components/sections/Architecture'
import { Certifications } from '@/components/sections/Certifications'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Architecture />
      <Certifications />
      <Blog />
      <Contact />
    </>
  )
}
