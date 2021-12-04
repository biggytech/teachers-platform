import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Input } from "@components/fields";
import { ColumnDefinitionWithValue } from "@db/Schema";

type FormProps = {
  name: string;
  action?: string;
  columns: Array<ColumnDefinitionWithValue>;
  encType?: string;
};

const Form = forwardRef((props: FormProps, ref) => {
  const {
    name,
    action,
    columns,
    encType = "application/x-www-form-urlencoded",
    ...otherProps
  } = props;

  const formRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      getValues: () => {
        const result = {};
        if (formRef.current) {
          const els = formRef.current.querySelectorAll("[data-input-name]");
          Array.prototype.forEach.call(els, (el) => {
            result[el.dataset.inputName] =
              el.type === "number" ? Number(el.value) : el.value;
          });
        }
        return result;
      },
    }),
    []
  );

  return (
    <form
      ref={formRef}
      className="p-4"
      action={action}
      encType={encType}
      method="post"
      {...otherProps}
    >
      <h1 className="mb-2 text-gray-600 font-bold md:text-2xl text-xl">
        {name}
      </h1>
      {columns.map((column) => (
        <Input
          key={column.name}
          name={column.name}
          displayName={column.displayName}
          type={column.type.htmlType}
          isRequired={column.isRequired}
          data-input-name={column.name}
          value={column.value}
        />
      ))}
      {action && (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      )}
    </form>
  );
});

Form.displayName = "Form";

export default Form;
