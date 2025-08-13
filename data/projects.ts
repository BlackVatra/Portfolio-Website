// data/projects.ts
export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Project 1",
    description: "A cool project",
    image: "/path/to/image1.jpg",
    link: "https://example.com/project1",
  },
  {
    id: 2,
    name: "Project 2",
    description: "Another awesome project",
    image: "/path/to/image2.jpg",
    link: "https://example.com/project2",
  },
];