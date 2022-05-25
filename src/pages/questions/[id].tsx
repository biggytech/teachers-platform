import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleQuestionProps } from "@services/pages/questions/getSingleQuestionProps";
import { checkRoleAuthentication } from "@services/pages";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import { useMemo } from "react";
import InfoList from "@components/InfoList";
import ButtonsRow from "@components/ButtonsRow";
import NewButton from "@components/NewButton";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface SingleQuestionProps {
  user: User
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ data, id, mapData, user }) => {
  const items = useMemo(() => [
    {
      id: 'test',
      label: 'Тест',
      value: data.title
    },
    {
      id: 'question',
      label: 'Вопрос',
      value: data.description
    }
  ], [data])

  return (
    <AppLayout userRole={user.role} title={`Вопрос для теста: ${data.title}`}>
      <InfoList items={items} />
      <ButtonsRow>
        <NewButton link={`/answers?question_id=${id}`}
          text="Ответы на вопрос" icon={<CheckBoxIcon />} />
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
          ...(await getSingleQuestionProps({ id: +params.id })),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SingleQuestion;
