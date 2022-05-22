import { getSinglePointProps } from "@services/pages/points";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";

import { createSinglePage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";
import BallotIcon from '@mui/icons-material/Ballot';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const { runGetServerSideProps, SinglePage } = createSinglePage({
  links: [
    {
      link: (contextId) => `/tasks?point_id=${contextId}`,
      text: "Задания",
      icon: <BorderColorIcon />
    },
    {
      link: (contextId) => `/tests?point_id=${contextId}`,
      text: "Тесты",
      icon: <BallotIcon />
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
    const addProps = (await getSinglePointProps({
      ...props,
      id: +data.params.id,
    }));

    const items = [
      {
        id: 'title',
        label: 'Название',
        value: addProps.data.title,
      },
      {
        id: 'description',
        label: 'Описание',
        value: addProps.data.description,
      },
      {
        id: 'duration_days',
        label: 'Продолжительность (дней)',
        value: addProps.data.duration_days,
      },
    ]


    return {
      props: {
        user: props.user,
        ...addProps,
        items
      },
    };
  } catch (error) {
    return handleRedirectError(error)
  }
};

export { getServerSideProps };
export default SinglePage;
