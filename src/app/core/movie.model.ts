export interface Movie {
  id: string;
  title: string;
  image: string;
  rating?: string;
  duration: string;
  certification?: string;
  director?: string;
  genre: string[];
  release_date?: string;
}

