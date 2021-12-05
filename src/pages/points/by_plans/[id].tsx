import Link from "next/link";
import { Header } from "@components";
import { getSinglePointProps } from "@services/pages/points";
import { checkAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";

const SinglePoint = ({ data, id, planId }) => {
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

        <Link href={`/task_marks?plan_id=${planId}&point_id=${id}`}>
          <a href={`/task_marks?plan_id=${planId}&point_id=${id}`}>
            Tasks marks
          </a>
        </Link>
      </section>
    </>
  );
};

const getServerSideProps = async ({ params, req, query }) => {
  return await checkAuthentication({
    req,
    cb: async () => {
      return {
        props: {
          ...(await getSinglePointProps({ id: +params.id })),
          planId: +query.plan_id || null,
        },
      };
    },
  });
};

export { getServerSideProps };
export default SinglePoint;
