interface InputProps {
  name: string;
  displayName: string;
  type?: string;
  isRequired?: boolean;
  value?: string | null;
}

const Input = (props: InputProps) => {
  const {
    name,
    displayName,
    type = "text",
    isRequired = false,
    value = undefined,
    ...otherProps
  } = props;

  return (
    <div className="mb-6">
      {type !== "hidden" ? (
        <label
          htmlFor={`column-${name}`}
          className="text-sm font-medium text-gray-900 block mb-2"
        >
          {displayName}
        </label>
      ) : null}
      <input
        type={type}
        id={`column-${name}`}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required={isRequired}
        value={value === null ? undefined : value}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
