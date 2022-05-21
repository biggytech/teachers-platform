import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleQuestionProps } from "@services/pages/questions/getSingleQuestionProps";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES, User } from "@types/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";

interface SingleQuestionProps {
  user: User
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ data, id, mapData, user }) => {
  if (!data) {
    return <div>not found</div>;
  }

  return (
    <>
      <Header role={user.role} />
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
  return await checkRoleAuthentication({
    role: ROLES.TEACHER,
    req,
    cb: (redirect, user) => {
      if (redirect) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect));
      }

      return {
        props: {
          ...getSingleQuestionProps({ id: +params.id }),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SingleQuestion;
