import { UserProfile } from "@components";
import { getSingleStudentProps } from "@services/pages/students";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import ButtonsRow from "@components/ButtonsRow";
import NewButton, { ButtonColors } from "@components/NewButton";
import TocIcon from '@mui/icons-material/Toc';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <AppLayout userRole={user.role} title={`Студент: ${data.firstname} ${data.lastname}`}>
      <UserProfile pageType="Студент" data={data} mapData={mapData} />
      <ButtonsRow>
        <NewButton link={`/plans?student_id=${id}`} text="Учебные планы" icon={<TocIcon />} />
        <NewButton text="Удалить" color={ButtonColors.error} icon={<DeleteIcon />} onClick={callDelete} />
      </ButtonsRow>
    </AppLayout>
  );
};

const getServerSideProps = async ({ params, req }) => {
  return await checkRoleAuthentication({
    role: ROLES.TEACHER,
    req,
    cb: async (redirect, user) => {
      if (redirect) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect));
      }
      return {
        props: {
          ...(await getSingleStudentProps({ id: +params.id })),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SingleStudent;
