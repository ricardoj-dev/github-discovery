import React, { useState } from "react";
import TopicsContext from "../TopicsContext";
import { TopicItem } from "@/types";

type TopicsContextProvider = {
  children: React.ReactNode;
};

export default function TopicsContextProvider({
  children,
}: TopicsContextProvider) {
  const [topics, setTopics] = useState<TopicItem[]>([
    { name: "Vue", isActive: false },
    { name: "TypeScript", isActive: false },
    { name: "Javascript", isActive: false },
    { name: "Go", isActive: false },
    { name: "CSS", isActive: false },
    { name: "Node", isActive: false },
  ]);

  const toggleTopic = (topicToToggle: TopicItem) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.name.toLowerCase() === topicToToggle.name.toLowerCase()
          ? { ...topic, isActive: !topic.isActive }
          : topic
      )
    );
  };

  return (
    <TopicsContext.Provider
      value={{
        topics,
        toggleTopic,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
}
