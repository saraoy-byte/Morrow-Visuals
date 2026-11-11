export type ProjectCategory =
  | 'ALL'
  | 'AI CINEMATIC TRAILERS'
  | 'COMMERCIALS & BRAND FILMS'
  | 'AI FILMMAKING & STORYTELLING'
  | 'COMMERCIAL PRODUCT ADS'
  | 'VIDEO EDITING';

export interface KeyFrame {
  timecode: string;
  title: string;
  desc: string;
  visualColor?: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  brand: string;
  campaign: string;
  category: ProjectCategory;
  year: string;
  type: string;
  tagline: string;
  description: string;
  concept: string;
  creativeDirection: string;
  sequenceConcept?: string;
  role: string;
  tools: string[];
  thumbnail: string;
  heroMedia: string;
  videoUrl?: string;
  aspectRatio: '16:9' | '9:16' | '4:3' | '2.39:1';
  featured: boolean;
  accentTone: string;
  specs: {
    duration: string;
    resolution: string;
    fps: string;
    colorSpace: string;
    audio: string;
  };
  keyFrames: KeyFrame[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  bgAccent: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  headline: string;
  description: string;
  details: string[];
}
