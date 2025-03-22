interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrement}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
        >
          -
        </button>
        <span className="text-xl">{value}</span>
        <button
          onClick={handleIncrement}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
