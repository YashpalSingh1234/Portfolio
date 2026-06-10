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
  problem: string
  research: string
  solution: string
  outcome: string
  tech: string[]
  highlight?: string
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface SkillGroup {
  category: string
  icon: string
  skills: Skill[]
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
