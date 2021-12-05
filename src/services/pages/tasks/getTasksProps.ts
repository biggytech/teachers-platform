import { getPointsWithPrograms } from "@db/points/index";
import schema from "@db/tasks/tasksSchema";

const getTasksProps = async ({ pointId }) => {
  const columns = [
    schema.column("id").toObject(),
    schema.column("title").toObject(),
    schema.column("description").toObject(),
  ];

  // TODO: get tasks

  //   const data = await getPointsWithPrograms({
  //     programId: program_id,
  //     columns,
  //     programColumn: schema.column("program_id").columnName,
  //   });

  //   const newColumns = columns.concat({
  //     name: schema.column("program_id").columnName,
  //     displayName: schema.column("program_id").displayName,
  //   });

  return {
    data: {
      columns: columns,
      rows: [],
    },
    pointId,
  };
};

export default getTasksProps;
