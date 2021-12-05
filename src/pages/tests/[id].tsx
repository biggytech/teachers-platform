import Link from "next/link";
import { Header, FieldsProfile } from "@components";
import { getSingleTestProps } from "@services/pages/tests";
import { checkAuthentication } from "@services/pages";

const SingleTest = ({ data, id }) => {
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
        <Link href={`/questions?test_id=${id}`}>
          <a href={`/questions?test_id=${id}`}>Questions</a>
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
        props: getSingleTestProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SingleTest;
