export interface Blog {
  _id?: string;
  title: string;
  content: string;
  author: string;
  language: string;
  translatedContent?: string;
  createdAt?: string;
}