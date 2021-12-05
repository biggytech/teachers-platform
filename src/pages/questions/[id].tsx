import Link from "next/link";
import { Header, FieldsProfile } from "@components";
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
        <Link href={`/answers?question_id=${id}`}>
          <a href={`/answers?question_id=${id}`}>Answers</a>
        </Link>
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
