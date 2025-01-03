import RepositoriesSection from '@/components/repositories-section';
import BookmarksSection from '@/components/bookmarks-section';
import TopicsSection from '@/components/topics-section';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useRepositoriesStore from '@/stores/repositoriesStore';
import useAuthStore from '@/stores/authStore';
import { useEffect } from 'react';

export default function DiscoveryPage() {
  const isRepositoriesLoading = useRepositoriesStore(
    (state) => state.isRepositoriesLoading
  );
  const initializeRepositories = useRepositoriesStore(
    (state) => state.initializeRepositories
  );
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      initializeRepositories();
    }
  }, [user, initializeRepositories]);

  return (
    <div className="flex flex-col justify-start">
      {isRepositoriesLoading && (
        <LoadingSpinner variant="overlay" size="large" />
      )}
      <BookmarksSection />
      <TopicsSection />
      <RepositoriesSection />
    </div>
  );
}
