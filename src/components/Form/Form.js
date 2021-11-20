const Form = ({ name, action, columns }) => {
  return (
    <form
      className="p-4"
      action={action}
      encType="multipart/form-data"
      method="post"
    >
      <h1 className="mb-2 text-gray-600 font-bold md:text-2xl text-xl">
        {name}
      </h1>
      {columns.map((column) => (
        <div className="mb-6" key={column.name}>
          <label
            htmlFor={`column-${column.name}`}
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            {column.displayName}
          </label>
          <input
            type={column.type.htmlType}
            id={`column-${column.name}`}
            name={column.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required={column.isRequired}
          />
        </div>
      ))}
      {/* <label
          for="password"
          className="text-sm font-medium text-gray-900 block mb-2"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required=""
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            aria-describedby="remember"
            type="checkbox"
            className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
            required=""
          />
        </div>
        <div className="text-sm ml-3">
          <label for="remember" className="font-medium text-gray-900">
            Remember me
          </label>
        </div> */}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
