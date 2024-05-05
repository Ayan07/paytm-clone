export const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-left font-medium text-sm py-4">{label}</div>
      <input
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded-sm border-slate-200"
        onChange={onChange}
      />
    </div>
  );
};
