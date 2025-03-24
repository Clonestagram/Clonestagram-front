import { useInfiniteQuery } from '@tanstack/react-query';
import { FeedData } from '../data/feedData';
import { mockFetchFeeds } from '../mocks/mockFeedApi';
import { QueryFunctionContext } from '@tanstack/react-query';

export const useFeedQuery = () => {
  return useInfiniteQuery<FeedData[], Error>({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }: QueryFunctionContext) => {
      return mockFetchFeeds((pageParam as number) ?? 0, 100);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 100) return undefined;
      return allPages.flat().length;
    },
  });
};
