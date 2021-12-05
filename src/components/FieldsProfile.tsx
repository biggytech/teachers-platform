import SingleField from "./SingleField";

const FieldsProfile = ({ data }) => {
  const fields = Object.entries(data);

  return (
    <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
      {fields.map((field) => (
        <SingleField key={field[0]} title={field[0]} value={field[1]} />
      ))}
    </fieldset>
  );
};

export default FieldsProfile;
