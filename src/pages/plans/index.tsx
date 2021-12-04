import Head from "next/head";
import { Table, Header } from "@components";
import { getPlansProps } from "@services/pages/plans";
import { checkAuthentication } from "@services/pages";
import { LinkButton } from "@components";

const PlansList = ({ data, studentId }) => {
  return (
    <>
      <Head>
        <title>Plans</title>
      </Head>
      <Header />
      <LinkButton
        link={`/plans/add?student_id=${studentId}`}
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
        props: getPlansProps({
          studentId: +query.student_id || null,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default PlansList;
