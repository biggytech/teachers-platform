import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";
import studentsService from "@db/students/studentsService";
import logger from "@logger";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Мои курсы",
  accessRole: ROLES.STUDENT,
  pathName: '/students/courses'
});

const getServerSideProps = async (data) => {
  try {
    const { user, page, limit, ...props } = await runGetServerSideProps(data);

    const courses = await studentsService.getCoursesByStudent(user.id, page, limit);
    logger.info('Courses is:', courses);

    const columns = [
      {
        name: 'id',
        displayName: "Id",
      },
      {
        name: 'name',
        displayName: "Название",
      },
      {
        name: 'startDate',
        displayName: "Дата начала",
      },
      {
        name: 'endDate',
        displayName: "Дата окончания",
      },
      {
        name: 'teacher',
        displayName: "Инструктор",
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
