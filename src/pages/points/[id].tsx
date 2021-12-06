import { Header, LinkButton } from "@components";
import { getSinglePointProps } from "@services/pages/points";
import { checkAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";

const SinglePoint = ({ data, id, mapData }) => {
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
          link={`/tasks?point_id=${id}`}
          text="Практические задания пункта программы"
        />

        <LinkButton
          link={`/tests?point_id=${id}`}
          text="Тесты пункта программы"
        />
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
