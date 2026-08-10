import type { Experience, SkillGroup, Certification, BlogPost } from '@/types'

export const PERSONAL = {
  name: 'Yashpal Singh',
  title: 'AI/ML R&D Engineer | Building Intelligent Applications',
  tagline: 'Building production AI products and intelligent automation systems.',
  shortBio:
    'AI/ML R&D Engineer with 4 years of professional experience. Focused on Retrieval-Augmented Generation, LLM applications, and computer vision, using modern AI tooling to take projects from research to production.',
  email: 'rk7129357@email.com',
  github: 'https://github.com/YashpalSingh1234',
  linkedin: 'https://www.linkedin.com/in/yashpal-singh-65810b241/',
  location: 'Ahmedabad',
  resumeUrl: '/yashpal.resume.pdf',
  availability: 'Open to AI Engineer / ML Engineer opportunities',
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-aiml',
    role: 'AI/ML R&D Engineer',
    company: 'Phibonacci Learning',
    period: 'Aug 2022 – Present',
    type: 'Full-time',
    highlight: '4 Years of Professional Experience',
    achievements: [
      'Designed and built Retrieval-Augmented Generation (RAG) systems, combining LLM workflows with vector search to ground responses in retrieved context.',
      'Built and experimented with model training, fine-tuning, and inference workflows using PyTorch and Hugging Face.',
      'Built computer vision solutions using OpenCV and YOLO-based models for object detection and image-processing tasks.',
      'Worked across the full AI/ML R&D lifecycle — experimentation, model integration, and API-based deployment — to move projects from research prototypes to production-oriented systems.',
    ],
    tech: ['Python', 'PyTorch', 'Hugging Face', 'LangChain', 'Vector Databases', 'OpenCV', 'YOLO', 'FastAPI'],
  },
]

// Skill groups — exactly the categories on the resume, AI/ML-first.
// Flat tags, no proficiency percentages.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'AI / ML',
    icon: '🤖',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
  },
  {
    category: 'LLM & AI',
    icon: '✨',
    skills: ['LangChain', 'RAG', 'Hugging Face', 'Fine-Tuning'],
  },
  {
    category: 'Computer Vision',
    icon: '👁️',
    skills: ['OpenCV', 'YOLO'],
  },
  {
    category: 'Data',
    icon: '📊',
    skills: ['Pandas', 'NumPy', 'SQL'],
  },
  {
    category: 'Development',
    icon: '⚙️',
    skills: ['FastAPI', 'Git', 'Linux'],
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'AWS Certified Machine Learning – Specialty',
    issuer: 'Amazon Web Services',
    date: '2024',
    credentialId: 'AWS-MLS-2024-XXXXX',
    link: '#',
    icon: '☁️',
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    date: '2023',
    credentialId: 'DLS-2023-XXXXX',
    link: '#',
    icon: '🧠',
  },
  {
    title: 'LangChain for LLM Application Development',
    issuer: 'DeepLearning.AI',
    date: '2024',
    link: '#',
    icon: '🔗',
  },
  {
    title: 'MLOps Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    date: '2023',
    link: '#',
    icon: '⚙️',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'hybrid-rag',
    title: 'Why Pure Dense Retrieval Fails in Production RAG Systems',
    excerpt:
      'Dense retrieval misses exact-match and keyword queries. Here\'s how I combined BM25 + FAISS with a cross-encoder reranker to push faithfulness from 0.78 to 0.94.',
    date: '2024-07-10',
    readTime: '8 min',
    tags: ['RAG', 'FAISS', 'Production'],
    link: '#',
  },
  {
    id: 'onnx-latency',
    title: 'Cutting Transformer Inference Latency by 60% with ONNX + Quantization',
    excerpt:
      'A practical guide to converting RoBERTa to ONNX, applying INT8 quantization, and benchmarking latency vs accuracy tradeoffs for production NLP services.',
    date: '2024-05-22',
    readTime: '11 min',
    tags: ['Optimization', 'ONNX', 'NLP'],
    link: '#',
  },
  {
    id: 'llm-evaluation',
    title: 'The Evaluation Stack I Use for Every LLM Application',
    excerpt:
      'From RAGAS to custom rubrics—how I systematically evaluate LLM apps before shipping to production. Includes the checklist I use on every project.',
    date: '2024-03-15',
    readTime: '9 min',
    tags: ['LLM', 'Evaluation', 'Production'],
    link: '#',
  },
]
