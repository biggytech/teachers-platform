import { Button, Header, LinkButton } from "@components";
import { getSinglePlanProps } from "@services/pages/plans/getSinglePlanProps";
import { checkAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";
import { useCallback } from "react";

const SinglePlan = ({ data, id, mapData }) => {
  if (!data) {
    return <div>not found</div>;
  }

  const handleGenerateReport = useCallback(() => {
    window.open(`/api/generateReport?plan_id=${id}`, "_blank").focus();
  }, [id]);

  return (
    <>
      <Header />
      <section>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          {data.title}
        </h2>
        <FieldsProfile data={data} mapData={mapData} />

        <Button text="Скачать отчет" onClick={handleGenerateReport} />

        <LinkButton
          link={`/points/by_plans?plan_id=${id}`}
          text="Пункты учебной программы"
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
        props: getSinglePlanProps({ id: +params.id }),
      };
    },
  });
};

export { getServerSideProps };
export default SinglePlan;
