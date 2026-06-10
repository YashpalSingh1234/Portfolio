import type { Project, Experience, SkillGroup, Certification, BlogPost } from '@/types'

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

export const PROJECTS: Project[] = [
  {
    id: 'fake-news',
    title: 'Fake News Detection System',
    description: 'Production-grade NLP classifier with explainability, achieving 94.7% F1 across 80K+ articles.',
    longDescription:
      'End-to-end misinformation detection pipeline combining fine-tuned RoBERTa with ensemble classical ML, LIME explainability, and a real-time REST API serving an editorial dashboard.',
    image: '/projects/fake-news.svg',
    tags: ['NLP', 'PyTorch', 'RoBERTa', 'FastAPI', 'Explainable AI'],
    dataset: 'LIAR + FakeNewsNet (80K+ articles)',
    model: 'RoBERTa-base fine-tuned + TF-IDF XGBoost ensemble',
    evaluation: 'F1: 94.7% | Precision: 95.1% | Recall: 94.3%',
    deployment: 'FastAPI + Docker → AWS ECS (auto-scaling)',
    challenges: [
      'Class imbalance (3:1 real:fake ratio) required stratified sampling + focal loss',
      'Attention-based explainability was too noisy; switched to LIME post-hoc',
      'Latency requirements (<200ms) needed ONNX quantization of the RoBERTa model',
    ],
    results: [
      '94.7% F1 on held-out test set',
      'Outperforms GPT-4 zero-shot by +8.3%',
      '<180ms P95 inference latency',
      '50,000+ articles processed daily in production',
    ],
    metrics: [
      { label: 'F1 Score', value: '94.7%', delta: '+8.3% vs GPT-4 0-shot', positive: true },
      { label: 'Precision', value: '95.1%', positive: true },
      { label: 'Recall', value: '94.3%', positive: true },
      { label: 'P95 Latency', value: '178ms', delta: 'ONNX optimized', positive: true },
    ],
    architecture: [
      { label: 'Ingest', icon: '📥', description: 'News API + web scraper' },
      { label: 'Preprocess', icon: '⚙️', description: 'Tokenize, clean, augment' },
      { label: 'Model', icon: '🧠', description: 'RoBERTa + XGBoost ensemble' },
      { label: 'Explain', icon: '🔍', description: 'LIME feature attribution' },
      { label: 'Serve', icon: '🚀', description: 'FastAPI + ONNX runtime' },
    ],
    github: 'https://github.com/YashpalSingh1234/fake-news-detection',
    demo: '#',
    featured: true,
  },
  {
    id: 'rag-chatbot',
    title: 'Enterprise RAG Chatbot',
    description: 'Hybrid retrieval chatbot over 10K+ enterprise documents with 96.2% extraction accuracy.',
    longDescription:
      'Production RAG system with hybrid BM25 + dense retrieval, cross-encoder re-ranking, and structured output enforcement. Processes 4,200+ pages/hour with zero hallucination tolerance.',
    image: '/projects/rag.svg',
    tags: ['LangChain', 'FAISS', 'GPT-4', 'RAG', 'FastAPI', 'Redis'],
    dataset: '10K+ internal enterprise PDFs + knowledge base',
    model: 'GPT-4 Turbo with hybrid retrieval + cross-encoder reranker',
    evaluation: 'Accuracy: 96.2% | RAGAS faithfulness: 0.94 | Context recall: 0.91',
    deployment: 'FastAPI + Celery + Redis → Docker Compose → AWS ECS',
    challenges: [
      'Dense retrieval alone missed exact-match queries; hybrid BM25 + FAISS solved this',
      'LLM hallucinated on out-of-context queries; citation grounding + confidence thresholds added',
      'Token budget management for long documents required hierarchical chunking strategy',
    ],
    results: [
      '96.2% document extraction accuracy',
      'RAGAS faithfulness score: 0.94',
      '74% reduction in manual document review',
      '83% cost reduction vs prior SaaS solution',
      '4,200+ pages processed per hour',
    ],
    metrics: [
      { label: 'Extraction Accuracy', value: '96.2%', positive: true },
      { label: 'RAGAS Faithfulness', value: '0.94', positive: true },
      { label: 'Cost Reduction', value: '83%', delta: 'vs prior SaaS', positive: true },
      { label: 'Throughput', value: '4,200 pg/hr', positive: true },
    ],
    architecture: [
      { label: 'Documents', icon: '📄', description: 'PDF ingestion pipeline' },
      { label: 'Chunk & Embed', icon: '🔢', description: 'Hierarchical chunking + Ada-002' },
      { label: 'Hybrid Retrieval', icon: '🔎', description: 'FAISS + BM25 fusion' },
      { label: 'Rerank', icon: '📊', description: 'Cross-encoder reranker' },
      { label: 'Generate', icon: '✨', description: 'GPT-4 + citation grounding' },
    ],
    github: 'https://github.com/YashpalSingh1234/enterprise-rag',
    demo: '#',
    featured: true,
  },
  {
    id: 'llm-app',
    title: 'AI Code Review Assistant',
    description: 'LLM-powered code analysis tool integrated into CI/CD pipelines, reducing review cycles by 40%.',
    longDescription:
      'Production LLM application using structured output + tool calling to analyse GitHub PRs, detect bugs, suggest improvements, and enforce style guides automatically in CI/CD.',
    image: '/projects/llm-app.svg',
    tags: ['LLM', 'OpenAI', 'Tool Calling', 'GitHub Actions', 'FastAPI'],
    dataset: 'Internal codebase + 500K GitHub PRs (CodeSearchNet)',
    model: 'GPT-4o with tool calling + Llama-3 fine-tune for code classification',
    evaluation: 'Bug detection precision: 87% | False positive rate: 4.2%',
    deployment: 'GitHub Actions integration + FastAPI service on Fly.io',
    challenges: [
      'Long code context windows required intelligent file diffing + chunking strategy',
      'False positives frustrated developers; calibrated confidence thresholds per rule category',
      'Latency in CI required async streaming + incremental result display',
    ],
    results: [
      '87% bug detection precision',
      '40% reduction in review cycles',
      '4.2% false positive rate',
      'Adopted by 3 internal teams (50+ engineers)',
    ],
    metrics: [
      { label: 'Bug Detection', value: '87%', delta: 'precision', positive: true },
      { label: 'False Positives', value: '4.2%', positive: true },
      { label: 'Review Cycle', value: '-40%', positive: true },
      { label: 'Engineers Using', value: '50+', positive: true },
    ],
    architecture: [
      { label: 'PR Trigger', icon: '🔔', description: 'GitHub webhook → Actions' },
      { label: 'Diff Analysis', icon: '📝', description: 'Smart diff + context extraction' },
      { label: 'LLM Reasoning', icon: '🧠', description: 'GPT-4o + tool calling' },
      { label: 'Structured Output', icon: '📋', description: 'JSON schema enforcement' },
      { label: 'PR Comment', icon: '💬', description: 'Annotated inline feedback' },
    ],
    github: 'https://github.com/YashpalSingh1234/ai-code-review',
    demo: '#',
    featured: true,
  },
  {
    id: 'mlops-platform',
    title: 'End-to-End ML Deployment Platform',
    description: 'MLOps infrastructure cutting deployment time from 3 days to 45 minutes.',
    longDescription:
      'Full MLOps platform: DVC pipelines, MLflow registry, automated FastAPI serving, canary deployments on AWS ECS, and Grafana observability. Used across 5 production models.',
    image: '/projects/mlops.svg',
    tags: ['MLOps', 'MLflow', 'DVC', 'Docker', 'AWS ECS', 'GitHub Actions'],
    dataset: 'Internal model artifacts (5 production models)',
    model: 'Model-agnostic serving layer (scikit-learn, PyTorch, XGBoost)',
    evaluation: 'Deployment SLA: 45 min | Uptime: 99.8% | Rollback time: <2 min',
    deployment: 'AWS ECS + ALB, canary deployments via GitHub Actions',
    challenges: [
      'Different model types needed unified serving abstraction without framework lock-in',
      'No-downtime deployments required canary + blue-green hybrid strategy',
      'Data drift detection needed custom statistical tests for tabular + embedding data',
    ],
    results: [
      'Deployment time: 3 days → 45 minutes',
      '99.8% uptime across all production models',
      '<2 min rollback time',
      '3x more model iterations per sprint',
    ],
    metrics: [
      { label: 'Deploy Time', value: '45 min', delta: 'from 3 days', positive: true },
      { label: 'Uptime', value: '99.8%', positive: true },
      { label: 'Rollback Time', value: '<2 min', positive: true },
      { label: 'Sprint Velocity', value: '3×', delta: 'model iterations', positive: true },
    ],
    architecture: [
      { label: 'Train', icon: '🏋️', description: 'DVC + Python pipeline' },
      { label: 'Track', icon: '📈', description: 'MLflow experiments + registry' },
      { label: 'Package', icon: '📦', description: 'Docker multi-stage build' },
      { label: 'Deploy', icon: '🚢', description: 'AWS ECS canary deployment' },
      { label: 'Monitor', icon: '👁️', description: 'Grafana + data drift alerts' },
    ],
    github: 'https://github.com/YashpalSingh1234/mlops-platform',
    demo: '#',
    featured: true,
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
