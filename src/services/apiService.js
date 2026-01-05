// Auto-generated from Postman Collection
import api from "./api";

// Global
export const getGlobal = (params) =>
  api.get(`/global?populate=*`, { params });

// Home
export const getHome = (params) =>
  api.get(`/home?fields=homeTitle1,homeTitle2,homeTitle3,homeTitle4,homeTItle1TextButton,homeTItle1LinkUrlButton,homeTItle2TextlButton,homeTItle2LinkUrlButton,homeTItle3TextlButton,homeTItle3LinkUrlButton&populate[homePrincipalImage][fields][0]=url&populate[home_financial_cards][fields][0]=homeFinancialCardTitle&populate[home_financial_cards][fields][1]=homeFinancialCardLinkText&populate[home_financial_cards][fields][2]=homeFinancialCardLinkUrl&populate[home_news_cards][fields][0]=homeNewsCardTitle&populate[home_news_cards][fields][1]=omeNewsCardSummary&populate[home_event_infos][fields][0]=homeEventInfoTitle&populate[home_event_infos][fields][1]=homeEventInfoDate&populate[home_event_infos][fields][2]=homeEventInfoSummary&populate[home_event_infos][fields][3]=homeEventInfoLinkText&populate[home_event_infos][fields][4]=homeEventInfoLinkUrl&populate[home_bond_documents][fields][0]=homeBondDocumentName&populate[home_bond_documents][fields][1]=homeBondDocumentDate&populate[home_bond_documents][fields][2]=homeBondDocumentSummary&populate[home_bond_documents][fields][3]=homeBondDocumentLinkText&populate[home_bond_documents][fields][4]=homeBondDocumentLinkUrl`, { });

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
  api.get(`/gobernance-collection-cards?populate=*&sort=governanceTeamOrder`, { params });

export const getGobernanceCollectionCardManagement = (params) =>
  api.get(`/gobernance-collection-card-managements?fields[0]=governanceManagmentName&fields[1]=governanceManagmentPosition&fields[2]=governanceManagmentBiography&populate[governanceManagmentImage][fields][0]=url`, { params });

export const getGobernance = (params) =>
  api.get(`/gobernances?populate=*`, { params });

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
  api.get(`/calendar-upcoming-events?populate=*`, { params });

// Auth - Register
export const registerUser = (payload) =>
  api.post("/auth/local/register", payload);

// Get users
export const getUsers = (payload) =>
  api.get("/users", payload);

export const getUserById = (id) =>
  api.get(`/users/${id}`);

//PUT users
export const putUser = (id, payload) =>
  api.put(`/users/${id}`, payload); 

export const getFinancialCollectionOtherDocuments = (params) =>
  api.get(`/financial-collection-other-documents?fields=financialCollectionOtherDocumentName,financialCollectionOtherDocumentSummary,financialCollectionOtherDocumentLinkText,financialCollectionOtherDocumentLinkUrl,financialCollectionOtherDocumentSummaryList&populate[financialCollectionOtherDocumentLinkIcon][fields][0]=url`, { params });


export const getGobernanceCollectionDocuments = (params) =>
  api.get(`/gobernance-collection-documents?populate=*`, { params });

