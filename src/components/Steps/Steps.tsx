import {
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Button, Form } from "@components";
import { Column, ColumnDefinition } from "@db/Schema";
import { Input } from "@components/fields";

type StepsProps = {
  title: string;
  fields: Array<ColumnDefinition>;
};

interface ColumnValue extends ColumnDefinition {
  value: string | null;
}

type StepValue = Array<ColumnValue>;

const Steps = forwardRef((props: StepsProps, ref) => {
  const { title, fields } = props;

  const [steps, setSteps] = useState<Array<StepValue>>([]);

  const formRef = useRef(null);

  const [stepsRefs, setStepsRefs] = useState([]);

  const attachRef = useCallback((ref) => {
    setStepsRefs((prev) => [...prev, ref]);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      getValues: () => {
        if (formRef.current) {
          const result = Array.prototype.map.call(stepsRefs, (element) => {
            const value = element.getValues();

            return value;
          });
          return result;
        }
      },
    }),
    [stepsRefs]
  );

  const handleAddClick = useCallback(() => {
    setSteps((prev) => [
      ...prev,
      fields.map((field) => ({
        ...new Column(field),
        value: "",
      })),
    ]);
  }, [fields]);

  return (
    <div ref={formRef}>
      <p>{title}</p>
      {steps.map((step, i) => (
        <Form
          ref={attachRef}
          key={i}
          name={`Step ${i + 1}:`}
          data-step-index={i}
          columns={step}
        />
      ))}
      <Button type="button" text="Add a point" onClick={handleAddClick} />
    </div>
  );
});

Steps.displayName = "Steps";

export default Steps;
