import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  FormHTMLAttributes,
  useState,
} from "react";
import { Input } from "@components/fields";
import { ColumnDefinitionWithValue } from "@db/Schema";
import { HtmlType } from "@db/DataTypes";
import NewButton, { ButtonColors } from "@components/NewButton";
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DateInput from "@components/DateInput";
import Checkbox from '@mui/material/Checkbox';

type FormProps = {
  name?: string;
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
    data,
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
          console.log('elements:', els)
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
      {name ? <h1 className="mb-2 text-gray-600 font-bold md:text-2xl text-xl">
        {name}
      </h1> : null}
      {columns.map((column) => {
        if (column.type.htmlType === HtmlType.select) {
          return (
            <label key={column.name}>
              {column.displayName}
              <Select
                name={column.name}
                required={column.isRequired}
                data-input-name={column.name}
                defaultValue={data?.[column.name] ?? column.value}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                {"options" in column.type
                  ? column.type.options.map((option) => {
                    return (
                      <MenuItem key={option.name} value={option.name}>
                        {option.displayName}
                      </MenuItem>
                    );
                  })
                  : null}
              </Select>
            </label>
          );
        } else if (column.type.htmlType === HtmlType.date) {
          return <DateInput
            label={column.displayName}
            value={data?.[column.name] ?? column.value}
            name={column.name}
          />
        } else if (column.type.htmlType === HtmlType.checkbox) {
          return <div className="mb-6">
            <label
              htmlFor={`column-${name}`}
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              {column.displayName}
            </label>
            <Checkbox key={column.name} inputProps={{
              name: column.name,
              'data-input-name': column.name,
              defaultValue: data?.[column.name] ?? column.value,
            }} /></div>
        } else {
          return (
            <Input
              key={column.name}
              name={column.name}
              displayName={column.displayName}
              type={HtmlType[column.type.htmlType]}
              isRequired={column.isRequired}
              data-input-name={column.name}
              defaultValue={data?.[column.name] ?? column.value}
            />
          );
        }
      })}
      {action && (
        <NewButton
          color={ButtonColors.success}
          icon={<SaveIcon />}
          text="Отправить"
          type="submit"
        />
      )}
    </form>
  );
});

Form.displayName = "Form";

export default Form;
