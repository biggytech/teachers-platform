import { UserProfile, Header } from "@components";
import { checkAuthentication } from "@services/pages";
import { getSingleTeacherProps } from "@services/pages/teachers";
import { User } from "@types/user";

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
  return await checkAuthentication({
    req,
    cb: (user) => {
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
