import Head from "next/head";
import { UserProfile } from "../../components";
import { getSingleStudentProps } from "../../services/pages/students";

const SingleStudent = ({ data }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return <UserProfile pageType="Student" data={data} />;
};

const getServerSideProps = ({ params }) => {
  return {
    props: getSingleStudentProps({ id: +params.id }),
  };
};

export { getServerSideProps };
export default SingleStudent;
