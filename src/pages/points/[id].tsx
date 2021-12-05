import Link from "next/link";
import { Header, LinkButton } from "@components";
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

        <LinkButton link={`/tasks?point_id=${id}`} text="Tasks" />

        <LinkButton link={`/tests?point_id=${id}`} text="Tests" />
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
