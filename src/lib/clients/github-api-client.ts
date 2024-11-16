import { SortOption, Topic } from "@/types";
import appConstants from "../constants";
import { handleError } from "../utils";

async function fetchRepositories(topic: Topic, sort?: SortOption) {
  let url = `${appConstants.GIT_HUB_API_URL}?q=language%3A${topic}`;

  if (sort) {
    url += `&sort=${sort}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    handleError(new Error("Network response was not ok"));
  }

  const data = await response.json();

  return data;
}

const gitHubApiClient = {
  fetchRepositories,
};

export default gitHubApiClient;
