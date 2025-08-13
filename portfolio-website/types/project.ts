// types/project.ts
export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    tags: string[];
    thumbnail: string;
    images: string[];
    figmaUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    year: number;
  }