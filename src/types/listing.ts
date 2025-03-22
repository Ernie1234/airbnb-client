import type { IUser } from "./user";

export interface IListing {
  title: string;
  description: string;
  imageSrc: string[];
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

interface IProperty {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  hostName: string;
  bathroomCount: number;
  roomCount: number;
  guestCount: number;
  imageSrc: string[];
  userId: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IPropertyResponse {
  success: boolean;
  message: string;
  data: {
    listings: IListing;
    page: number;
    limit: number;
    total: number;
  };
}

export interface ISingleListingsResponse {
  success: boolean;
  message: string;
  data: IProperty;
}
