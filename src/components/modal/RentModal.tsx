import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";

import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import { categoriesData } from "@/lib/contants";
import CategoryInput from "../nav/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../inputs/Map";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import AppInput from "../shared/AppInput";
import { createListing } from "@/services/listings";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const formSchema = z.object({
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
  title: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const RentModal = () => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const rentModal = useRentModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      location: undefined,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: [],
      title: "",
      description: "",
      price: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  // const title = watch("title");
  // const description = watch("description");
  // const price = watch("price");

  const setCustomValue = (field: keyof FormValues, value: any) => {
    setValue(field, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const listingData = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        location: data.location.value,
        images: data.imageSrc,
        category: data.category,
        bathroomCount: data.bathroomCount,
        roomCount: data.roomCount,
        guestCount: data.guestCount,
      };
      return await createListing(listingData);
    },
    onSuccess: (data) => {
      toast.success("Listing created successfully", {
        description: data.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllListing"] });
      rentModal.onClose();
    },
    onError: (error) => {
      toast.error("Listing creation failed", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
    },
  });

  const handleNextStep = async () => {
    let isValid = false;

    switch (step) {
      case STEPS.CATEGORY:
        isValid = await trigger("category");
        break;
      case STEPS.LOCATION:
        isValid = await trigger("location");
        break;
      case STEPS.INFO:
        isValid =
          (await trigger("guestCount")) &&
          (await trigger("roomCount")) &&
          (await trigger("bathroomCount"));
        break;
      case STEPS.IMAGES:
        isValid = await trigger("imageSrc");
        break;
      case STEPS.DESCRIPTION:
        isValid = await trigger("description");
        break;
      case STEPS.PRICE:
        isValid = await trigger("price");
        break;
      default:
        isValid = false;
    }

    if (!isValid) return;

    if (step === STEPS.PRICE) {
      handleSubmit((data) => mutation.mutate(data))();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of this best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categoriesData.map((cat) => (
          <div className="col-span-1" key={cat.label}>
            <CategoryInput
              onClick={() => setCustomValue("category", cat.label)}
              label={cat.label}
              selected={category === cat.label}
              icon={cat.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => {
            if (value) {
              setCustomValue("location", value);
            }
          }}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <AppInput
          id="title"
          label="Title"
          register={register}
          errors={errors}
          required
        />
        <AppInput
          id="description"
          label="Description"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <AppInput
          id="price"
          label="Price"
          type="number"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleNextStep}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handlePreviousStep}
      secondaryActionLabel={secondaryActionLabel}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};
