import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  FormHTMLAttributes,
} from "react";
import { Input } from "@components/fields";
import { ColumnDefinitionWithValue } from "@db/Schema";
import { HtmlType } from "@db/DataTypes";

type FormProps = {
  name: string;
  action?: string;
  columns: Array<ColumnDefinitionWithValue>;
  encType?: FormHTMLAttributes<HTMLFormElement>["encType"];
};

type t = keyof FormHTMLAttributes<HTMLFormElement>;

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
            let value;
            switch (el.type) {
              case "number":
                value = Number(el.value);
                break;
              case "checkbox":
                value = el.checked;
                break;
              default:
                value = el.value;
            }
            result[el.dataset.inputName] = value;
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
      {columns.map((column) => {
        if (column.type.htmlType !== HtmlType.select) {
          return (
            <Input
              key={column.name}
              name={column.name}
              displayName={column.displayName}
              type={HtmlType[column.type.htmlType]}
              isRequired={
                column.type.htmlType === HtmlType.checkbox
                  ? false
                  : column.isRequired
              }
              data-input-name={column.name}
              value={column.value}
            />
          );
        } else {
          return (
            <label key={column.name}>
              {column.displayName}
              <select
                name={column.name}
                required={column.isRequired}
                data-input-name={column.name}
                value={column.value}
                style={{
                  width: "100%",
                  border: "1px solid black",
                  marginBottom: "10px",
                }}
              >
                {"options" in column.type
                  ? column.type.options.map((option) => {
                      return (
                        <option key={option.name} value={option.name}>
                          {option.displayName}
                        </option>
                      );
                    })
                  : null}
              </select>
            </label>
          );
        }
      })}
      {action && (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Отправить
        </button>
      )}
    </form>
  );
});

Form.displayName = "Form";

export default Form;
