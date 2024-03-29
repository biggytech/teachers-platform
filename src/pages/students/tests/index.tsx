import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";
import logger from "@logger";
import testsService from "@db/tests/testsService";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Тесты",
  accessRole: ROLES.STUDENT,
  pathName: '/students/tests'
});

const getServerSideProps = async (data) => {
  try {
    const { user, page, limit, ...props } = await runGetServerSideProps(data);

    const courses = await testsService.getStudentTests(user.id, page, limit);
    logger.info('Tests are:', courses);

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
      },
      {
        name: 'mark',
        displayName: "Оценка",
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
