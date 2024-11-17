import { useRepositoriesContext } from "@/lib/hooks";
import { Topic } from "@/types";
import RepositoryList from "./RepositoryList";
import SectionItem from "./SectionItem";
import TopicOfRepositoryHeader from "./TopicOfRepositoryHeader";
import LoadingSpinner from "../LoadingSpinner";
import NoResultsMessage from "../NoResultsMessage";

const RepositoriesSection = () => {
  const { repositoriesFromTopics, loadingRepositoriesFromTopics } =
    useRepositoriesContext();

  return (
    <section>
      {Object.keys(repositoriesFromTopics).map((topic) => (
        <SectionItem key={topic}>
          <TopicOfRepositoryHeader topic={topic as Topic} />

          {loadingRepositoriesFromTopics[topic as Topic] && (
            <LoadingSpinner
              classesContainer="flex-grow"
              classesSpinner="w-12 h-12 border-black"
            />
          )}

          {!loadingRepositoriesFromTopics[topic as Topic] &&
            !repositoriesFromTopics[topic as Topic] && (
              <NoResultsMessage message={`No ${topic} repositories to show`} />
            )}

          {!loadingRepositoriesFromTopics[topic as Topic] &&
            repositoriesFromTopics[topic as Topic] && (
              <RepositoryList
                repositories={repositoriesFromTopics[topic as Topic]}
              />
            )}
        </SectionItem>
      ))}
    </section>
  );
};

export default RepositoriesSection;
