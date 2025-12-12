// Auto-generated from Postman Collection
import api from "./api";

// Global
export const getGlobal = (params) =>
  api.get(`/global?populate=*`, { params });

// Home
export const getHome = (params) =>
  api.get(`/home?populate=*`, { params });

// News
export const getNewsPage = (params) =>
  api.get(`/news-page?populate=*`, { params });

export const getNewsDetail = (params) =>
  api.get(`/news-detail`, { params });

// Calendar (real: sustainability)
export const getCalendar = (params) =>
  api.get(`/sustainability`, { params });

// Login usa la misma URL
export const getLogin = (params) =>
  api.get(`/login`, { params });

// Images
export const getImagesAll = (params) =>
  api.get(`/upload/files`, { params });

// Static image
export const getViewImage = () =>
  api.get(`/uploads/WOM_logo_2c6c4d371f.png`);

// Gobernance collections
export const getGobernanceCollectionCardBoard = (params) =>
  api.get(`/gobernance-collection-cards?populate=*`, { params });

export const getGobernanceCollectionCardManagement = (params) =>
  api.get(`/gobernance-collection-card-managements?populate=*`, { params });

export const getGobernance = (params) =>
  api.get(`/gobernance?populate=*`, { params });

// News collections
export const getNewsCollectionCard = (params) =>
  api.get(`/news-collection-cards?populate=*`, { params });

export const getNewsCollectionDataGrid = (params) =>
  api.get(`/news-collection-data-grids?populate=*`, { params });

// Home collections
export const getHomeCollectionFinacnialCard = (params) =>
  api.get(`/home-financial-cards?populate=*`, { params });

export const getHomeCollectionPopUp = (params) =>
  api.get(`/home-collection-pop-ups?populate=*`, { params });

export const getHomeCollectionNewsCard = (params) =>
  api.get(`/home-news-cards?populate=*`, { params });

export const getHomeCollectionEventInfo = (params) =>
  api.get(`/home-event-infos?populate=*`, { params });

export const getHomeCollectionBondDocument = (params) =>
  api.get(`/home-bond-documents?populate=*`, { params });

// Financial collections
export const getFinancials = (params) =>
  api.get(`/financials?populate=*`, { params });

export const getFinancialCollectionQDocument = (params) =>
  api.get(`/financial-collection-q-documents?populate=*`, { params });

export const getFinancialCollectionOtherDocument = (params) =>
  api.get(`/financial-collection-other-documents?populate=*`, { params });

// Calendar collections
export const getCalendarCollectionPastEvent = (params) =>
  api.get(`/calendar-past-events?populate=*`, { params });

export const getCalendarCollectionUpcomingEvent = (params) =>
  api.get(`/calendar-past-events?populate=*`, { params });

