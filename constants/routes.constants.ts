export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  POSTS: "/posts",
  NEW_POST: "/posts/new",
  VIEW_POST: (id: string) => `/posts/${id}`,
};

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.POSTS,
];
