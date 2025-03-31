"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { createReservation } from "@/services/reservations";
import type { ISingleListingsResponse } from "@/types/listing";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "./Heading";

interface ReservationFormProps {
  listing: ISingleListingsResponse;
}

const createFormSchema = (maxGuests: number) =>
  z.object({
    dates: z.object({
      from: z.date({ required_error: "Check-in date is required" }),
      to: z.date({ required_error: "Check-out date is required" }),
    }),
    guests: z
      .number()
      .min(1, "At least 1 guest is required")
      .max(maxGuests, `Cannot exceed maximum of ${maxGuests} guests`),
  });

export default function ReservationFormCard({ listing }: ReservationFormProps) {
  const maxGuests = listing.data.guestCount || 1;
  const formSchema = createFormSchema(maxGuests);
  type FormValues = z.infer<typeof formSchema>; // Moved inside the component
  const showPrice = !!listing.data.price;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dates: { from: undefined, to: undefined },
      guests: 1,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createReservation,
    onSuccess: (data) => {
      toast.success("Reservation created Successfully!", {
        description: data.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast.error("An Error occurred while reserving listing", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
    },
  });

  const handleSubmit = (values: FormValues) => {
    if (values.guests > maxGuests) {
      toast.error(`Maximum guests allowed is ${maxGuests}`);
      return;
    }

    mutate({
      listingId: listing.data.id,
      startDate: values.dates.from.toISOString(),
      endDate: values.dates.to.toISOString(),
    });
  };

  const handleDateSelect = (range?: { from?: Date; to?: Date }) => {
    if (range?.from && range?.to) {
      form.setValue("dates", { from: range.from, to: range.to });
    }
  };

  const adjustGuestCount = (adjustment: number) => {
    const currentGuests = form.getValues("guests") || 1;
    const newValue = Math.max(
      1,
      Math.min(maxGuests, currentGuests + adjustment)
    );
    form.setValue("guests", newValue);
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {showPrice ? (
            <>
              <Heading title={`$${listing.data.price}`} />
              <span className="font-normal">night</span>
            </>
          ) : (
            <Heading title="Add dates for prices" />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Date Range Picker */}
            <div className="rounded-lg border-2 overflow-hidden">
              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full h-16 justify-start text-left font-normal rounded-none",
                              !field.value.from && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "MMM dd")} -{" "}
                                  {format(field.value.to, "MMM dd")}
                                </>
                              ) : (
                                format(field.value.from, "MMM dd")
                              )
                            ) : (
                              <span>Select dates</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={new Date()}
                          selected={{
                            from: field.value?.from,
                            to: field.value?.to,
                          }}
                          onSelect={handleDateSelect}
                          numberOfMonths={2}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <Separator />

              {/* Guest Selector */}
              <div className="p-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase">
                    Guests
                  </span>
                  <span className="text-sm text-gray-500">
                    {form.watch("guests")} guest(s) · Max: {maxGuests}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      adjustGuestCount(-1);
                    }}
                    disabled={form.watch("guests") <= 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.preventDefault();
                      adjustGuestCount(1);
                    }}
                    disabled={form.watch("guests") >= maxGuests}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Check availability"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
