interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ratingLabels = [
  "Poor",
  "Below Expectations",
  "Meets Expectations",
  "Good",
  "Excellent",
];

const RatingInput = ({
  value,
  onChange,
  disabled = false,
}: RatingInputProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          disabled={disabled}
          onClick={() => onChange(rating)}
          title={`${rating} - ${ratingLabels[rating - 1]}`}
          aria-label={`${rating} - ${ratingLabels[rating - 1]}`}
          className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-semibold transition ${
            value === rating
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
