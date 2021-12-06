import { UserProfile, Header, LinkButton } from "@components";
import { getSingleStudentProps } from "@services/pages/students";
import { checkAuthentication } from "@services/pages";

const SingleStudent = ({ data, id, mapData }) => {
  if (!data) {
    return <div>not found</div>;
  }
  return (
    <>
      <Header />

      <UserProfile pageType="Студент" data={data} mapData={mapData} />
      <LinkButton link={`/plans?student_id=${id}`} text="Учебные планы" />
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
