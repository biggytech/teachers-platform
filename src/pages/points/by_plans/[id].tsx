import Link from "next/link";
import { Header, LinkButton } from "@components";
import { getSinglePointProps } from "@services/pages/points";
import { checkRoleAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";
import Head from "next/head";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import { useMemo } from "react";
import InfoList from "@components/InfoList";
import ButtonsRow from "@components/ButtonsRow";
import NewButton from "@components/NewButton";
import SchoolIcon from '@mui/icons-material/School';

interface SinglePointProps {
  user: User
}

const SinglePoint: React.FC<SinglePointProps> = ({ data, id, planId, mapData, user }) => {
  const items = useMemo(() => [
    {
      id: 'description',
      label: 'Описание',
      value: data.description
    },
    {
      id: 'duration_days',
      label: 'Продолжительность (дней)',
      value: data.duration_days
    }
  ], [data])

  return (
    <AppLayout userRole={user.role} title={`Пункт: ${data.title}`}>
      <InfoList items={items} />
      <ButtonsRow>
        <NewButton link={`/task_marks?plan_id=${planId}&point_id=${id}`}
          text="Оценки"
          icon={<SchoolIcon />}
        />
      </ButtonsRow>
    </AppLayout>
  );
};

const getServerSideProps = async ({ params, req, query }) => {
  return await checkRoleAuthentication({
    role: ROLES.TEACHER,
    req,
    cb: async (redirect, user) => {
      if (redirect) {
        return handleRedirectError(new RedirectError(`Redirection to ${redirect}`, redirect));
      }

      return {
        props: {
          ...(await getSinglePointProps({ id: +params.id })),
          planId: +query.plan_id || null,
          user
        },
      };
    },
  });
};

export { getServerSideProps };
export default SinglePoint;
