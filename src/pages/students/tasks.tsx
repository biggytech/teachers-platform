import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";
import logger from "@logger";
import tasksService from "@db/tasks/tasksService";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Задания",
  accessRole: ROLES.STUDENT,
});

const getServerSideProps = async (data) => {
  try {
    const { user, page, limit, ...props } = await runGetServerSideProps(data);

    const courses = await tasksService.getStudentTasks(user.id, page, limit);
    logger.info('Tasks are:', courses);

    const columns = [
      {
        name: 'id',
        displayName: "Id",
      },
      {
        name: 'title',
        displayName: "Название",
      },
      {
        name: 'description',
        displayName: "Описание",
      },
      {
        name: 'course',
        displayName: "Курс",
      },
      {
        name: 'point',
        displayName: "Пункт программы",
      }
    ];

    return {
      props: {
        user,
        data: {
          columns,
          rows: courses.rows,
          totalRecords: courses.totalRecords,
          pageSize: limit,
          page,
        }
      }
    };
  } catch (error) {
    return handleRedirectError(error)
  }
};

export { getServerSideProps };
export default QueryPage;
