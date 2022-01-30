import Programs from "@db/programs/Programs";
import { SequelizeReturning } from "@db/types";

interface Program {
  id: number;
  title: string;
  description: string;
  owner_id: number;
}

const programsService = {
  add: async (program: Omit<Program, "id">): Promise<Program> => {
    const fields: Array<keyof Omit<Program, "id">> = [
      "title",
      "description",
      "owner_id",
    ];

    const created: SequelizeReturning<Program> = (await Programs.create(
      program,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Program>;

    return created.dataValues;
  },
};

export default programsService;
