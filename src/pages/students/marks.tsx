import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";
import logger from "@logger";
import taskMarksService from "@db/task_marks/taskMarksService";
import testMarksService from "@db/test_marks/testMarksService";

enum TABS {
  TASKS = 'tasks', // default tab
  TESTS = 'tests',
}

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Мои оценки",
  accessRole: ROLES.STUDENT,
  tabs: [
    {
      query: TABS.TASKS,
      label: 'Задания'
    },
    {
      query: TABS.TESTS,
      label: 'Тесты'
    }
  ]
});

const getServerSideProps = async (data) => {
  try {
    const { user, page, limit, query, ...props } = await runGetServerSideProps(data);

    logger.info('Query is: ', query);

    let marks;

    if (query.tab === TABS.TESTS) {
      marks = await testMarksService.getStudentMarks(user.id, page, limit);
      logger.info('Test marks are:', marks);
    } else {
      marks = await taskMarksService.getStudentMarks(user.id, page, limit);
      logger.info('Task marks are:', marks);
    }

    const columns = [
      {
        name: 'id',
        displayName: "Id",
      },
      {
        name: 'title',
        displayName: query.tab === TABS.TESTS ? 'Тест' : "Задание",
      },
      {
        name: 'mark',
        displayName: "Оценка",
      },
      {
        name: 'course',
        displayName: "Курс",
      },
    ];

    return {
      props: {
        user,
        data: {
          columns,
          rows: marks.rows,
          totalRecords: marks.totalRecords,
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
