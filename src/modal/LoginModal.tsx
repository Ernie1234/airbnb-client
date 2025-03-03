import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";

import Heading from "@/components/shared/Heading";
import AppInput from "@/components/shared/AppInput";
import { loginFormSchema } from "@/schemas/auth-schema";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import { loginUser } from "@/services/auth";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onToggle = useCallback(() => {
    registerModal.onOpen();
    loginModal.onClose();
  }, [registerModal, loginModal]);

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
      const response = await loginUser(data);
      return response;
    },
    onSuccess: (data: any) => {
      console.log(data);
      localStorage.setItem("token", data.user.token);

      toast.success("Successfully", {
        description: data.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
      loginModal.onClose();
    },
    onError: (error: any) => {
      toast.error("An error occurred", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    mutation.mutate(values);
  };

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <AppInput
        id="email"
        label="Email"
        disabled={mutation.isPending}
        register={form.register}
        errors={form.formState.errors}
        required
      />
      <AppInput
        id="password"
        label="Password"
        type="password"
        disabled={mutation.isPending}
        register={form.register}
        errors={form.formState.errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-2 mt-3">
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Don't have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Register
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={mutation.isPending}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
