import Head from "next/head";

import { Form, Header } from "@components";
import { getAddMaterialProps } from "@services/pages/materials";
import { checkAuthentication } from "@services/pages";

const AddMaterial = ({ columns }) => {
  console.log(columns);
  return (
    <>
      <Head>
        <title>Materials | Add</title>
      </Head>
      <Header />
      <Form
        name="Add a material"
        action="/api/materials/add"
        columns={columns}
      />
    </>
  );
};

const getServerSideProps = async ({ req, query }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getAddMaterialProps({
          programId: +query.program_id || null,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default AddMaterial;
