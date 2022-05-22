import { Materials, Plans, Programs } from "@db/models";
import {
  Material,
  MaterialWithProgram,
  Program,
} from "@db/interfaces";
import { PaginatedResult, SequelizeReturning, SequelizeRowsAndCount } from "@db/types";
import { Id } from "@projectTypes/database";

interface CourseMaterial {
  id: Id;
  title: string;
  link: string;
  description?: string;
  course: string;
}

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
  getCourseMaterials: async (planId: Id, page: number, limit: number): Promise<PaginatedResult<CourseMaterial>> => {
    const attributes: Array<keyof Material> = ['id', 'title', 'link', 'description','program_id'];

    const data: SequelizeRowsAndCount<MaterialWithProgram> = await Materials.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
        include: [
            {
              model: Programs,
              as: 'program',
              include: [
                {
                  model: Plans,
                  as: 'plans',
                  where: {
                    'id': planId
                  }
                }
              ]
            }
        ]
    }) as unknown as SequelizeRowsAndCount<MaterialWithProgram>;

    const materials: CourseMaterial[] = data.rows.map(material => {
      return {
        id: material.dataValues.id,
        title: material.dataValues.title,
        link: material.dataValues.link,
        description: material.dataValues.description,
        course: material.dataValues.program.dataValues.title,
      }
    });

    return {
      rows: materials,
      totalRecords: data.count
    }
  },
  getStudentMaterials: async (studentId: Id, page: number, limit: number): Promise<PaginatedResult<CourseMaterial>> => {
    const attributes: Array<keyof Material> = ['id', 'title', 'link', 'description','program_id'];

    const data: SequelizeRowsAndCount<MaterialWithProgram> = await Materials.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
        include: [
            {
              model: Programs,
              as: 'program',
              include: [
                {
                  model: Plans,
                  as: 'plans',
                  where: {
                    'student_id': studentId
                  }
                }
              ]
            }
        ]
    }) as unknown as SequelizeRowsAndCount<MaterialWithProgram>;

    const materials: CourseMaterial[] = data.rows.map(material => {
      return {
        id: material.dataValues.id,
        title: material.dataValues.title,
        link: material.dataValues.link,
        description: material.dataValues.description,
        course: material.dataValues.program.dataValues.title,
      }
    });

    return {
      rows: materials,
      totalRecords: data.count
    }
  },
};

export default materialsService;
