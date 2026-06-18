export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  dataset: string
  model: string
  evaluation: string
  deployment: string
  challenges: string[]
  results: string[]
  metrics: Metric[]
  architecture: ArchStep[]
  github?: string
  demo?: string
  featured: boolean
}

export interface Metric {
  label: string
  value: string
  delta?: string
  positive?: boolean
}

export interface ArchStep {
  label: string
  icon: string
  description: string
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  type: string
  // Narrative fields are optional — Experience.tsx only renders
  // `achievements` + `tech`. Fill these in only with content you can
  // defend in an interview; leave them out otherwise.
  problem?: string
  research?: string
  solution?: string
  outcome?: string
  achievements: string[]
  tech: string[]
  highlight?: string
}

export interface SkillGroup {
  category: string
  icon: string
  // Flat tag list — no proficiency levels/percentages by design.
  skills: string[]
}

export interface Certification {
  title: string
  issuer: string
  date: string
  credentialId?: string
  link?: string
  icon: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  link: string
}
