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
  const {
    columns,
    title,
    name,
    action,
    encType,
    isEdit = false,
    id,
    data,
  } = props;

  console.log("COLUMNS:", columns);

  return (
    <>
      <Head>
        <title>
          {title} | {isEdit ? "Редактировать" : "Добавить"}
        </title>
      </Head>
      <Header />
      <Form
        name={isEdit ? `Редактирование` : `Добавить ${name}`}
        action={isEdit ? action(id) : action}
        columns={columns}
        encType={encType}
        data={data}
      />
    </>
  );
};

export const createEditPage = (props: EditPageCreatorProps) => {
  return {
    runGetServerSideProps: ({ query, req, res }) => {
      return new Promise(async (resolve) => {
        // console.log("QUERY:", query);
        await checkAuthentication({
          req,
          cb: (user) => {
            console.log("TEST!!!");
            console.log(query);
            resolve({
              query,
              req,
              res,
              userId: user.id,
              id: query?.id,
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
