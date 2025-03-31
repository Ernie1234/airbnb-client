export interface IReservationData {
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

export interface IDataResponse {
  limit: number;
  page: number;
  reservations: IReservationData[];
  total: number;
}

export interface IReservationApiResponse {
  data: IDataResponse;
  message: string;
  status: string;
}
