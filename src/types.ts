export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  reviewsCount: number;
  tag: string;
  duration: string;
  description: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: string;
  oldPrice?: string;
  image: string;
  rating: number;
  inclusions: string[];
  badge?: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  destination: string;
}

export interface AIActivity {
  time: string;
  activity: string;
  description: string;
}

export interface AIDayItinerary {
  day: number;
  theme: string;
  activities: AIActivity[];
}

export interface AIHotelRecommendation {
  name: string;
  type: string;
  priceRange: string;
}

export interface AIItineraryResponse {
  title: string;
  description: string;
  estimatedCostRange: string;
  itinerary: AIDayItinerary[];
  tips: string[];
  recommendedHotels: AIHotelRecommendation[];
}
