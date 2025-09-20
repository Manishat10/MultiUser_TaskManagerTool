
const InputForm = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  error,
  onChange,
  disabled = false,
  ...rest
}) => (
  <div className="">
    {label && (
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    )}
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-400"
          : "border-gray-300 focus:ring-blue-400"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
      {...rest}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);
export default InputForm;