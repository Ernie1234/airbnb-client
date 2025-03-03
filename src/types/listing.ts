export interface IListing {
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  bathroomCount: number;
  roomCount: number;
  guestCount: number;
  location: string;
  userId: string | null;
  price: number;
  id: string;
}
