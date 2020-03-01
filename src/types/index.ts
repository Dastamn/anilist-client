export interface ApolloCache {
  featured: {
    __typename: "Featured";
    anime: IBanner[];
    manga: IBanner[];
  };
}

export type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL";
export type MediaSort =
  | "SCORE_DESC"
  | "TRENDING_DESC"
  | "POPULARITY_DESC"
  | "FAVOURITES_DESC";
export type MediaType = "ANIME" | "MANGA";
export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";

export type MediaCardSize = "SMALL" | "DEFAULT";

export type RelationType =
  | "ADAPTATION"
  | "PREQUEL"
  | "SEQUEL"
  | "PARENT"
  | "SIDE_STORY"
  | "CHARACTER"
  | "SUMMARY"
  | "ALTERNATIVE"
  | "SPIN_OFF"
  | "OTHER"
  | "SOURCE"
  | "COMPILATION"
  | "CONTAINS";

export type MediaSource =
  | "ORIGINAL"
  | "MANGA"
  | "LIGHT_NOVEL"
  | "VISUAL_NOVEL"
  | "VIDEO_GAME"
  | "OTHER"
  | "NOVEL"
  | "DOUJINSHI"
  | "ANIME";

export type MediaStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED";

export type MediaFormat =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";

export type DistributionStatus =
  | "CURRENT"
  | "PLANNING"
  | "COMPLETED"
  | "DROPPED"
  | "PAUSED"
  | "REPEATING";

export interface Ranking {
  type: "RATED" | "POPULAR";
  rank: number;
  allTime: boolean;
  season: string | null;
  year: string | null;
}

export interface CoverImage {
  medium: string;
  large: string;
  extraLarge: string;
}

export interface SortedMedia {
  id: number;
  type: string;
  bannerImage: string;
  title: {
    romaji: string;
  };
  coverImage: {
    extraLarge: string;
  };
}

export interface IBanner {
  id: number;
  title: string;
  bannerImage: string | undefined | null;
  coverImage: string;
  type: MediaType;
  categories: string[];
  comment?: string;
}

export interface IMediaBanner {
  id: number;
  type: MediaType;
  title: { romaji: string };
  bannerImage: string;
  coverImage: { extraLarge: string };
}

export interface IMediaCard {
  id: number;
  title: string;
  coverImage: string;
  bannerImage?: string;
  type: MediaType;
  format: MediaFormat;
  source: MediaSource;
  averageScore: number | null;
  genres: string[];
  comment?: string;
}

export interface ICharacter {
  id: number;
  name: string;
  image: string;
  role: string;
}

export interface ShortMedia {
  id: number;
  type: MediaType;
  format: MediaFormat;
  averageScore: number | null;
  genres: string[];
  source: MediaSource;
  title: {
    romaji: string;
  };
  coverImage: CoverImage;
  bannerImage?: string;
}

export interface PageInfo {
  total: number;
  currentpage: number;
  lastpage: number;
  hasNextPage: boolean;
  peräge: number;
}

export interface PaginatedMedia {
  Page: {
    pageInfo: PageInfo;
    media: ShortMedia[];
  };
}

export interface IMedia {
  // anime
  episodes: number;
  duration: number;
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
  studios: {
    nodes: {
      id: number;
      name: string;
    }[];
  };

  // manga
  chapters: number | null;
  volumes: number | null;

  // both
  type: MediaType;
  description: string;
  genres: string[];
  averageScore: number | null;
  bannerImage: string | null;
  status: MediaStatus;
  format: MediaFormat;
  source: MediaSource;
  countryOfOrigin: string;
  title: {
    english: string;
    romaji: string;
    native: string;
  };
  coverImage: {
    large: string;
    extraLarge: string;
  };
  startDate: {
    day: number | null;
    month: number | null;
    year: number | null;
  };
  endDate: {
    day: number | null;
    month: number | null;
    year: number | null;
  };
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  rankings: Ranking[];
  relations: {
    edges: {
      relationType: RelationType;
      node: ShortMedia;
    }[];
  };
  characters: {
    edges: {
      id: number;
      role: CharacterRole;
      node: {
        name: {
          full: string;
        };
        image: {
          large: string;
        };
      };
    }[];
  };
  stats: {
    statusDistribution: {
      status: DistributionStatus;
      amount: number;
    }[];
  };
  recommendations: {
    nodes: {
      mediaRecommendation: ShortMedia;
    }[];
  };
  reviews: {
    nodes: {
      body: string;
      summary: string;
      score: number;
      rating: number | null;
    }[];
  };
}
