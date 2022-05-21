import { UserProfile, Header } from "@components";
import RedirectError from "@lib/RedirectError";
import { checkRoleAuthentication } from "@services/pages";
import handleRedirectError from "@services/pages/handleRedirectError";
import { getSingleTeacherProps } from "@services/pages/teachers";
import { ROLES, User } from "@projectTypes/user";

interface SingleTeacherProps {
  user: User
}

const SingleTeacher: React.FC<SingleTeacherProps> = ({ data, mapData, user }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return (
    <>
      <Header role={user.role} />
      <UserProfile pageType="Инструктор" data={data} mapData={mapData} />
    </>
  );
};

const getServerSideProps = async ({ params, req }) => {
  return await checkRoleAuthentication({
    role: ROLES.TEACHER,
    req,
    cb: (redirect, user) => {
      if (redirect) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect));
      }

      return {
        props: {
          ...getSingleTeacherProps({ id: +params.id }),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SingleTeacher;
