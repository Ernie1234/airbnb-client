import * as z from "zod";

export const createListingSchema = z.object({
  category: z.string().min(1, "Category is required"),
  location: z.object({
    value: z.string(),
    label: z.string(),
    latlng: z.tuple([z.number(), z.number()]),
    region: z.string(),
  }),
  guestCount: z.number().min(1, "Guest count is required"),
  roomCount: z.number().min(1, "Room count is required"),
  bathroomCount: z.number().min(1, "Bathroom count is required"),
  imageSrc: z.array(z.string()).min(1, "At least one image is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
});
