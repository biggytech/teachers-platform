import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleTestProps } from "@services/pages/tests";
import { checkRoleAuthentication } from "@services/pages";
import Head from "next/head";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";

interface SingleTestProps {
  user: User
}

const SingleTest: React.FC<SingleTestProps> = ({ data, id, mapData, user }) => {
  if (!data) {
    return <div>not found</div>;
  }

  return (
    <>
      <Header role={user.role} />
      <Head>
        <title>Тест: {data.title}</title>
      </Head>
      <section style={{ padding: 10 }}>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          {data.title}
        </h2>
        <FieldsProfile data={data} mapData={mapData} />
        <LinkButton link={`/questions?test_id=${id}`} text="Вопросы к тесту" />
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
          ...getSingleTestProps({ id: +params.id }),
          user
        },
      };
    },
  });
};

export { getServerSideProps };
export default SingleTest;
