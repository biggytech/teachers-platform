import schema from "@db/plans/plansSchema";
import { checkAuthentication } from "@services/api";
import programsService from "@db/programs/programsService";
import checkRoleAuthentication from "../checkRoleAuthentication";
import { ROLES } from "@types/user";

const getAddPlanProps = ({ req, res, studentId, user }) => {
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

  return ({
    columns,
  });
};

export default getAddPlanProps;
