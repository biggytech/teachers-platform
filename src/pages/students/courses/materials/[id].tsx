import { createQueryPage } from "@components/pages";
import { ROLES } from "@projectTypes/user";
import handleRedirectError from "@services/pages/handleRedirectError";
import logger from "@logger";
import materialsService from "@db/materials/materialsService";

const { runGetServerSideProps, QueryPage } = createQueryPage({
  title: "Учебные материалы",
  accessRole: ROLES.STUDENT,
  onClick: (row) => row.link,
});

const getServerSideProps = async (data) => {
  try {
    const { user, page, limit, ...props } = await runGetServerSideProps(data);

    const materials = await materialsService.getCourseMaterials(data.params.id, page, limit);
    logger.info('Materials are:', materials);

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
        name: 'link',
        displayName: "Ссылка",
      },
      {
        name: 'description',
        displayName: "Описание",
      },
      {
        name: 'course',
        displayName: "Курс",
      }
    ];

    return {
      props: {
        user,
        data: {
          columns,
          rows: materials.rows,
          totalRecords: materials.totalRecords,
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
