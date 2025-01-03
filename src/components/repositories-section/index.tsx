import { Topic } from '@/types';
import RepositoryList from './RepositoryList';
import SectionItem from './SectionItem';
import TopicHeader from './TopicHeader';
import InformationMessage from '../ui/InformationMessage';
import useRepositoriesStore from '@/stores/repositoriesStore';
import useTopicsStore from '@/stores/topicsStore';
import { useMemo } from 'react';

const RepositoriesSection = () => {
  const repositoriesFromTopics = useRepositoriesStore(
    (state) => state.repositoriesFromTopics
  );
  const loadingRepositoriesFromTopics = useRepositoriesStore(
    (state) => state.loadingRepositoriesFromTopics
  );
  const topics = useTopicsStore((state) => state.topics);

  const activeTopics = useMemo(
    () => topics.filter((topic) => topic.isActive).map((t) => t.name),
    [topics]
  );

  return (
    <section id="repositories">
      {activeTopics.map((topic) => (
        <SectionItem key={topic}>
          <TopicHeader topic={topic as Topic} />

          {loadingRepositoriesFromTopics[topic as Topic] ? (
            <InformationMessage message={`Loading ${topic} repositories...`} />
          ) : repositoriesFromTopics[topic as Topic]?.length ? (
            <RepositoryList
              repositories={repositoriesFromTopics[topic as Topic]}
            />
          ) : (
            <InformationMessage message={`No ${topic} repositories to show`} />
          )}
        </SectionItem>
      ))}
    </section>
  );
};

export default RepositoriesSection;
