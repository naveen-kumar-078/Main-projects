export interface StudentData {
  name: string;
  referenceId: string;
  course: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}
