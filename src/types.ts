export type Repository = {
  id: string;
  full_name: string;
  description: string;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  is_bookmarked?: boolean;
};

export type Topic = "Vue" | "TypeScript" | "Javascript" | "Go" | "CSS" | "Node";

export type SortOption = "stars" | "forks" | "interactions" | "updated";

export type TopicItem = {
  name: Topic;
  isActive: boolean;
};

export type RepositoriesMap = {
  [topic in Topic]?: Repository[];
};

export type LoadingRepositoriesFromTopicsMap = {
  [key in Topic]?: boolean;
};

export type SortOptionsMap = {
  [key in Topic]?: SortOption;
};

export type SortOptionsListMap = {
  [key in SortOption]?: string;
};
