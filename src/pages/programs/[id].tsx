import Link from "next/link";
import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleProgramProps } from "@services/pages/programs";
import { checkAuthentication } from "@services/pages";

const SingleProgram = ({ data, id }) => {
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
        <LinkButton link={`/points?program_id=${id}`} text="Points" />

        <LinkButton link={`/materials?program_id=${id}`} text="Materials" />
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
export default SingleProgram;
