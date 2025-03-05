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
  _id: string;
}

interface Property {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  hostName: string;
  bathroomCount: number;
  roomCount: number;
  guestCount: number;
  imageSrc: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPropertyResponse {
  success: boolean;
  message: string;
  data: Property;
}
