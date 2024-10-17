function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        className="border rounded-xl p-2"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Your ${name}`}
      />
    </div>
  );
}

export default InputField;
