import Head from "next/head";
import Link from "next/Link";
import { Table, Header } from "../../components";
import { getTeachersProps } from "../../services/pages/teachers";
import { checkAuthentication } from "../../services/pages";

const TeachersList = ({ data }) => {
  return (
    <>
      <Header />
      <Head>
        <title>Teachers</title>
      </Head>
      <Link href="/teachers/add">
        <button className="m-1 float-right cursor-pointer bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded inline-flex items-center">
          &#43;&nbsp;&nbsp;
          <span>Add</span>
        </button>
      </Link>

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
