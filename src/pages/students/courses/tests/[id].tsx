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

    const tests = await testsService.getCourseTests(data.params.id, page, limit);
    logger.info('Tests are:', tests);

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
          rows: tests.rows,
          totalRecords: tests.totalRecords,
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
