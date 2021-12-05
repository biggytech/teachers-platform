import Link from "next/link";
import { Header } from "@components";
import { getSinglePointProps } from "@services/pages/points";
import { checkAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";

const SinglePoint = ({ data, id }) => {
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

        {/* <Link href={`/points?program_id=${id}`}>
          <a href={`/points?program_id=${id}`}>Points</a>
        </Link> */}
        <Link href={`/tasks?point_id=${id}`}>
          <a href={`/tasks?point_id=${id}`}>Tasks</a>
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
        props: getSinglePointProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SinglePoint;
