import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleTestProps } from "@services/pages/tests";
import { checkAuthentication } from "@services/pages";

const SingleTest = ({ data, id, mapData }) => {
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
        <LinkButton link={`/questions?test_id=${id}`} text="Вопросы к тесту" />
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
