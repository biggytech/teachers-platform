import schema from "@db/plans/plansSchema";
import programsSchema from "@db/programs/schema";
import { getProgramsByTeacher } from "@db/programs";
import { checkAuthentication } from "@services/api";

const getAddPlanProps = ({ req, res, studentId }) => {
  return new Promise(async (resolve, reject) => {
    await checkAuthentication({
      req,
      res,
      cb: async (user) => {
        const programs = await getProgramsByTeacher({
          teacherId: user.id,
          columns: [
            programsSchema.column("id").toObject(),
            programsSchema.column("title").toObject(),
          ],
        });

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
