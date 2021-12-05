import Head from "next/head";
import Link from "next/link";
import { UserProfile, Header, LinkButton } from "@components";
import { getSingleStudentProps } from "@services/pages/students";
import { checkAuthentication } from "@services/pages";

const SingleStudent = ({ data, id }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return (
    <>
      <Header />

      <UserProfile pageType="Student" data={data} />
      <LinkButton link={`/plans?student_id=${id}`} text="Plans" />
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
