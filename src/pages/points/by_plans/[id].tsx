import Link from "next/link";
import { Header, LinkButton } from "@components";
import { getSinglePointProps } from "@services/pages/points";
import { checkAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";

const SinglePoint = ({ data, id, planId, mapData }) => {
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
          link={`/task_marks?plan_id=${planId}&point_id=${id}`}
          text="Оценки задач в этом пункте программы"
        />
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
