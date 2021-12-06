import SingleField from "./SingleField";

const FieldsProfile = ({ data, mapData = null }) => {
  const fields = Object.entries(mapData ? mapData : data);

  return (
    <fieldset
      className="mb-3 bg-white shadow-lg rounded text-gray-600"
      style={{ padding: 20 }}
    >
      {fields.map((field) => (
        <SingleField
          key={field[0]}
          title={mapData ? mapData[field[0]] : field[0]}
          value={data[field[0]]}
        />
      ))}
    </fieldset>
  );
};

export default FieldsProfile;
