import Head from "next/head";
import { Table, Header } from "@components";
import { getPointsProps } from "@services/pages/points";
import { checkAuthentication } from "@services/pages";
import { LinkButton } from "@components";

const PointsList = ({ data, programId }) => {
  console.log(data);
  return (
    <>
      <Head>
        <title>Points</title>
      </Head>
      <Header />
      <LinkButton
        link={`/points/add?program_id=${programId}`}
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
        props: getPointsProps({
          program_id: +query.program_id || null,
        }),
      };
    },
  });
};

export { getServerSideProps };
export default PointsList;
