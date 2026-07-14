import { PERSONAL, SKILL_GROUPS } from '@/lib/data'

/**
 * Single source of truth for site-wide SEO values.
 * Change the domain here once and every metadata file (layout, sitemap,
 * robots, manifest, JSON-LD, OG images) stays in sync.
 */
export const SITE_URL = 'https://yash.cvking.in'
export const SITE_NAME = `${PERSONAL.name} — AI Engineer Portfolio`
export const SITE_TITLE = `${PERSONAL.name} — AI Engineer | LLM, RAG & MLOps`
export const SITE_DESCRIPTION =
  'AI Engineer with 2+ years of R&D experience building production-grade ML pipelines, LLM applications, and RAG systems. Specialising in applied AI, generative AI, computer vision, and MLOps.'

export const SITE_KEYWORDS = [
  'Yashpal Singh',
  'AI Engineer',
  'Machine Learning Engineer',
  'LLM Engineer',
  'RAG systems',
  'Retrieval Augmented Generation',
  'Generative AI',
  'MLOps',
  'PyTorch',
  'LangChain',
  'FastAPI',
  'Computer Vision',
  'Python Developer',
  'AI Portfolio',
]

/** Flat list of skills, derived from lib/data.ts, for the Person JSON-LD schema. */
export const ALL_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills)

/** Social / profile links used for sameAs in JSON-LD. Falsy values are filtered out. */
export const SOCIAL_LINKS = [PERSONAL.github, PERSONAL.linkedin].filter(Boolean)
