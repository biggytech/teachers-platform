import Head from "next/head";

import { Form, Header } from "@components";
import { getAddPlanProps } from "@services/pages/plans";
import { checkAuthentication } from "@services/pages";

const AddMaterial = ({ columns }) => {
  return (
    <>
      <Head>
        <title>Plans | Add</title>
      </Head>
      <Header />
      <Form name="Add a plan" action="/api/plans/add" columns={columns} />
    </>
  );
};

const getServerSideProps = async ({ req, query, res }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getAddPlanProps({
          req,
          res,
          studentId: +query.student_id || null,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default AddMaterial;
