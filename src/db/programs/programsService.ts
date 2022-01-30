import Programs from "@db/programs/Programs";
import { Returning } from "@db/types";

interface Program {
  id: number;
  title: string;
  description: string;
  owner_id: number;
}

const programsService = {
  add: (program: Omit<Program, "id">): Promise<Returning<Program>> => {
    const fields: Array<keyof Omit<Program, "id">> = [
      "title",
      "description",
      "owner_id",
    ];

    return Programs.create(program, {
      fields,
      returning: true,
    }) as unknown as Promise<Returning<Program>>;
  },
};

export default programsService;
