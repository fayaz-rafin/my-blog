import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to calculate read time from markdown content
export const calculateReadTime = (markdownContent: string): number => {
  // Remove markdown images and links to avoid counting URLs/alt text as words
  const textOnly = markdownContent.replace(/!\[.*?\]\(.*?\)/g, '').replace(/\[.*?\]\(.*?\)/g, '');
  // Basic word count (split by space)
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 238; // Average reading speed
  return Math.ceil(wordCount / wordsPerMinute);
};
