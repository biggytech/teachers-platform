import Head from "next/head";
import { Table, Header } from "@components";
import { checkAuthentication } from "@services/pages";

import { LinkButton } from "@components";
import { User } from "@types/user";

type QueryPageCreatorProps = {
  title: string;
  addLink?: string | null | Function;
  pathName?: string | null;
  isUsePagination?: boolean;
  contextId?: string | Array<string> | null;
  queryParams: any;
  onClick?: Function;
};

interface QueryPageProps extends QueryPageCreatorProps {
  data: any;
  user: User
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
    onClick,
    user
  } = props;

  return (
    <>
      <Header role={user.role} />
      <Head>
        <title>{title}</title>
      </Head>
      {addLink ? (
        <div style={{ alignSelf: "flex-end" }}>
          <LinkButton
            link={addLink instanceof Function ? addLink(contextId) : addLink}
            text="Добавить"
            icon="&#43;&nbsp;&nbsp;"
            className="float-right"
          />
        </div>
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
        onClick={onClick}
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
              user
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

export default createQueryPage;
