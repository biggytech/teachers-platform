import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleTestProps } from "@services/pages/tests";
import { checkRoleAuthentication } from "@services/pages";
import Head from "next/head";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import { useMemo } from "react";
import InfoList from "@components/InfoList";
import ButtonsRow from "@components/ButtonsRow";
import NewButton from "@components/NewButton";
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';

interface SingleTestProps {
  user: User
}

const SingleTest: React.FC<SingleTestProps> = ({ data, id, mapData, user }) => {
  const items = useMemo(() => [
    {
      id: 'description',
      label: 'Описание',
      value: data.description
    }
  ], [data]);

  return (
    <AppLayout userRole={user.role} title={`Тест: ${data.title}`}>
      <InfoList items={items} />
      <ButtonsRow>
        <NewButton link={`/questions?test_id=${id}`} text="Вопросы" icon={<QuestionMarkIcon />} />
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
          ...(await getSingleTestProps({ id: +params.id })),
          user
        },
      };
    },
  });
};

export { getServerSideProps };
export default SingleTest;
