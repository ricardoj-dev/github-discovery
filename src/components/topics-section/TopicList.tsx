import { Button } from '@/components/ui/button';
import { TopicItem } from '@/types';
import Carousel from '../ui/carousel';
import useTopicsStore from '@/stores/topicsStore';

const TopicList = () => {
  const topics = useTopicsStore((state) => state.topics);
  const toggleTopic = useTopicsStore((state) => state.toggleTopic);

  return (
    <Carousel>
      <>
        {topics.map((topic: TopicItem) => (
          <Button
            key={topic.name}
            onClick={() => toggleTopic(topic)}
            variant={topic.isActive ? 'selectedPill' : 'pill'}
          >
            {topic.name}
          </Button>
        ))}
      </>
    </Carousel>
  );
};

export default TopicList;
