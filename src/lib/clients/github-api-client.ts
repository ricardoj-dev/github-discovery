import {
  FetchRepositoriesResponse,
  Repository,
  SortOption,
  Topic,
} from '@/types';
import appConstants from '../constants';

async function fetchRepositories(
  topic: Topic,
  sort?: SortOption
): Promise<FetchRepositoriesResponse> {
  let url = `${appConstants.gitHubApiUrl}?q=language%3A${topic}`;

  if (sort) {
    url += `&sort=${sort}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${appConstants.gitHubAccessToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  return {
    data,
    rateLimitRemaining: response.headers.get('X-RateLimit-Remaining'),
    rateLimitReset: response.headers.get('X-RateLimit-Reset'),
  };
}

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_VALIDITY = 5 * 60 * 1000; // 5 minutes

async function fetchRepositoriesWithCache(
  topic: Topic,
  sort?: SortOption
): Promise<FetchRepositoriesResponse> {
  const cacheKey = `${topic}-${sort || 'default'}`;
  const now = Date.now();

  const cachedInMemory = cache.get(cacheKey);
  if (cachedInMemory && now - cachedInMemory.timestamp < CACHE_VALIDITY) {
    return {
      data: {
        items: cachedInMemory.data as Repository[],
      },
      rateLimitRemaining: null,
      rateLimitReset: null,
    };
  }

  const cachedItem = localStorage.getItem(cacheKey);
  if (cachedItem) {
    const parsedCache = JSON.parse(cachedItem);
    if (now - parsedCache.timestamp < CACHE_VALIDITY) {
      return {
        data: {
          items: parsedCache.items as Repository[],
        },
        rateLimitRemaining: null,
        rateLimitReset: null,
      };
    }
  }

  const response = await fetchRepositories(topic, sort);

  cache.set(cacheKey, { data: response.data.items, timestamp: now });

  localStorage.setItem(
    cacheKey,
    JSON.stringify({ items: response.data.items, timestamp: now })
  );

  return response;
}

const gitHubApiClient = {
  fetchRepositoriesWithCache,
};

export default gitHubApiClient;
