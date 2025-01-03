import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TopicItem } from '@/types';
import useAuthStore from './authStore';
import firestoreClient from '@/lib/clients/firestore-client';
import appConstants from '@/lib/constants';
import useRepositoriesStore from './repositoriesStore';

type TopicsStore = {
  topics: TopicItem[];
  toggleTopic: (topicToToggle: TopicItem) => void;
  setTopics: (topics: TopicItem[]) => void;
};

const useTopicsStore = create<TopicsStore>()(
  devtools(
    persist(
      (set, get) => ({
        topics: appConstants.initialTopics,

        toggleTopic: async (topicToToggle) => {
          // Retrieve current topics from the store
          const { topics } = get();

          // Toggle the `isActive` state of the selected topic
          const updatedTopics = topics.map((topic) =>
            topic.name.toLowerCase() === topicToToggle.name.toLowerCase()
              ? { ...topic, isActive: !topic.isActive }
              : topic
          );

          // Update the store with the modified topics
          set({ topics: updatedTopics });

          // Filter active topics to determine which repositories to fetch
          const activeTopics = updatedTopics.filter((topic) => topic.isActive);

          // Fetch repositories for the newly active topics
          useRepositoriesStore.getState().fetchRepositories(activeTopics);

          // Clear repositories for topics that are no longer active
          useRepositoriesStore
            .getState()
            .clearInactiveRepositories(activeTopics);

          // If a user is authenticated, persist the updated topics to Firestore
          const { user } = useAuthStore.getState();
          if (user) {
            try {
              await firestoreClient.setUserTopics(user.uid, updatedTopics);
            } catch (error) {
              console.error('Failed to update topics: ', error);
            }
          }
        },

        setTopics: (topics) => set({ topics }),
      }),
      {
        name: 'topics-local-storage',
        partialize: (state) => ({ topics: state.topics }),
      }
    )
  )
);

export default useTopicsStore;
