import Head from "next/head";
import Link from "next/Link";
import { Table, Header } from "../../components";
import { getTeachersProps } from "../../services/pages/teachers";
import { checkAuthentication } from "../../services/pages";

import { LinkButton } from "@components";

const TeachersList = ({ data }) => {
  return (
    <>
      <Header />
      <Head>
        <title>Teachers</title>
      </Head>
      <LinkButton
        link="/teachers/add"
        text="Add"
        icon="&#43;&nbsp;&nbsp;"
        className="float-right"
      />
      <Table
        pathName="/teachers"
        columns={data.columns}
        rows={data.rows}
        totalRecords={data.totalRecords}
        pageSize={data.pageSize}
        page={data.page}
      />
    </>
  );
};

const getServerSideProps = async ({ query, req }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getTeachersProps({
          page: +query.page || 1,
          limit: +query.limit || 20,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default TeachersList;
