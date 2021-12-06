import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleQuestionProps } from "@services/pages/questions/getSingleQuestionProps";
import { checkAuthentication } from "@services/pages";

const SingleQuestion = ({ data, id, mapData }) => {
  if (!data) {
    return <div>not found</div>;
  }

  return (
    <>
      <Header />
      <section style={{ padding: 10 }}>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          {data.title}
        </h2>
        <FieldsProfile data={data} mapData={mapData} />
        <LinkButton
          link={`/answers?question_id=${id}`}
          text="Ответы на вопрос"
        />
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
