export type ProductStatus = 'On Track' | 'Delayed' | 'Completed' | 'Skipped' | 'Pending';

export type ProductSlug = 'lifeos' | 'cms';

export interface ProductPlan {
  slug: ProductSlug;
  name: string;
  status: ProductStatus;
  stage: string;
  summary: string;
  destination: string;
  progress: number;
  deadlineImpact: 'Low' | 'Medium' | 'High';
  nextDeadline: string;
  teamMembers: Array<{
    name: string;
    role: string;
    allocation: string;
  }>;
  frontendRoadmap: string[];
  backendRoadmap: string[];
  techUsed: string[];
  lastCommit: {
    hash: string;
    message: string;
    date: string;
  };
}

export const products: ProductPlan[] = [
  {
    slug: 'lifeos',
    name: 'LifeOS',
    status: 'On Track',
    stage: 'In Active Development',
    summary: 'Personal operating system for planning, tracking, and course correction.',
    destination: 'Become a complete life command center with AI-driven daily execution and weekly review loops.',
    progress: 72,
    deadlineImpact: 'Medium',
    nextDeadline: '18 Apr 2026',
    teamMembers: [
      { name: 'Aman', role: 'Frontend Developer', allocation: '40%' },
      { name: 'Piyush', role: 'Backend Learner (Building while learning)', allocation: '30%' },
      { name: 'Ronak', role: 'Backend Learner (Building while learning)', allocation: '30%' },
    ],
    frontendRoadmap: [
      'Finalize responsive shell patterns for all pages',
      'Add rich analytics widgets for life balance and trend insights',
      'Complete settings and personalization flows',
      'Integrate design tokens into reusable page-level components',
    ],
    backendRoadmap: [
      'Expose planning and activity APIs for daily timeline sync',
      'Add recommendation endpoint for course correction insights',
      'Implement audit logging for user activity events',
      'Add role-safe auth/session middleware for production readiness',
    ],
    techUsed: ['Next.js 16', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'KY', 'Zod'],
    lastCommit: {
      hash: 'a14f9d2',
      message: 'feat: modernize dashboard and portfolio information architecture',
      date: '12 Apr 2026',
    },
  },
  {
    slug: 'cms',
    name: 'Content Management System',
    status: 'On Track',
    stage: 'Sprint Execution',
    summary: 'Management platform for content operations, workflow, approvals, and publishing.',
    destination: 'Scale into a high-velocity multi-team content platform with quality guardrails and automation.',
    progress: 64,
    deadlineImpact: 'High',
    nextDeadline: '16 Apr 2026',
    teamMembers: [
      { name: 'Aman', role: 'Frontend Developer', allocation: '40%' },
      { name: 'Piyush', role: 'Backend Learner (Building while learning)', allocation: '30%' },
      { name: 'Ronak', role: 'Backend Learner (Building while learning)', allocation: '30%' },
    ],
    frontendRoadmap: [
      'Ship editorial dashboard with status filters and search',
      'Complete content editor with preview and validation states',
      'Implement review/approval timeline UI',
      'Create reusable form and table patterns for authoring flows',
    ],
    backendRoadmap: [
      'Finalize content versioning and publish workflows',
      'Build moderation and approval pipeline endpoints',
      'Add scheduled publishing and retry queues',
      'Implement activity/history endpoints for compliance tracking',
    ],
    techUsed: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Redis Queue'],
    lastCommit: {
      hash: 'c82be71',
      message: 'feat: add workflow status controls and approval events',
      date: '11 Apr 2026',
    },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
