import { Header, LinkButton } from "@components";
import { FieldsProfile } from "@components";
import { checkAuthentication } from "@services/pages";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import Head from "next/head";
import { User } from "@types/user";

type SinglePageCreatorProps = {
  links: Array<{
    link: (contextId: number) => string;
    text: string;
  }> | null;
  buttons?: null;
  isEditable?: boolean;
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
    user
  } = props;

  if (!data) {
    return <div>not found</div>;
  }

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

  return (
    <>
      <Header role={user.role} />
      <Head>
        <title>{data.title}</title>
      </Head>
      <section style={{ padding: 10 }}>
        <Typography variant="h2" component="div" gutterBottom>
          {data.title}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          {isEditable && editLink ? (
            <LinkButton link={editLink(id)} text="Редактировать" />
          ) : null}
          {isDeletable && deleteLink && backLink ? (
            <Button
              variant="contained"
              endIcon={<RemoveIcon />}
              onClick={callDelete}
            >
              Удалить
            </Button>
          ) : null}
        </div>

        <FieldsProfile data={data} mapData={mapData} />

        <div style={{ justifySelf: "flex-start", alignItems: "center" }}>
          {/* {console.log(links)} */}
          {links.map(({ link, text }) => {
            return <LinkButton key={text} link={link(id)} text={text} />;
          })}
        </div>
      </section>
    </>
  );
};

export const createSinglePage = (props: SinglePageCreatorProps) => {
  return {
    runGetServerSideProps: ({ query, req, res }): Promise<object> => {
      return new Promise(async (resolve) => {
        await checkAuthentication({
          req,
          cb: (user) => {
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
