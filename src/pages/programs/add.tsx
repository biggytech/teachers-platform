import Head from "next/head";
import { Button, Form, Header, Steps } from "@components";
import { checkAuthentication } from "../../services/pages";
import { getAddProgramProps } from "@services/pages/programs";
import { useCallback, useRef } from "react";

// action="/api/programs/add"

const AddProgram = ({ columns, steps }) => {
  // const formRef = useRef(null);
  // const stepsRef = useRef(null);

  // const handleSubmit = useCallback(() => {
  //   const formValues = formRef.current?.getValues();
  //   const stepValues = stepsRef.current?.getValues();
  //   fetch("/api/programs/add", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       program: formValues,
  //       points: stepValues,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }, [stepsRef, stepsRef.current]);

  return (
    <>
      <Head>
        <title>Programs | Add</title>
      </Head>
      <Header />
      <Form action="/api/programs/add" name="Add a program" columns={columns} />
      {/* <Steps ref={stepsRef} title="Points of the program" fields={steps} />
      <Button text="Submit" onClick={handleSubmit} /> */}
    </>
  );
};

const getServerSideProps = async ({ req }) => {
  return await checkAuthentication({
    req,
    cb: (user) => {
      return {
        props: getAddProgramProps({
          ownerId: user.id,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default AddProgram;
