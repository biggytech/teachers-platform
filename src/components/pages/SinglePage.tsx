import { Header, LinkButton } from "@components";
import { FieldsProfile } from "@components";
import { checkRoleAuthentication } from "@services/pages";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Head from "next/head";
import { ROLES, User } from "@projectTypes/user";
import RedirectError from "@lib/RedirectError";
import AppLayout from "@components/AppLayout";
import { useMemo } from "react";
import InfoList from '@components/InfoList'
import ButtonsRow from "@components/ButtonsRow";
import NewButton, { ButtonColors } from "@components/NewButton";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

type SinglePageCreatorProps = {
  links: Array<{
    link: (contextId: number) => string;
    text: string;
  }> | null;
  buttons?: null;
  isEditable?: boolean;
  accessRole: ROLES
};

interface SinglePageProps extends SinglePageCreatorProps {
  id: number;
  data?: {
    title: string;
    [key: string]: any;
  } | null;
  mapData?: {
    [ley: string]: any;
  } | null;
  user: User
}

const SinglePage = (props: SinglePageProps) => {
  const {
    data,
    id,
    mapData,
    links,
    isEditable = false,
    isDeletable = false,
    deleteLink,
    backLink,
    editLink,
    items,
    user
  } = props;

  const callDelete = async () => {
    const result = confirm("Вы уверены, что хотите удалить?");
    if (result) {
      // TODO: make delete request
      await fetch(deleteLink, {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      window.location.replace(backLink(id));
    }
  };

  console.log(data);

  return (
    <AppLayout userRole={user.role} title={data.title}>
      <InfoList items={items} />
      <ButtonsRow>
        {links.map(({ link, text, icon }) => {
          return <NewButton key={text} link={link(id)} text={text} icon={icon} />;
        })}
        {isEditable && editLink ? (
          <NewButton link={editLink(id)} text="Редактировать" color={ButtonColors.warning} icon={<DriveFileRenameOutlineIcon />} />
        ) : null}
        {isDeletable && deleteLink && backLink ? (
          <NewButton
            color={ButtonColors.error}
            text="Удалить"
            icon={<DeleteIcon />}
            onClick={callDelete}
          />
        ) : null}
      </ButtonsRow>
    </AppLayout>
  );
};

export const createSinglePage = ({ accessRole, ...props }: SinglePageCreatorProps) => {
  return {
    runGetServerSideProps: ({ query, req, res }): Promise<object> => {
      return new Promise(async (resolve, reject) => {
        await checkRoleAuthentication({
          role: accessRole,
          req,
          cb: (redirect, user) => {
            if (redirect) {
              return reject(new RedirectError(`Redirection to ${redirect}`, redirect));
            }

            resolve({
              query,
              req,
              res,
              userId: user.id,
              user
            });
          },
        });
      });
    },
    SinglePage: function Component({ ...otherProps }) {
      return <SinglePage {...props} {...otherProps} />;
    },
  };
};

export default createSinglePage;
