import {
  LoadingRepositoriesFromTopicsMap,
  RepositoriesMap,
  SortOption,
  SortOptionsMap,
  Topic,
} from "@/types";
import { createContext } from "react";

type RepositoriesContextType = {
  repositoriesFromTopics: RepositoriesMap;
  loadingRepositoriesFromTopics: LoadingRepositoriesFromTopicsMap;
  setRepositoriesFromTopics: React.Dispatch<
    React.SetStateAction<RepositoriesMap>
  >;
  sortOptions: SortOptionsMap;
  fetchRepositoriesBySortOption: (topic: Topic, sortOption: SortOption) => void;
  isGlobalLoading?: boolean;
};

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export default RepositoriesContext;
