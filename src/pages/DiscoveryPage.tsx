import RepositoriesSection from '@/components/repositories-section';
import BookmarksSection from '@/components/bookmarks-section';
import TopicsSection from '@/components/topics-section';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRepositoriesContext } from '@/lib/hooks';

export default function DiscoveryPage() {
  const { isGlobalLoading } = useRepositoriesContext();

  return (
    <div className="flex flex-col justify-start">
      {isGlobalLoading && <LoadingSpinner variant="overlay" size="large" />}
      <BookmarksSection />
      <TopicsSection />
      <RepositoriesSection />
    </div>
  );
}
