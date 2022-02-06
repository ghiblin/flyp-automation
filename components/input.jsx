export default function Input({
  name,
  placeholder,
  type = "text",
  label = name,
  onChange,
  error = "",
}) {
  const handleInputChange = (e) => {
    if (onChange) {
      onChange(name, e.target.value);
    }
  };
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border border-red-700" : ""
        }`}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {error ? (
        <span className="text-xs text-red-700" id="passwordHelp">
          {error}
        </span>
      ) : null}
    </div>
  );
}
