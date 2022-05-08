import { getSinglePointProps } from "@services/pages/points";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";

import { createSinglePage } from "@components/pages";

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
  backLink: (contextId) => `/programs`, // TODO: back to program
});

const getServerSideProps = async (data) => {
  const props = await runGetServerSideProps(data);
  // console.log("PROPS:", props);
  return {
    props: await getSinglePointProps({
      ...props,
      id: +data.params.id,
    }),
  };
};

export { getServerSideProps };
export default SinglePage;
