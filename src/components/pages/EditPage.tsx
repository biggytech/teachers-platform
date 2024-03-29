import Head from "next/head";

import { Form, Header } from "@components";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import AppLayout from "@components/AppLayout";

type EditPageCreatorProps = {
  title: string;
  name: string;
  action: string;
  encType?: string;
  accessRole: ROLES
};

interface EditPageProps extends EditPageCreatorProps {
  columns: any;
  user: User
}

const EditPage = (props: EditPageProps) => {
  const {
    columns,
    title,
    name,
    action,
    encType,
    isEdit = false,
    id,
    data,
    user,
  } = props;

  return (
    <AppLayout userRole={user.role} title={`${title} | ${isEdit ? "Редактировать" : "Добавить"}`}>
      <Form
        action={isEdit ? action(id) : action}
        columns={columns}
        encType={encType}
        data={data}
      />
    </AppLayout>
  );
};

export const createEditPage = ({ accessRole, ...props }: EditPageCreatorProps) => {
  return {
    runGetServerSideProps: ({ query, req, res }): Promise<{ user: User }> => {
      return new Promise(async (resolve, reject) => {
        await checkRoleAuthentication({
          role: accessRole,
          req,
          cb: (redirect, user) => {
            if (redirect) {
              return reject(new RedirectError(`Redirection to ${redirect}`, redirect));
            }

            resolve({
              query,
              req,
              res,
              userId: user.id,
              id: query?.id,
              user
            });
          },
        });
      });
    },
    EditPage: function Component({ columns, ...otherProps }) {
      const newProps: EditPageProps = {
        ...props,
        columns,
        ...otherProps,
      };
      return <EditPage {...newProps} />;
    },
  };
};

export default createEditPage;
