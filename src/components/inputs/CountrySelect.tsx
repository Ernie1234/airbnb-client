import Select from "react-select";

import useCountries from "@/hooks/useCountries";

export type CountrySelectValue = {
  // flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: Props) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(opt: any) => (
          <div className="flex flex-row items-center gap-2">
            <div>{opt.flag}</div>
            <div>{opt.label}</div>,{" "}
            <span className="text-neutral-800 ml-1">{opt.region}</span>
          </div>
        )}
        classNames={{
          control: () => "p-1 border-1",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
