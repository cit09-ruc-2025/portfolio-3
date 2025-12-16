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
    base: "/playlist",
    detail: "/playlist/:id",
    add: "/playlist/:playlistId/add",
    remove: "/playlist/:id/remove/:itemId",
    userplaylists: "/playlist/user/:userId",
  },
  user: {
    details: "/user/:username",
    reviews: "/user/:id/reviews",
  },
  review: {
    base: "/review/:mediaId",
  },
  searchHistory: {
    base: "/search-history",
  },
  watchedList: {
    base: "/user/:id/watch-history",
    delete: "/user/:id/watch-history/:mediaId",
  },
  favorite: {
    media: {
      base: "/user/:id/favorite-media",
      delete: "/user/:id/favorite-media/:itemId",
    },
    people: {
      base: "/user/:id/favorite-people",
      delete: "/user/:id/favorite-people/:itemId",
    },
  },
  people: {
    base: "/people",
    detail: "/people/:id",
    media: "/people/:id/media",
    userStatus: "/people/:id/user-status",
  },
  genre: {
    base: "/genre",
    genreMedia: "/genre/:genreName",
  },
};
