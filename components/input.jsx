export default function Input({
  name,
  placeholder,
  type = "text",
  label = name,
  onChange,
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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
}
