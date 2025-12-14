export const urls = {
  media: {
    list: "/media",
    detail: "/media/:id",
    people: "/media/:id/people",
    episodes: "/media/:id/episodes",
    reviews: "/media/:id/reviews",
  },
  auth: {
    login: "/login",
    signup: "/user",
  },
  search: {
    media: "/search/media",
    people: "/search/people",
  },
  playlist: {
    userplaylists: "/playlist/user/:id",
  },
  user: {
    details: "/user/:username",
  },
};
