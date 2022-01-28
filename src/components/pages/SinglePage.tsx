import { Header, LinkButton } from "@components";
import { FieldsProfile } from "@components";
import { checkAuthentication } from "@services/pages";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

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
  const { data, id, mapData, links, isEditable = false } = props;

  if (!data) {
    return <div>not found</div>;
  }

  return (
    <>
      <Header />
      <section style={{ padding: 10 }}>
        <Typography variant="h2" component="div" gutterBottom>
          {data.title}
        </Typography>
        {isEditable ? (
          <Button variant="contained" endIcon={<EditIcon />}>
            Edit
          </Button>
        ) : null}
        <FieldsProfile data={data} mapData={mapData} />

        {links.map(({ link, text }) => {
          <LinkButton key={text} link={link(id)} text={text} />;
        })}
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
