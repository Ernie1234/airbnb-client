import type { IListing } from "./listing";
import type { IReservation } from "./reservation";

export enum ERole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  imageUrl: string | undefined;
  role: ERole;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  Listings: IListing[];
  Reservations: IReservation[];
}
