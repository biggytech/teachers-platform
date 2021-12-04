import Link from "next/link";
import { Header } from "@components";
import { getSingleProgramProps } from "@services/pages/programs";
import { checkAuthentication } from "@services/pages";

const SingleStudent = ({ data, id }) => {
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
        <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
          <label className="flex border-b border-gray-200 h-12 py-3 items-center">
            <span className="text-right px-2">Description</span>
            <span className="px-3">{data.description}</span>
          </label>
          <label className="flex border-b border-gray-200 h-12 py-3 items-center">
            <span className="text-right px-2">Owner</span>
            <span className="px-3">{data.owner}</span>
          </label>
        </fieldset>
        <Link href={`/points?program_id=${id}`}>
          <a href={`/points?program_id=${id}`}>Points</a>
        </Link>
        <Link href={`/materials?program_id=${id}`}>
          <a href={`/materials?program_id=${id}`}>Materials</a>
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
        props: getSingleProgramProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SingleStudent;
