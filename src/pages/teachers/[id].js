import Head from "next/head";
import { UserProfile, Header } from "../../components";
import { checkAuthentication } from "../../services/pages";
import { getSingleTeacherProps } from "../../services/pages/teachers";

const SingleTeacher = ({ data }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return (
    <>
      <Header />
      <UserProfile pageType="Teacher" data={data} />
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
