import Head from "next/head";

import { Form, Header } from "@components";
import { getAddTeacherProps } from "@services/pages/teachers";
import { checkAuthentication } from "@services/pages";
import { User } from "@types/user";

interface AddTeacherProps {
  user: User
}

const AddTeacher: React.FC<AddTeacherProps> = ({ columns, user }) => {
  return (
    <>
      <Header role={user.role} />
      <Head>
        <title>Инструкторы | Добавить</title>
      </Head>
      <Form
        name="Добавить инструктора"
        encType="multipart/form-data"
        action="/api/teachers/add"
        columns={columns}
      />
    </>
  );
};

const getServerSideProps = async ({ req }) => {
  return await checkAuthentication({
    req,
    cb: (user) => {
      return {
        props: {
          ...getAddTeacherProps(),
          user
        },
      };
    },
  });
};

export { getServerSideProps };
export default AddTeacher;
