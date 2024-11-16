import { TopicItem } from "@/types";
import { createContext } from "react";

type TopicsContextType = {
  topics: TopicItem[];
  toggleTopic: (topicToToggle: TopicItem) => void;
};

const TopicsContext = createContext<TopicsContextType | null>(null);

export default TopicsContext;
