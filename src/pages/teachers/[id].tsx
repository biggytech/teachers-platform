import { UserProfile, Header } from "@components";
import { checkAuthentication } from "@services/pages";
import { getSingleTeacherProps } from "@services/pages/teachers";

const SingleTeacher = ({ data, mapData }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return (
    <>
      <Header />
      <UserProfile pageType="Инструктор" data={data} mapData={mapData} />
    </>
  );
};

const getServerSideProps = async ({ params, req }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getSingleTeacherProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SingleTeacher;
