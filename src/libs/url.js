export const urls = {
  media: {
    list: "/media",
    detail: "/media/:id",
    people: "/media/:id/people",
    episodes: "/media/:id/episodes",
    reviews: "/media/:id/reviews",
    userStatus: "/media/:id/user-status",
  },
  auth: {
    login: "/login",
    signup: "/user",
  },
  search: {
    base: "/search",
    media: "/search/media",
    people: "/search/people",
  },
  playlist: {
    userplaylists: "/playlist/user/:id",
  },
  user: {
    details: "/user/:username",
    reviews: "/user/:id/reviews",
  },
  review: {
    base: "/review/:mediaId"
  },
  searchHistory: {
    base: "/search-history"
  },
  watchedList: {
    base: "/user/:id/watch-history",
    delete: "/user/:id/watch-history/:mediaId",
  },
  people: {
    base: "/people",
    detail: "/people/:id",
    media: "/people/:id/media"
  },
};
