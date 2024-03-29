import { Table } from "@components";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import { Id } from "@projectTypes/database";
import NewButton, { ButtonColors } from "@components/NewButton";
import AddIcon from '@mui/icons-material/Add';
import AppLayout from "@components/AppLayout";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";

interface ITab {
  query: string;
  label: string;
}

type QueryPageCreatorProps = {
  title: string;
  addLink?: string | null | Function;
  pathName?: string | null;
  isUsePagination?: boolean;
  contextId?: string | Array<string> | null;
  queryParams?: any;
  onClick?: Function;
  accessRole: ROLES;
  tabs?: ITab[]
};

interface QueryPageProps extends QueryPageCreatorProps {
  data: any;
  user: User;
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
    user,
    tabs
  } = props;
  const [activeTab, setActiveTab] = useState(tabs?.length ? tabs[0].query : null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const activeTab = searchParams.get('tab');
    if (activeTab) {
      setActiveTab(activeTab)
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== activeTab) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("tab", newValue);
      window.location.search = searchParams.toString();
    }
  };

  return (
    <AppLayout userRole={user.role} title={title} isNarrow={false}>
      {addLink ? (
        <div style={{ alignSelf: "flex-end", margin: '1em' }}>
          <NewButton
            link={addLink instanceof Function ? addLink(contextId) : addLink}
            text="Добавить"
            icon={<AddIcon />}
            color={ButtonColors.success}
          />
        </div>
      ) : null}
      {tabs ? (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '0.5rem' }}>
          <Tabs value={activeTab} onChange={handleChange}>
            {tabs.map(({ query, label }) => <Tab key={query} value={query} label={label} />)}
          </Tabs>
        </Box>
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
    </AppLayout>
  );
};

export const createQueryPage = ({ accessRole,
  ...props }: QueryPageCreatorProps) => {
  return {
    runGetServerSideProps: ({ query, req }): Promise<{
      page: number,
      limit: number,
      userId: Id,
      query: any,
      user: User
    }> => {
      return new Promise(async (resolve, reject) => {
        await checkRoleAuthentication({
          role: accessRole,
          req,
          cb: (redirect, user) => {
            if (redirect) {
              return reject(new RedirectError(`Redirection to ${redirect}`, redirect));
            }

            resolve({
              page: +query.page || 1,
              limit: +query.limit || 5,
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
