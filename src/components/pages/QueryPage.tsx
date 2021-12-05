import Head from "next/head";
import { Table, Header } from "@components";
import { checkAuthentication } from "@services/pages";

import { LinkButton } from "@components";

type QueryPageCreatorProps = {
  title: string;
  addLink?: string | null | Function;
  pathName?: string | null;
  isUsePagination?: boolean;
  contextId?: string | Array<string> | null;
  queryParams: any;
};

interface QueryPageProps extends QueryPageCreatorProps {
  data: any;
}

const QueryPage = (props: QueryPageProps) => {
  const {
    data,
    title,
    addLink,
    pathName,
    isUsePagination = true,
    contextId = null,
    queryParams,
  } = props;

  console.log("context id", contextId);

  return (
    <>
      <Header />
      <Head>
        <title>{title}</title>
      </Head>
      {addLink ? (
        <LinkButton
          link={addLink instanceof Function ? addLink(contextId) : addLink}
          text="Add"
          icon="&#43;&nbsp;&nbsp;"
          className="float-right"
        />
      ) : null}
      <Table
        pathName={pathName}
        columns={data.columns}
        rows={data.rows}
        totalRecords={data.totalRecords}
        pageSize={data.pageSize}
        page={data.page}
        isUsePagination={isUsePagination}
        contextId={Array.isArray(contextId) ? contextId[0] : contextId}
        queryParams={queryParams}
      />
    </>
  );
};

export const createQueryPage = (props: QueryPageCreatorProps) => {
  return {
    runGetServerSideProps: ({ query, req }) => {
      return new Promise(async (resolve) => {
        await checkAuthentication({
          req,
          cb: (user) => {
            resolve({
              page: +query.page || 1,
              limit: +query.limit || 20,
              userId: user.id,
              query,
            });
          },
        });
      });
    },
    QueryPage: function Component({ data, ...otherProps }) {
      return <QueryPage data={data} {...props} {...otherProps} />;
    },
  };
};

// const getServerSideProps = async ({ query, req }) => {
//   return await checkAuthentication({
//     req,
//     cb: () => {
//       return {
//         props: getTeachersProps({
//           page: +query.page || 1,
//           limit: +query.limit || 20,
//         }),
//       };
//     },
//   });
// };

// export { getServerSideProps };
export default createQueryPage;
