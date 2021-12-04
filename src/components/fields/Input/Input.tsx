interface InputProps {
  name: string;
  displayName: string;
  type?: string;
  isRequired?: boolean;
}

const Input = (props: InputProps) => {
  const {
    name,
    displayName,
    type = "text",
    isRequired = false,
    ...otherProps
  } = props;

  return (
    <div className="mb-6">
      <label
        htmlFor={`column-${name}`}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        {displayName}
      </label>
      <input
        type={type}
        id={`column-${name}`}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required={isRequired}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
