import type { Experience, SkillGroup, Certification, BlogPost } from '@/types'

export const PERSONAL = {
  name: 'Yashpal Singh',
  title: 'AI Engineer · Building Intelligent Applications',
  tagline: 'Building production AI products and intelligent automation systems.',
  shortBio:
    'Computer Science graduate with experience in Unity development and a transition into AI/ML. Built projects across RAG, computer vision, and model experimentation using modern AI tooling.',
  email: 'rk7129357@email.com',
  github: 'https://github.com/YashpalSingh1234',
  linkedin: 'https://www.linkedin.com/in/yashpal-singh-65810b241/',
  location: 'Ahmedabad',
  resumeUrl: '/resume.pdf',
  availability: 'Open to AI Engineer / ML Engineer opportunities',
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-aiml',
    role: 'AI/ML Developer (Projects & Research)',
    company: 'Phibonacci Learning',
    period: 'Aug 2024 – Present',
    type: 'Full-time',
    achievements: [
      'Designed and built Retrieval-Augmented Generation (RAG) systems, combining LLM workflows with vector search to ground responses in retrieved context.',
      'Built and experimented with model training, fine-tuning, and inference workflows using PyTorch and Hugging Face.',
      'Built computer vision solutions using OpenCV and YOLO-based models for object detection and image-processing tasks.',
    ],
    tech: ['Python', 'PyTorch', 'Hugging Face', 'LangChain', 'Vector Databases', 'OpenCV', 'YOLO'],
  },
  {
    id: 'exp-unity',
    role: 'Unity Developer (3D Simulation)',
    company: 'Phibonacci Learning',
    period: 'Aug 2022 – Jul 2024',
    type: 'Full-time',
    achievements: [
      'Built and maintained real-time 3D simulation applications in Unity using C#, covering simulation logic, scene behaviour, and performance-aware programming.',
      'Strengthened core engineering fundamentals — debugging real-time systems, algorithmic problem-solving, and writing maintainable code — that carried directly into the move into AI/ML.',
    ],
    tech: ['Unity', 'C#'],
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
  {
    category: 'Frontend',
    icon: '🖥️',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS'],
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
