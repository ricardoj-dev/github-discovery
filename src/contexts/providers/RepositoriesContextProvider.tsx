import { useAuth, useTopicsContext } from "@/lib/hooks";
import React, { useEffect, useMemo, useState } from "react";
import RepositoriesContext from "../RepositoriesContext";
import gitHubApiClient from "@/lib/clients/github-api-client";
import {
  LoadingRepositoriesFromTopicsMap,
  RepositoriesMap,
  SortOption,
  SortOptionsMap,
  Topic,
} from "@/types";
import { delay } from "@/lib/utils";
import firestoreClient from "@/lib/clients/firestore-client";

type RepositoriesContextProvider = {
  children: React.ReactNode;
};

export default function RepositoriesContextProvider({
  children,
}: RepositoriesContextProvider) {
  const { user } = useAuth();
  const { topics } = useTopicsContext();

  const [repositoriesFromTopics, setRepositoriesFromTopics] =
    useState<RepositoriesMap>({});
  const [loadingRepositoriesFromTopics, setLoadingRepositoriesFromTopics] =
    useState<LoadingRepositoriesFromTopicsMap>({});

  const [sortOptions, setSortOptions] = useState<SortOptionsMap>(
    user?.sortOptions || {}
  );

  const activeTopics = useMemo(
    () => topics.filter((topic) => topic.isActive),
    [topics]
  );

  useEffect(() => {
    const fetchRepositories = async () => {
      for (let i = 0; i < activeTopics.length; i++) {
        const topic = activeTopics[i];

        if (!(topic.name in repositoriesFromTopics)) {
          setLoadingRepositoriesFromTopics((prev) => ({
            ...prev,
            [topic.name]: true,
          }));

          try {
            const { data, rateLimitRemaining, rateLimitReset } =
              await gitHubApiClient.fetchRepositoriesWithCache(
                topic.name,
                sortOptions[topic.name]
              );
            setRepositoriesFromTopics((prev) => ({
              ...prev,
              [topic.name]: data.items,
            }));

            if (rateLimitRemaining && parseInt(rateLimitRemaining) <= 1) {
              const resetTime = new Date(
                parseInt(rateLimitReset || "0") * 1000
              );
              const currentTime = new Date();
              const waitTime = resetTime.getTime() - currentTime.getTime();
              console.warn(`Rate limit reached, waiting until ${resetTime}`);
              await delay(waitTime);
            }
          } catch (error) {
            console.error("Error fetching repositories:", error);
          } finally {
            setLoadingRepositoriesFromTopics((prev) => ({
              ...prev,
              [topic.name]: false,
            }));
          }
        }
      }
    };

    fetchRepositories();
  }, [activeTopics, repositoriesFromTopics, sortOptions]);

  const fetchRepositoriesBySortOption = async (
    topic: Topic,
    sortOption: SortOption
  ) => {
    setLoadingRepositoriesFromTopics((prev) => ({
      ...prev,
      [topic]: true,
    }));

    setSortOptions((prev) => {
      const updatedSortOptions = {
        ...prev,
        [topic]: sortOption,
      };

      if (user) {
        firestoreClient.setUserSortOptions(user.uid, updatedSortOptions);
      }

      return updatedSortOptions;
    });

    try {
      const { data } = await gitHubApiClient.fetchRepositoriesWithCache(
        topic,
        sortOption
      );
      setRepositoriesFromTopics((prev) => ({
        ...prev,
        [topic]: data.items,
      }));
    } catch (error) {
      console.error("Error fetching sorted repositories:", error);
    } finally {
      setLoadingRepositoriesFromTopics((prev) => ({
        ...prev,
        [topic]: false,
      }));
    }
  };

  const isGlobalLoading = useMemo(
    () =>
      Object.values(loadingRepositoriesFromTopics).some(
        (isLoading) => isLoading
      ),
    [loadingRepositoriesFromTopics]
  );

  return (
    <RepositoriesContext.Provider
      value={{
        repositoriesFromTopics,
        loadingRepositoriesFromTopics,
        setRepositoriesFromTopics,
        sortOptions,
        fetchRepositoriesBySortOption,
        isGlobalLoading,
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  );
}
