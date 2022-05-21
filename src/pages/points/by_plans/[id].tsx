import Link from "next/link";
import { Header, LinkButton } from "@components";
import { getSinglePointProps } from "@services/pages/points";
import { checkRoleAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";
import Head from "next/head";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";

interface SinglePointProps {
  user: User
}

const SinglePoint: React.FC<SinglePointProps> = ({ data, id, planId, mapData, user }) => {
  if (!data) {
    return <div>not found</div>;
  }

  return (
    <>
      <Header role={user.role} />
      <Head>
        <title>Пункт: {data.title}</title>
      </Head>
      <section style={{ padding: 10 }}>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          {data.title}
        </h2>
        <FieldsProfile data={data} mapData={mapData} />

        <LinkButton
          link={`/task_marks?plan_id=${planId}&point_id=${id}`}
          text="Оценки задач в этом пункте программы"
        />
      </section>
    </>
  );
};

const getServerSideProps = async ({ params, req, query }) => {
  return await checkRoleAuthentication({
    role: ROLES.TEACHER,
    req,
    cb: async (redirect, user) => {
      if (redirect) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect));
      }

      return {
        props: {
          ...(await getSinglePointProps({ id: +params.id })),
          planId: +query.plan_id || null,
          user
        },
      };
    },
  });
};

export { getServerSideProps };
export default SinglePoint;
