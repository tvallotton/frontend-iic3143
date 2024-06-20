export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface IndustryIdentifier {
  type: string;
  identifier: string;
}

interface ReadingModes {
  text: boolean;
  image: boolean;
}

interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: FormatAvailability;
  pdf: FormatAvailability;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

interface FormatAvailability {
  isAvailable: boolean;
  acsTokenLink?: string;
}

interface SearchInfo {
  textSnippet: string;
}

export interface PublicationFormParams {
  title: string;
  author: string;
  language: string;
  genres: string[];
  bookState: string;
  description: string;
  type: string;
  price: number;
  image: string;
  booksOfInterest: string;
  bookId: string;
}

interface Owner {
  name: string;
  id: string;
}
export interface PublicationFromBackend extends PublicationFormParams {
  id: number;
  owner: Owner;
  ownerId: number;
  status: string;
}

export interface Interaction {
  id: string;
  user: Owner;
}
