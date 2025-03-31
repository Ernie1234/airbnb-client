export interface IReservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
interface IReservationData {
  createdAt: string;
  endDate: string;
  id: string;
  listingId: {
    bathroomCount: number;
    category: string;
    createdAt: string;
    description: string;
    guestCount: number;
    id: string;
    imageSrc: string[];
    location: string;
    price: number;
    roomCount: number;
    title: string;
    updatedAt: string;
    userId: string;
  };
  startDate: string;
  totalPrice: number;
  updatedAt: string;
  userId: string;
}

export interface IReservationApiResponse {
  limit: number;
  page: number;
  reservations: IReservationData[];
  total: number;
}
