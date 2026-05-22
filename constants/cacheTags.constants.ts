export const CACHE_TAGS = {
  POSTS: "posts",
  postById: (id: number | string) => `post-${id}`,
} as const;
