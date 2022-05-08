import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleProgramProps } from "@services/pages/programs";
import { checkAuthentication } from "@services/pages";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";

const SingleProgram = ({ data, id, mapData }) => {
  if (!data) {
    return <div>not found</div>;
  }

  const callDelete = async () => {
    const result = confirm(
      "Вы уверены, что хотите удалить эту программу и все связанные с ней данные?"
    );
    if (result) {
      // TODO: make delete request
      await fetch("/api/programs/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      window.location.replace("/programs");
    }
  };

  return (
    <>
      <Header />
      <section style={{ padding: 10 }}>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          {data.title}
        </h2>
        <FieldsProfile data={data} mapData={mapData} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <LinkButton
            link={`/points?program_id=${id}`}
            text="Пункты учебной программы"
          />

          <LinkButton
            link={`/materials?program_id=${id}`}
            text="Материалы учебной программы"
          />
          <Button
            variant="contained"
            endIcon={<RemoveIcon />}
            onClick={callDelete}
          >
            Удалить
          </Button>

          <LinkButton link={`/programs/edit/${id}`} text="Редактировать" />
        </div>
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
