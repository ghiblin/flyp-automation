export default function Form({ onSubmit, children }) {
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      {children}
    </form>
  );
}
