import React, { useState } from "react";
import TopicsContext from "../TopicsContext";
import { TopicItem } from "@/types";
import { useAuth } from "@/lib/hooks";
import firestoreClient from "@/lib/clients/firestore-client";
import appConstants from "@/lib/constants";

type TopicsContextProvider = {
  children: React.ReactNode;
};

export default function TopicsContextProvider({
  children,
}: TopicsContextProvider) {
  const { user } = useAuth();

  const [topics, setTopics] = useState<TopicItem[]>(
    user?.topics || appConstants.initialTopics
  );

  const toggleTopic = async (topicToToggle: TopicItem) => {
    const updatedTopics = topics.map((topic) =>
      topic.name.toLowerCase() === topicToToggle.name.toLowerCase()
        ? { ...topic, isActive: !topic.isActive }
        : topic
    );

    setTopics(updatedTopics);

    if (user) {
      try {
        await firestoreClient.setUserTopics(user.uid, updatedTopics);
      } catch (error) {
        console.error("Failed to update topics in Firestore: ", error);
      }
    }
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
