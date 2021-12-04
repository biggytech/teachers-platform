import Head from "next/head";
import Link from "next/Link";
import { Table, Header } from "../../components";
import { getStudentsProps } from "../../services/pages/students";
import { checkAuthentication } from "../../services/pages";
import { LinkButton } from "@components";

const StudentsList = ({ data }) => {
  return (
    <>
      <Head>
        <title>Students</title>
      </Head>
      <Header />
      <LinkButton
        link="/students/add"
        text="Add"
        icon="&#43;&nbsp;&nbsp;"
        className="float-right"
      />
      <Table
        pathName="/students"
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
    cb: () => {
      return {
        props: getStudentsProps({
          page: +query.page || 1,
          limit: +query.limit || 20,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default StudentsList;
