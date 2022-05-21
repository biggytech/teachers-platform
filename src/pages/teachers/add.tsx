import Head from "next/head";

import { Form, Header } from "@components";
import { getAddTeacherProps } from "@services/pages/teachers";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";

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
  return await checkRoleAuthentication({
    role: ROLES.TEACHER,
    req,
    cb: (redirect, user) => {
      if (redirect) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect));
      }

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
