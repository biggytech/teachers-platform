import schema from "@db/plans/plansSchema";
import { checkAuthentication } from "@services/api";
import programsService from "@db/programs/programsService";

const getAddPlanProps = ({ req, res, studentId }) => {
  return new Promise(async (resolve, reject) => {
    await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const { rows: programs } = await programsService.getAllBy(
          "owner_id",
          user.id,
          1,
          1000
        );

        const columns = [
          schema.column("start_date").toObject(),
          schema.column("student_id").withValue(studentId),
          schema.column("program_id").asSelectable(
            programs.map(({ id, title }) => ({
              name: id,
              displayName: title,
            }))
          ),
        ];

        resolve({
          columns,
        });
      },
    });
  });
};

export default getAddPlanProps;
