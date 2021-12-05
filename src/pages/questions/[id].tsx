import Link from "next/link";
import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleQuestionProps } from "@services/pages/questions/getSingleQuestionProps";
import { checkAuthentication } from "@services/pages";

const SingleQuestion = ({ data, id }) => {
  if (!data) {
    return <div>not found</div>;
  }

  return (
    <>
      <Header />
      <section>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          {data.title}
        </h2>
        <FieldsProfile data={data} />
        <LinkButton link={`/answers?question_id=${id}`} text="Answers" />
      </section>
    </>
  );
};

const getServerSideProps = async ({ params, req }) => {
  return await checkAuthentication({
    req,
    cb: () => {
      return {
        props: getSingleQuestionProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SingleQuestion;
