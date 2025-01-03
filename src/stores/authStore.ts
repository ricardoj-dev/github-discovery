import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ApplicationUser } from '@/types';
import appConstants from '@/lib/constants';
import useTopicsStore from './topicsStore';
import useRepositoriesStore from './repositoriesStore';
import useBookmarksStore from './bookmarksStore';

type AuthStore = {
  user: ApplicationUser | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  signOut: () => void;
  setUser: (user: ApplicationUser | null) => void;
  setLoading: (isLoading: boolean) => void;
};

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoadingUser: false,

        setUser: (user) => {
          // Update user state and authentication status
          set(() => ({
            user,
            isAuthenticated: !!user,
            isLoadingUser: false,
          }));

          if (user) {
            // Sync topics with the user's preferences or reset to default if absent
            useTopicsStore
              .getState()
              .setTopics(user.topics || appConstants.initialTopics);

            // Sync repository sort options with the user's preferences
            useRepositoriesStore
              .getState()
              .setSortOptions(user.sortOptions || {});

            // Update bookmarks from the user's preferences
            useBookmarksStore.getState().setBookmarks(user.bookmarks || []);

            // Fetch repositories for active topics
            const activeTopics = (user.topics || [])
              .filter((topic) => topic.isActive) // Filter only active topics
              .map((t) => t.name); // Extract topic name

            if (activeTopics.length > 0) {
              const { fetchRepositoriesBySortOption, sortOptions } =
                useRepositoriesStore.getState();

              // Fetch repositories for the active topics and user-defined sort options
              fetchRepositoriesBySortOption(activeTopics, sortOptions);
            }
          }
        },

        setLoading: (isLoading) =>
          // Update the user loading state
          set(() => ({
            isLoadingUser: isLoading,
          })),

        signOut: () => {
          // Clear user state and authentication status
          set(() => ({
            user: null,
            isAuthenticated: false,
            isLoadingUser: false,
          }));

          // Reset topics to the application's default state
          useTopicsStore.getState().setTopics(appConstants.initialTopics);
        },
      }),
      {
        name: 'auth-local-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          isLoadingUser: state.isLoadingUser,
        }),
      }
    )
  )
);

export default useAuthStore;
