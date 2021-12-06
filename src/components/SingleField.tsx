const SingleField = ({ title, value }) => {
  return (
    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
      <span className="text-right px-2">{title}:</span>
      <span className="px-3">{value}</span>
    </label>
  );
};

export default SingleField;
