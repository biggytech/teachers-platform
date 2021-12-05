import Link from "next/link";
import { Header } from "@components";
import { getSinglePlanProps } from "@services/pages/plans/getSinglePlanProps";
import { checkAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";

const SinglePlan = ({ data, id }) => {
  if (!data) {
    return <div>not found</div>;
  }

  console.log(id);

  return (
    <>
      <Header />
      <section>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          {data.title}
        </h2>
        <FieldsProfile data={data} />

        <Link href={`/points/by_plans?plan_id=${id}`}>
          <a href={`/points/by_plans?plan_id=${id}`}>Points by plans</a>
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
        props: getSinglePlanProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SinglePlan;
