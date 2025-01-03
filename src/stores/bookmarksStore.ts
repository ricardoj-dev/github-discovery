import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Repository } from '@/types';
import useAuthStore from './authStore';
import firestoreClient from '@/lib/clients/firestore-client';
import useRepositoriesStore from './repositoriesStore';

type BookmarksStore = {
  bookmarks: Repository[];
  isBookmarksLoading: boolean;
  toggleBookmark: (repository: Repository) => void;
  setBookmarks: (bookmarks: Repository[]) => void;
};

const useBookmarksStore = create<BookmarksStore>()(
  devtools(
    persist(
      (set, get) => ({
        bookmarks: [],
        isBookmarksLoading: false,

        toggleBookmark: async (repository) => {
          // Check if the repository is already bookmarked
          const isBookmarked = get().bookmarks.some(
            (item) => item.id === repository.id
          );

          // Update bookmarks locally
          const updatedBookmarks = isBookmarked
            ? get().bookmarks.filter((item) => item.id !== repository.id)
            : [...get().bookmarks, { ...repository, is_bookmarked: true }];

          // Set loading state for bookmark operation
          set({ isBookmarksLoading: true });

          try {
            // Update bookmarks in the store
            set(() => ({ bookmarks: updatedBookmarks }));

            const { user } = useAuthStore.getState();
            if (user) {
              // Persist updated bookmarks to Firestore
              await firestoreClient.setUserBookmarks(
                user.uid,
                updatedBookmarks
              );
            }

            // Update bookmark state in repositories
            const repositoriesFromTopics =
              useRepositoriesStore.getState().repositoriesFromTopics;

            const updatedRepositories = { ...repositoriesFromTopics };

            Object.keys(updatedRepositories).forEach((topic) => {
              updatedRepositories[topic] = updatedRepositories[topic]?.map(
                (repo) => {
                  if (repo.id === repository.id) {
                    // Update bookmark state for the specific repository
                    return { ...repo, is_bookmarked: !isBookmarked };
                  }

                  return repo;
                }
              );
            });

            // Save updated repositories to the store
            useRepositoriesStore
              .getState()
              .setRepositoriesFromTopics(updatedRepositories);
          } catch (error) {
            // Handle errors during the bookmark update process
            console.error('Failed to update bookmarks: ', error);
          } finally {
            // Reset loading state
            set({ isBookmarksLoading: false });
          }
        },

        setBookmarks: (bookmarks) => set({ bookmarks }),
      }),
      {
        name: 'bookmarks-local-storage',
        partialize: (state) => ({ bookmarks: state.bookmarks }),
      }
    )
  )
);

export default useBookmarksStore;
