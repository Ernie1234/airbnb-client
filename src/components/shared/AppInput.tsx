import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface IInput<T extends FieldValues> {
  id: Path<T>; // Use Path<T> to ensure id is a valid path of the form data type
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const AppInput = <T extends FieldValues>({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}: IInput<T>) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-4
            left-2
          "
        />
      )}
      <input
        id={id} // No need to cast id to string; Path<T> is compatible
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-2
          pt-5 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-5" : "pl-2"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          absolute 
          text-sm
          duration-150 
          transform 
          -translate-y-3 
          top-4 
          z-10 
          origin-[0] 
          ${formatPrice ? "left-5" : "left-2"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default AppInput;
