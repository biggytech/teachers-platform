import Head from "next/head";
import { UserProfile, Header } from "../../components";
import { getSingleStudentProps } from "../../services/pages/students";
import { checkAuthentication } from "../../services/pages";

const SingleStudent = ({ data }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return (
    <>
      <Header />
      <UserProfile pageType="Student" data={data} />
    </>
  );
};

const getServerSideProps = async ({ params, req }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getSingleStudentProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SingleStudent;
