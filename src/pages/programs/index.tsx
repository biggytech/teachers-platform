import Head from "next/head";
import { Table, Header } from "../../components";
import { getProgramsProps } from "@services/pages/programs";
import { checkAuthentication } from "../../services/pages";
import { LinkButton } from "@components";

const ProgramsList = ({ data }) => {
  return (
    <>
      <Head>
        <title>Programs</title>
      </Head>
      <Header />
      <LinkButton
        link="/programs/add"
        text="Add"
        icon="&#43;&nbsp;&nbsp;"
        className="float-right"
      />
      <Table
        pathName="/programs"
        columns={data.columns}
        rows={data.rows}
        totalRecords={data.totalRecords}
        pageSize={data.pageSize}
        page={data.page}
      />
    </>
  );
};

const getServerSideProps = async ({ query, req, res }) => {
  return await checkAuthentication({
    req,
    cb: (user) => {
      return {
        props: getProgramsProps({
          page: +query.page || 1,
          limit: +query.limit || 20,
          ownerId: user.id,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default ProgramsList;
