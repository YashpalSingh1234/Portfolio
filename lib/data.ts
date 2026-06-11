import type { Experience, SkillGroup, Certification, BlogPost } from '@/types'

export const PERSONAL = {
  name: 'Yashpal Singh',
  title: 'AI Engineer',
  tagline: 'I build AI systems that ship.',
  shortBio:
    'AI Engineer with 2 years of R&D experience designing production-grade ML pipelines, LLM applications, and intelligent systems that solve real business problems—not just benchmark papers.',
  email: 'rk7129357@email.com',
  github: 'https://github.com/YashpalSingh1234',
  linkedin: 'https://linkedin.com/in/yashpal-singh-65810b241',
  location: 'Ahmedabad',
  resumeUrl: '/resume.pdf',
  availability: 'Open to opportunities',
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
    tech: ['Python', 'LangChain', 'FastAPI', 'FAISS', 'Redis', 'Docker', 'GPT-4', 'Llama-3', 'PostgreSQL'],
    highlight: '96.2% extraction accuracy at 4,200 pages/hr',
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
      'Audited existing model training workflows. Evaluated MLflow vs Weights & Biases for experiment tracking, and Seldon vs FastAPI + Docker for serving. Reviewed best practices from Chip Huyen\'s ML Systems Design.',
    solution:
      'Designed and implemented an end-to-end MLOps platform: automated training pipelines with DVC, experiment tracking with MLflow, model registry, FastAPI serving with auto-scaling on AWS ECS, and Grafana monitoring dashboards.',
    outcome:
      'Reduced model deployment time from 3 days to 45 minutes. Enabled full experiment reproducibility. Team shipped 3x more model iterations per sprint.',
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
      'Achieved 94.7% F1 on held-out test set, outperforming all prior internal baselines. Integrated into production editorial workflow serving 50K+ articles/day.',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'RoBERTa', 'LIME', 'FastAPI', 'Docker'],
    highlight: '94.7% F1 — outperformed all prior baselines',
  },
]

export const SKILL_GROUPS: SkillGroup[] = [
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
    category: 'Deep Learning',
    icon: '🧠',
    skills: [
      { name: 'PyTorch', level: 90, category: 'Deep Learning' },
      { name: 'TensorFlow / Keras', level: 82, category: 'Deep Learning' },
      { name: 'HuggingFace Transformers', level: 93, category: 'Deep Learning' },
      { name: 'ONNX / Model Optimization', level: 78, category: 'Deep Learning' },
    ],
  },
  {
    category: 'LLM & GenAI',
    icon: '✨',
    skills: [
      { name: 'LangChain / LlamaIndex', level: 92, category: 'LLM & GenAI' },
      { name: 'OpenAI API', level: 95, category: 'LLM & GenAI' },
      { name: 'Prompt Engineering', level: 90, category: 'LLM & GenAI' },
      { name: 'Fine-tuning (LoRA / PEFT)', level: 80, category: 'LLM & GenAI' },
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
    category: 'Backend & APIs',
    icon: '⚡',
    skills: [
      { name: 'FastAPI', level: 92, category: 'Backend & APIs' },
      { name: 'Python', level: 97, category: 'Backend & APIs' },
      { name: 'PostgreSQL / Redis', level: 82, category: 'Backend & APIs' },
      { name: 'REST / GraphQL', level: 80, category: 'Backend & APIs' },
    ],
  },
  {
    category: 'MLOps & Deployment',
    icon: '🚀',
    skills: [
      { name: 'Docker / Kubernetes', level: 85, category: 'MLOps & Deployment' },
      { name: 'MLflow / DVC', level: 88, category: 'MLOps & Deployment' },
      { name: 'AWS (ECS, S3, Lambda)', level: 80, category: 'MLOps & Deployment' },
      { name: 'GitHub Actions / CI/CD', level: 87, category: 'MLOps & Deployment' },
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
