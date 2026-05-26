export const CACHE_TAGS = {
  POSTS: "posts",
  postById: (id: number | string) => `post-${id}`,
  postClaps: (id: number | string) => `post-claps-${id}`,
} as const;
