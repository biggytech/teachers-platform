import Head from "next/head";

import { Form, Header } from "@components";
import { getAddPointProps } from "@services/pages/points";
import { checkAuthentication } from "@services/pages";

const AddPoint = ({ columns }) => {
  return (
    <>
      <Head>
        <title>Points | Add</title>
      </Head>
      <Header />
      <Form name="Add a point" action="/api/points/add" columns={columns} />
    </>
  );
};

const getServerSideProps = async ({ req, query }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getAddPointProps({
          programId: +query.program_id || null,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default AddPoint;
