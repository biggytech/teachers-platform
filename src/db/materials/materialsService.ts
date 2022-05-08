import { Materials, Programs } from "@db/models";
import {
  Material,
  MaterialWithProgram,
  Program,
} from "@db/interfaces";
import { SequelizeReturning } from "@db/types";

const materialsService = {
  getAllBy: async <T extends keyof Material>(
    field: T,
    value: Material[T]
  ): Promise<MaterialWithProgram[]> => {
    const data: SequelizeReturning<
    Material & {
        program: SequelizeReturning<Program>;
      }
    >[] = (await Materials.findAll({
      where: {
        [field]: value,
      },
      include: [
        {
          model: Programs,
          as: "program",
        },
      ],
    })) as unknown as SequelizeReturning<
    Material & {
        program: SequelizeReturning<Program>;
      }
    >[];

    return data.map(({ dataValues }) => ({
      ...dataValues,
      program: dataValues.program.dataValues,
    }));
  },
  add: async (material: Omit<Material, "id">): Promise<Material> => {
    const fields: Array<keyof Omit<Material, "id">> = [
      "title",
      "description",
      "link",
      "program_id",
    ];

    const created: SequelizeReturning<Material> = (await Materials.create(material, {
      fields,
      returning: true,
    })) as unknown as SequelizeReturning<Material>;

    return created.dataValues;
  },
};

export default materialsService;
