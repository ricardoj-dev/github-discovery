import RepositoriesSection from "@/components/repositories-section";
import BookmarksSection from "../components/bookmarks-section";
import TopicsSection from "../components/topics-section";
import { useRepositoriesContext } from "@/lib/hooks";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function DiscoveryPage() {
  const { isGlobalLoading } = useRepositoriesContext();
  return (
    <div className="flex flex-col justify-start min-h-screen bg-gray-100">
      {isGlobalLoading && (
        <LoadingSpinner
          classesContainer="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 z-50"
          classesSpinner="border-black"
        />
      )}
      <BookmarksSection />
      <TopicsSection />
      <RepositoriesSection />
    </div>
  );
}
