import { useTopicsContext } from "@/lib/hooks";
import Carousel from "../Carousel";
import { Button } from "../ui/button";
import { TopicItem } from "@/types";

const TopicList = () => {
  const { topics, toggleTopic } = useTopicsContext();

  return (
    <Carousel>
      <>
        {topics.map((topic: TopicItem) => (
          <Button
            key={topic.name}
            onClick={() => toggleTopic(topic)}
            variant={topic.isActive ? "selectedPill" : "pill"}
          >
            {topic.name}
          </Button>
        ))}
      </>
    </Carousel>
  );
};

export default TopicList;