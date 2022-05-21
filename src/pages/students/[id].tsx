import { UserProfile, Header, LinkButton } from "@components";
import { getSingleStudentProps } from "@services/pages/students";
import { checkRoleAuthentication } from "@services/pages";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";

interface SingleStudentProps {
  user: User
}

const SingleStudent: React.FC<SingleStudentProps> = ({ data, id, mapData, user }) => {
  if (!data) {
    return <div>not found</div>;
  }

  const callDelete = async () => {
    const result = confirm(
      "Вы уверены, что хотите удалить этого студента и все связанные с ним данные?"
    );
    if (result) {
      // TODO: make delete request
      await fetch("/api/students/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      window.location.replace("/students");
    }
  };

  return (
    <>
      <Header role={user.role} />

      <UserProfile pageType="Студент" data={data} mapData={mapData} />
      <div
        style={{
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
        }}
      >
        <LinkButton link={`/plans?student_id=${id}`} text="Учебные планы" />
        <Button
          variant="contained"
          endIcon={<RemoveIcon />}
          onClick={callDelete}
        >
          Удалить
        </Button>
      </div>
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
          ...getSingleStudentProps({ id: +params.id }),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SingleStudent;
