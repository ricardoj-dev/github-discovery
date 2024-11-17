import { User } from "firebase/auth";
export interface Repository {
  id: string;
  full_name: string;
  description: string;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  is_bookmarked?: boolean;
}

export interface ApplicationUser extends User {
  username: string;
  bookmarks?: Repository[];
  topics?: TopicItem[];
  sortOptions?: SortOptionsMap;
}

export type Topic = "Vue" | "TypeScript" | "Javascript" | "Go" | "CSS" | "Node";

export type SortOption = "stars" | "forks" | "interactions" | "updated";

export type FetchRepositoriesResponse = {
  data: {
    items: Repository[];
  };
  rateLimitRemaining: string | null;
  rateLimitReset: string | null;
};

export interface TopicItem {
  name: Topic;
  isActive: boolean;
}

export interface RepositoriesMap {
  [topic: string]: Repository[];
}

export interface LoadingRepositoriesFromTopicsMap {
  [topic: string]: boolean;
}

export interface SortOptionsMap {
  [topic: string]: SortOption;
}

export interface SortOptionsListMap {
  [key: string]: string;
}
