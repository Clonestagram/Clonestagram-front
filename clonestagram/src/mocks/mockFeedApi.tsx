import feedData from '../data/feedData';

export const mockFetchFeeds = async (offset = 0, limit = 100) => {
  console.log(`[Mock API] Fetching feeds from ${offset} to ${offset + limit}`);
  
  // 네트워크 지연 시뮬레이션
  await new Promise((res) => setTimeout(res, 500));

  return feedData.slice(offset, offset + limit);
};
