import Head from "next/head";
import { Table, Header } from "@components";
import { getMaterialsProps } from "@services/pages/materials";
import { checkAuthentication } from "@services/pages";
import { LinkButton } from "@components";

const MaterialsList = ({ data, programId }) => {
  return (
    <>
      <Head>
        <title>Materials</title>
      </Head>
      <Header />
      <LinkButton
        link={`/materials/add?program_id=${programId}`}
        text="Add"
        icon="&#43;&nbsp;&nbsp;"
        className="float-right"
      />
      <Table columns={data.columns} rows={data.rows} isUsePagination={false} />
    </>
  );
};

const getServerSideProps = async ({ query, req, res }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getMaterialsProps({
          program_id: +query.program_id || null,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default MaterialsList;
