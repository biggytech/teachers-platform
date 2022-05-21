import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleProgramProps } from "@services/pages/programs";
import { checkRoleAuthentication } from "@services/pages";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import Head from "next/head";
import { ROLES, User } from "@types/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";

interface SingleProgramProps {
  user: User
}

const SingleProgram: React.FC<SingleProgramProps> = ({ data, id, mapData, user }) => {
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
      <Header role={user.role} />
      <Head>
        <title>Учебная программа: {data.title}</title>
      </Head>
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
  return await checkRoleAuthentication({
    role: ROLES.TEACHER,
    req,
    cb: (redirect, user) => {
      if (redirect) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect));
      }

      return {
        props: {
          ...getSingleProgramProps({ id: +params.id }),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SingleProgram;
