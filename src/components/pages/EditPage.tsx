import Head from "next/head";

import { Form, Header } from "@components";
import { checkAuthentication } from "@services/pages";

type EditPageCreatorProps = {
  title: string;
  name: string;
  action: string;
  encType?: string;
};

interface EditPageProps extends EditPageCreatorProps {
  columns: any;
}

const EditPage = (props: EditPageProps) => {
  const { columns, title, name, action, encType } = props;

  return (
    <>
      <Head>
        <title>{title} | Добавить</title>
      </Head>
      <Header />
      <Form
        name={`Добавить ${name}`}
        action={action}
        columns={columns}
        encType={encType}
      />
    </>
  );
};

export const createEditPage = (props: EditPageCreatorProps) => {
  return {
    runGetServerSideProps: ({ query, req, res }) => {
      return new Promise(async (resolve) => {
        await checkAuthentication({
          req,
          cb: (user) => {
            resolve({
              query,
              req,
              res,
              userId: user.id,
            });
          },
        });
      });
    },
    EditPage: function Component({ ...otherProps }) {
      return <EditPage {...props} {...otherProps} />;
    },
  };
};

export default createEditPage;
