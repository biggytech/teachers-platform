import Head from "next/head";
import Link from "next/Link";
import { Table, Header } from "../../components";
import { getStudentsProps } from "../../services/pages/students";
import { checkAuthentication } from "../../services/pages";

const StudentsList = ({ data }) => {
  return (
    <>
      <Head>
        <title>Students</title>
      </Head>
      <Header />
      <Link href="/students/add">
        <button className="m-1 float-right cursor-pointer bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded inline-flex items-center">
          &#43;&nbsp;&nbsp;
          <span>Add</span>
        </button>
      </Link>

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
