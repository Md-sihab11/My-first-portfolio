export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  current: boolean;
  order: number;
  visible: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  board?: string;
  group?: string;
  gpa?: string;
  description?: string;
  order?: number;
  visible?: boolean;
}
