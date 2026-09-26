export type SlideId = 'hero' | 'about' | 'disciplines-1' | 'disciplines-2' | 'contact';

export interface SlideItem {
  id: SlideId;
  index: number;
  title: string;
  category: string;
  thumbnailLabel: string;
}

export interface DisciplineItem {
  id: string;
  disciplineNumber: string;
  location: string;
  title: string;
  subtitle: string;
  description: string;
  specs: {
    capacity: string;
    coach: string;
    systemFeature: string;
  };
  accentPalette: string;
  primaryImage: string;
  secondaryImage: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  goal: string;
  message: string;
}
