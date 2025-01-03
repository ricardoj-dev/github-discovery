import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import gitHubApiClient from '@/lib/clients/github-api-client';
import {
  LoadingRepositoriesFromTopicsMap,
  RepositoriesMap,
  SortOption,
  SortOptionsMap,
  Topic,
  TopicItem,
} from '@/types';
import useTopicsStore from './topicsStore';

type RepositoriesStore = {
  repositoriesFromTopics: RepositoriesMap;
  loadingRepositoriesFromTopics: LoadingRepositoriesFromTopicsMap;
  sortOptions: SortOptionsMap;
  isRepositoriesLoading: boolean;

  setRepositoriesFromTopics: (repositories: RepositoriesMap) => void;
  setLoadingRepositoriesFromTopics: (
    loadingMap: LoadingRepositoriesFromTopicsMap
  ) => void;
  setSortOptions: (sortOptions: SortOptionsMap) => void;

  fetchRepositories: (activeTopics: TopicItem[]) => void;
  fetchRepositoriesBySortOption: (
    topics: Topic[] | Topic,
    sortOptions: SortOption | SortOptionsMap
  ) => Promise<void>;

  clearInactiveRepositories: (activeTopics: TopicItem[]) => void;
  initializeRepositories: () => void;
};

const useRepositoriesStore = create<RepositoriesStore>()(
  devtools((set, get) => ({
    repositoriesFromTopics: {},
    loadingRepositoriesFromTopics: {},
    sortOptions: {},
    isRepositoriesLoading: false,

    setRepositoriesFromTopics: (repositories: RepositoriesMap) =>
      set(() => ({ repositoriesFromTopics: repositories })),

    setLoadingRepositoriesFromTopics: (
      loadingMap: LoadingRepositoriesFromTopicsMap
    ) => set(() => ({ loadingRepositoriesFromTopics: loadingMap })),

    setSortOptions: (sortOptions) => set(() => ({ sortOptions })),

    // Fetch repositories for active topics
    fetchRepositories: async (activeTopics: TopicItem[]) => {
      // Set global loading state
      set(() => ({ isRepositoriesLoading: true }));

      try {
        const { repositoriesFromTopics, sortOptions } = get();

        // Loop through each active topic and fetch repositories if needed
        for (const topic of activeTopics) {
          // Skip fetching if repositories for this topic are already loaded
          if (!(topic.name in repositoriesFromTopics)) {
            // Set per-topic loading state
            set((state) => ({
              loadingRepositoriesFromTopics: {
                ...state.loadingRepositoriesFromTopics,
                [topic.name]: true,
              },
            }));

            // Make API call to fetch repositories for the topic
            const { data } = await gitHubApiClient.fetchRepositoriesWithCache(
              topic.name,
              sortOptions[topic.name]
            );

            // Update state with fetched repositories for the topic
            set((state) => ({
              repositoriesFromTopics: {
                ...state.repositoriesFromTopics,
                [topic.name]: data.items,
              },
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching repositories: ', error);
      } finally {
        // Reset all loading states
        set(() => ({
          isRepositoriesLoading: false,
          loadingRepositoriesFromTopics: {},
        }));
      }
    },

    // Fetch repositories for the provided topics with the specified sort options
    fetchRepositoriesBySortOption: async (
      topics: Topic[] | Topic,
      sortOptions: SortOption | SortOptionsMap
    ) => {
      // Normalize topics and sort options into arrays and maps for consistent handling
      const topicList = Array.isArray(topics) ? topics : [topics];
      const sortOptionMap =
        typeof sortOptions === 'string'
          ? Object.fromEntries(topicList.map((topic) => [topic, sortOptions]))
          : sortOptions;

      // Iterate over each topic and fetch repositories
      for (const topic of topicList) {
        // Set per-topic loading state to true
        set((state) => ({
          loadingRepositoriesFromTopics: {
            ...state.loadingRepositoriesFromTopics,
            [topic]: true,
          },
        }));

        try {
          // Fetch repositories for the current topic using cached API calls
          const { data } = await gitHubApiClient.fetchRepositoriesWithCache(
            topic,
            sortOptionMap[topic]
          );

          // Update global state with fetched repositories and applied sort options
          set((state) => ({
            repositoriesFromTopics: {
              ...state.repositoriesFromTopics,
              [topic]: data.items,
            },
            sortOptions: {
              ...state.sortOptions,
              [topic]: sortOptionMap[topic],
            },
          }));
        } catch (error) {
          console.error(
            `Error fetching repositories for topic ${topic}: `,
            error
          );
        } finally {
          // Reset per-topic loading state to false
          set((state) => ({
            loadingRepositoriesFromTopics: {
              ...state.loadingRepositoriesFromTopics,
              [topic]: false,
            },
          }));
        }
      }
    },

    // Clear repositories for inactive topics
    clearInactiveRepositories: (activeTopics: TopicItem[]) => {
      const state = get();
      const activeTopicNames = activeTopics.map((topic) => topic.name);

      // Filter out repositories for inactive topics
      set(() => ({
        repositoriesFromTopics: Object.fromEntries(
          Object.entries(state.repositoriesFromTopics).filter(([topic]) =>
            activeTopicNames.includes(topic as Topic)
          )
        ),
      }));
    },

    // Initialize repositories for active topics
    initializeRepositories: async () => {
      const { topics } = useTopicsStore.getState();
      const { fetchRepositoriesBySortOption, sortOptions } = get();

      // Extract names of active topics
      const activeTopics = topics
        .filter((topic) => topic.isActive)
        .map((t) => t.name);

      if (activeTopics.length > 0) {
        // Mark repositories as loading for all active topics
        set(() => ({
          isRepositoriesLoading: true,
          loadingRepositoriesFromTopics: Object.fromEntries(
            activeTopics.map((topic) => [topic, true])
          ),
        }));

        try {
          // Fetch repositories for all active topics with their sort options
          await fetchRepositoriesBySortOption(activeTopics, sortOptions);

          // Mark loading as complete for all active topics
          set(() => ({
            isRepositoriesLoading: false,
            loadingRepositoriesFromTopics: Object.fromEntries(
              activeTopics.map((topic) => [topic, false])
            ),
          }));
        } catch (error) {
          console.error('Error initializing repositories:', error);

          // Reset loading state globally in case of an error
          set(() => ({
            isRepositoriesLoading: false,
            loadingRepositoriesFromTopics: {},
          }));
        }
      } else {
        // No active topics, clear loading states
        set(() => ({
          isRepositoriesLoading: false,
          loadingRepositoriesFromTopics: {},
        }));
      }
    },
  }))
);

export default useRepositoriesStore;
