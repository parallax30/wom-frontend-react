export interface LatestNewsItem {
  id: string;
  title: string;
  summary: string;
  url: string; // link a la noticia completa
  linkText: string;

}

export interface OldNewsItem {
  id: string;
  date: string;
  title: string;
  viewUrl?: string;
  downloadUrl: string;
}



export interface NewsPageModel {
  titleLatest: string;
  titleArchived: string;
  featuredNews: LatestNewsItem[];
  archivedNews: OldNewsItem[];
}
