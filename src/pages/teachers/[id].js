import Head from "next/head";
import { UserProfile } from "../../components";

import { getSingleTeacherProps } from "../../services/pages/teachers";

const SingleTeacher = ({ data }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return <UserProfile pageType="Teacher" data={data} />;
};

const getServerSideProps = ({ params }) => {
  return {
    props: getSingleTeacherProps({ id: +params.id }),
  };
};

export { getServerSideProps };
export default SingleTeacher;
