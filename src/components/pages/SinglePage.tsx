import { Header, LinkButton } from "@components";
import { FieldsProfile } from "@components";
import { checkAuthentication } from "@services/pages";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";

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
      <Header />
      <section style={{ padding: 10 }}>
        <Typography variant="h2" component="div" gutterBottom>
          {data.title}
        </Typography>
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
        <FieldsProfile data={data} mapData={mapData} />

        <div style={{ justifySelf: "flex-start" }}>
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
