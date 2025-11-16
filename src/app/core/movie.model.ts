export interface Movie {
  id: string;
  title: string;
  poster: string;        // asset path
  rating?: string;
  duration?: string;
  certification?: string;
  director?: string;
  genre?: string[];
  release_date?: string;
  nowShowing?: boolean;
  spotlight?: boolean;
  comingSoon?: boolean;
}
