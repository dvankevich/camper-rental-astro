export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  transmission: string;
  engine: string;
  kitchen: boolean;
  AC: boolean;
  beds: number;
  adults: number;
  gallery: {
    thumb: string;
    original: string;
  }[];
  reviews: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
}