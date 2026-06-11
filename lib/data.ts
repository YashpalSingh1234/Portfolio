import type { Experience, SkillGroup, Certification, BlogPost } from '@/types'

export const PERSONAL = {
  name: 'Yashpal Singh',
  title: 'AI Engineer · Full Stack Developer',
  tagline: 'Building production AI products and intelligent automation systems.',
  shortBio:
    'Focused on LLMs, ML Systems, and scalable web applications. 2 years of R&D experience shipping production-grade AI pipelines and intelligent automation — not just benchmark papers.',
  email: 'rk7129357@email.com',
  github: 'https://github.com/YashpalSingh1234',
  linkedin: 'https://linkedin.com/in/yashpal-singh-65810b241',
  location: 'Ahmedabad',
  resumeUrl: '/resume.pdf',
  availability: 'Open to AI Engineer / ML Engineer opportunities',
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-2',
    role: 'AI/ML Engineer — R&D',
    company: 'Neural Systems Lab',
    period: 'Jan 2024 – Present',
    type: 'Full-time',
    problem:
      'Enterprise clients needed document intelligence at scale—thousands of PDFs per hour, with zero hallucination tolerance for compliance-critical extraction.',
    research:
      'Evaluated retrieval-augmented generation with dense passage retrieval vs BM25 hybrid search. Benchmarked GPT-4, Claude 3, and fine-tuned Llama-3 on domain-specific extraction tasks. Analysed latency/cost tradeoffs for real-time vs async pipelines.',
    solution:
      'Built a production RAG system with hybrid retrieval (FAISS + BM25), re-ranking with a cross-encoder, and structured output enforcement via constrained decoding. Deployed on FastAPI + Celery with Redis queue.',
    outcome:
      'Reduced manual document review by 74%, achieving 96.2% extraction accuracy. System processes 4,200+ pages/hour. Cost per document dropped 83% vs previous SaaS solution.',
    achievements: [
      'Built a production RAG pipeline with hybrid FAISS + BM25 retrieval and cross-encoder re-ranking, achieving 96.2% document extraction accuracy.',
      'Enforced structured outputs via constrained decoding — zero hallucination tolerance for compliance-critical workflows.',
      'Deployed on FastAPI + Celery + Redis; system processes 4,200+ pages/hour with async queue management.',
      'Cut cost per document by 83% compared to the prior SaaS solution through in-house pipeline architecture.',
    ],
    tech: ['Python', 'LangChain', 'FastAPI', 'FAISS', 'Redis', 'Docker', 'GPT-4', 'Llama-3', 'PostgreSQL'],
    highlight: '96.2% extraction accuracy · 83% cost reduction',
  },
  {
    id: 'exp-1',
    role: 'Junior ML Engineer — R&D',
    company: 'Neural Systems Lab',
    period: 'Jun 2023 – Dec 2023',
    type: 'Full-time',
    problem:
      'The team had no standardised ML infrastructure. Models trained locally had no reproducibility guarantees, and deployments were ad hoc shell scripts.',
    research:
      'Audited existing model training workflows. Evaluated MLflow vs Weights & Biases for experiment tracking, and Seldon vs FastAPI + Docker for serving.',
    solution:
      'Designed and implemented an end-to-end MLOps platform: automated training pipelines with DVC, experiment tracking with MLflow, model registry, FastAPI serving with auto-scaling on AWS ECS, and Grafana monitoring dashboards.',
    outcome:
      'Reduced model deployment time from 3 days to 45 minutes. Enabled full experiment reproducibility. Team shipped 3x more model iterations per sprint.',
    achievements: [
      'Designed and shipped an end-to-end MLOps platform: DVC pipelines, MLflow registry, FastAPI serving, and Grafana dashboards.',
      'Reduced model deployment time from 3 days to 45 minutes through automated CI/CD on AWS ECS.',
      'Enabled full experiment reproducibility — every training run versioned with data, code, and hyperparameters.',
      'Team shipped 3× more model iterations per sprint after platform adoption.',
    ],
    tech: ['Python', 'MLflow', 'DVC', 'FastAPI', 'Docker', 'AWS ECS', 'Grafana', 'PostgreSQL', 'GitHub Actions'],
    highlight: 'Deployment time: 3 days → 45 minutes',
  },
  {
    id: 'exp-0',
    role: 'ML Research Intern',
    company: 'Neural Systems Lab',
    period: 'Jan 2023 – May 2023',
    type: 'Internship',
    problem:
      'News articles were being classified for misinformation manually, which was slow and inconsistent. The team needed an automated, explainable classifier.',
    research:
      'Reviewed BERT-based classification literature. Compared TF-IDF + classical ML vs fine-tuned transformers on the LIAR and FakeNewsNet datasets. Explored explainability via LIME and attention visualisation.',
    solution:
      'Fine-tuned RoBERTa on a combined dataset of 80K+ articles with data augmentation. Added LIME-based explainability layer. Deployed as a REST API consumed by the editorial dashboard.',
    outcome:
      'Achieved 94.7% F1 on held-out test set, outperforming all prior internal baselines. Integrated into production editorial workflow.',
    achievements: [
      'Fine-tuned RoBERTa on 80K+ articles with data augmentation; achieved 94.7% F1, outperforming all prior internal baselines.',
      'Added LIME-based explainability layer so editors could audit model decisions on flagged articles.',
      'Deployed as a FastAPI REST service integrated into the live editorial review dashboard.',
      'Outperformed GPT-4 zero-shot baseline by 8.3 percentage points on the held-out test set.',
    ],
    tech: ['Python', 'PyTorch', 'HuggingFace', 'RoBERTa', 'LIME', 'FastAPI', 'Docker'],
    highlight: '94.7% F1 — outperformed all prior baselines',
  },
]

// Skill groups ordered for maximum recruiter impact:
// Core language → backend → ML fundamentals → AI/LLM → infrastructure
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Core & Backend',
    icon: '⚡',
    skills: [
      { name: 'Python', level: 97, category: 'Core & Backend' },
      { name: 'FastAPI', level: 92, category: 'Core & Backend' },
      { name: 'SQL / PostgreSQL', level: 82, category: 'Core & Backend' },
      { name: 'REST APIs', level: 88, category: 'Core & Backend' },
    ],
  },
  {
    category: 'Machine Learning',
    icon: '🤖',
    skills: [
      { name: 'Scikit-learn', level: 95, category: 'Machine Learning' },
      { name: 'XGBoost / LightGBM', level: 90, category: 'Machine Learning' },
      { name: 'Feature Engineering', level: 92, category: 'Machine Learning' },
      { name: 'Pandas / NumPy', level: 96, category: 'Machine Learning' },
    ],
  },
  {
    category: 'AI Systems',
    icon: '✨',
    skills: [
      { name: 'LangChain / LlamaIndex', level: 92, category: 'AI Systems' },
      { name: 'OpenAI API', level: 95, category: 'AI Systems' },
      { name: 'Prompt Engineering', level: 90, category: 'AI Systems' },
      { name: 'Fine-tuning (LoRA / PEFT)', level: 80, category: 'AI Systems' },
    ],
  },
  {
    category: 'Deep Learning',
    icon: '🧠',
    skills: [
      { name: 'PyTorch', level: 90, category: 'Deep Learning' },
      { name: 'HuggingFace Transformers', level: 93, category: 'Deep Learning' },
      { name: 'TensorFlow / Keras', level: 82, category: 'Deep Learning' },
      { name: 'ONNX / Model Optimization', level: 78, category: 'Deep Learning' },
    ],
  },
  {
    category: 'RAG & Vector Search',
    icon: '🔎',
    skills: [
      { name: 'FAISS / Pinecone', level: 90, category: 'RAG & Vector Search' },
      { name: 'Hybrid Search (BM25)', level: 85, category: 'RAG & Vector Search' },
      { name: 'Embedding Models', level: 88, category: 'RAG & Vector Search' },
      { name: 'Reranking / RAG Eval', level: 82, category: 'RAG & Vector Search' },
    ],
  },
  {
    category: 'MLOps & Infra',
    icon: '🚀',
    skills: [
      { name: 'Docker', level: 85, category: 'MLOps & Infra' },
      { name: 'MLflow / DVC', level: 88, category: 'MLOps & Infra' },
      { name: 'AWS (ECS, S3, Lambda)', level: 80, category: 'MLOps & Infra' },
      { name: 'GitHub Actions / CI/CD', level: 87, category: 'MLOps & Infra' },
    ],
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
