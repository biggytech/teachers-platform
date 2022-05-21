import { getSinglePointProps } from "@services/pages/points";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";

import { createSinglePage } from "@components/pages";
import { ROLES } from "@types/user";
import handleRedirectError from "@services/pages/handleRedirectError";

const { runGetServerSideProps, SinglePage } = createSinglePage({
  links: [
    {
      link: (contextId) => `/tasks?point_id=${contextId}`,
      text: "Практические задания пункта программы",
    },
    {
      link: (contextId) => `/tests?point_id=${contextId}`,
      text: "Тесты пункта программы",
    },
  ],
  isEditable: true,
  isDeletable: true,
  deleteLink: "/api/points/delete",
  editLink: (id) => `/points/edit/${id}`,
  backLink: (contextId) => `/programs`, // TODO: back to program,
  accessRole: ROLES.TEACHER
});

const getServerSideProps = async (data) => {
  try {
    const props = await runGetServerSideProps(data);
    return {
      props: {
        ...props,
        ...(await getSinglePointProps({
          ...props,
          id: +data.params.id,
        }))
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }
};

export { getServerSideProps };
export default SinglePage;
