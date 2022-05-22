import { Header, FieldsProfile, LinkButton } from "@components";
import { getSingleProgramProps } from "@services/pages/programs";
import { checkRoleAuthentication } from "@services/pages";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import Head from "next/head";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import handleRedirectError from "@services/pages/handleRedirectError";
import AppLayout from "@components/AppLayout";
import logger from "@logger";
import { useMemo } from "react";
import InfoList from "@components/InfoList";
import ButtonsRow from "@components/ButtonsRow";
import NewButton, { ButtonColors } from "@components/NewButton";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

interface SingleProgramProps {
  user: User
}

const SingleProgram: React.FC<SingleProgramProps> = ({ data, id, user }) => {
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

  logger.info('Program data: ', data);

  const items = useMemo(() => {
    return [
      {
        id: 'title',
        label: 'Название',
        value: data.title
      },
      {
        id: 'description',
        label: 'Описание',
        value: data.description
      },
      {
        id: 'teacher',
        label: 'Инструктор',
        value: data.owner
      }
    ];
  }, [data]);

  return (
    <AppLayout userRole={user.role} title={`Учебная программа: "${data.title}"`}>
      <InfoList items={items} />
      <ButtonsRow>
        <NewButton link={`/points?program_id=${id}`} text="Пункты" icon={<FormatListBulletedIcon />} />
        <NewButton link={`/materials?program_id=${id}`} text="Учебные материалы" icon={<AutoStoriesIcon />} />
        <NewButton color={ButtonColors.warning} link={`/programs/edit/${id}`} text="Редактировать" icon={<DriveFileRenameOutlineIcon />} />
        <NewButton color={ButtonColors.error} text="Удалить" icon={<RemoveIcon />} onClick={callDelete} />
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
          ...(await getSingleProgramProps({ id: +params.id })),
          user
        }
      };
    },
  });
};

export { getServerSideProps };
export default SingleProgram;
