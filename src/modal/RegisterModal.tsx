import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Heading from "@/components/Heading";
import AppInput from "@/components/shared/AppInput";
import Modal from "./Modal";
import { completeSchema } from "@/schemas/auth-schema";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof completeSchema>>({
    resolver: zodResolver(completeSchema),
  });

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  function onSubmit(values: z.infer<typeof completeSchema>) {
    console.log(values);
  }

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <div className="flex items-center gap-2 mt-3">
        <AppInput
          id="firstName"
          label="First Name"
          disabled={isLoading}
          register={form.register}
          errors={form.formState.errors}
          required
        />
        <AppInput
          id="lastName"
          label="Last Name"
          disabled={isLoading}
          register={form.register}
          errors={form.formState.errors}
          required
        />
      </div>
      <AppInput
        id="email"
        label="Email"
        disabled={isLoading}
        register={form.register}
        errors={form.formState.errors}
        required
      />
      <AppInput
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={form.register}
        errors={form.formState.errors}
        required
      />
      <AppInput
        id="confirmPassword"
        label="Con"
        type="password"
        disabled={isLoading}
        register={form.register}
        errors={form.formState.errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-2 mt-3">
      {/* <hr />
      <AppBtn
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          // signIn("google")
        }}
      />
      <AppBtn
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          // signIn("github");
        }}
      /> */}
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
