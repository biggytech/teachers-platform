import { Button, Header, LinkButton } from "@components";
import { getSinglePlanProps } from "@services/pages/plans/getSinglePlanProps";
import { checkRoleAuthentication } from "@services/pages";
import { FieldsProfile } from "@components";
import { useCallback, useMemo } from "react";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import InfoList from "@components/InfoList";
import ButtonsRow from "@components/ButtonsRow";
import NewButton, { ButtonColors } from "@components/NewButton";
import DownloadIcon from '@mui/icons-material/Download';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

declare var open: (url: string, target: string) => { focus: () => void };

interface SinglePlanProps {
  user: User
}

const SinglePlan: React.FC<SinglePlanProps> = ({ data, id, mapData, user }) => {
  const handleGenerateReport = useCallback(() => {
    open(`/api/generateReport?plan_id=${id}`, "_blank").focus();
  }, [id]);

  const items = useMemo(() => {
    return [
      {
        id: 'start_date',
        label: 'Дата начала',
        value: data.start_date
      },
      {
        id: 'student',
        label: 'Студент',
        value: data.student
      },
      {
        id: 'program',
        label: 'Программа',
        value: data.program
      }
    ]
  }, [data]);

  return (
    <AppLayout userRole={user.role} title={`План: ${data.program}`}>
      <InfoList items={items} />
      <ButtonsRow>
        <NewButton color={ButtonColors.success} text="Скачать отчет" onClick={handleGenerateReport} icon={<DownloadIcon />} />
        <NewButton link={`/points/by_plans?plan_id=${id}`} text="Пункты программы" icon={<FormatListBulletedIcon />} />
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
          ...(await getSinglePlanProps({ id: +params.id })),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SinglePlan;
