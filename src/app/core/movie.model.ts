export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  genre: string;
  certification: string;
  spotlight?: boolean;
  nowShowing?: boolean;
  comingSoon?: boolean;
}
