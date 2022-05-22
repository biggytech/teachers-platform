import { Plans, Points, Programs, Students, Teachers } from "@db/models";
import {
  PaginatedResult,
  SequelizeReturning,
  SequelizeRowsAndCount,
} from "@db/types";
import hashPassword from "@services/hashPassword";
import { Plan, PlanWithProgramAndTeacher, Student, StudentMainInfo, StudentSafeInfo } from "@db/interfaces";
import { Id } from "@projectTypes/database";
import logger from "@logger";
import { formatDateToGeneral } from "@services/dates";

export interface Course {
  id: Id;
  name: string;
  startDate: string;
  endDate: string;
  teacher: string;
}

const studentsService = {
  add: async (student: Omit<Student, "id">): Promise<Student> => {
    const preparedStudent = {
      ...student,
      password: hashPassword(student.password),
    };

    const fields: Array<keyof Omit<Student, "id">> = [
      "username",
      "firstname",
      "lastname",
      "password",
      "picture",
      "teacher_id",
    ];

    const created: SequelizeReturning<Student> = (await Students.create(
      preparedStudent,
      {
        fields,
        returning: true,
      }
    )) as unknown as SequelizeReturning<Student>;

    return created.dataValues;
  },
  getAll: async (
    page: number,
    limit: number
  ): Promise<PaginatedResult<StudentMainInfo>> => {
    const attributes: Array<keyof StudentMainInfo> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "teacher_id",
    ];

    const data: SequelizeRowsAndCount<StudentMainInfo> =
      (await Students.findAndCountAll({
        attributes,
        offset: (page - 1) * limit,
        limit,
      })) as unknown as SequelizeRowsAndCount<StudentMainInfo>;

    return {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };
  },
  getAllBy: async <T extends keyof StudentMainInfo>(
    field: T,
    value: Student[T],
    page: number,
    limit: number
  ): Promise<PaginatedResult<StudentMainInfo>> => {
    const attributes: Array<keyof StudentMainInfo> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "teacher_id",
    ];

    const data: SequelizeRowsAndCount<StudentMainInfo> =
      (await Students.findAndCountAll({
        attributes,
        offset: (page - 1) * limit,
        limit,
        where: {
          [field]: value,
        },
      })) as unknown as SequelizeRowsAndCount<StudentMainInfo>;

    return {
      rows: data.rows.map(({ dataValues }) => dataValues),
      totalRecords: data.count,
    };
  },
  get: async (id: Student["id"]): Promise<StudentSafeInfo | null> => {
    const attributes: Array<keyof StudentSafeInfo> = [
      "id",
      "username",
      "firstname",
      "lastname",
      "picture",
      "teacher_id",
    ];

    const data: SequelizeReturning<StudentSafeInfo> | null =
      (await Students.findByPk(id, {
        attributes,
      })) as unknown as SequelizeReturning<StudentSafeInfo> | null;

    return data?.dataValues ?? null;
  },
  getOneBy: async <T extends keyof StudentMainInfo>(
    field: T,
    value: Student[T]
  ): Promise<Student | null> => {
    const data: SequelizeReturning<Student> | null = (await Students.findOne({
      where: {
        [field]: value,
      },
    })) as unknown as SequelizeReturning<Student> | null;

    return data?.dataValues ?? null;
  },
  delete: async (id: Id) => {
    await Students.destroy({ where: { id } });
  },
  getCoursesByStudent: async (studentId: Id, page: number, limit: number): Promise<PaginatedResult<Course>> => {
    const attributes: Array<keyof Plan> = ["id", "start_date", "student_id", "program_id"];

    const data: SequelizeRowsAndCount<PlanWithProgramAndTeacher> = await Plans.findAndCountAll({
      attributes,
      offset: (page - 1) * limit,
        limit,
      where: {
        "student_id": studentId
      },
      include: [
        {
          model: Programs,
          as: "program",
          include: [
            {
              model: Teachers,
              as: "teacher"
            },
            {
              model: Points,
              as: 'points'
            }
          ]
        },        
      ]
    }) as unknown as SequelizeRowsAndCount<PlanWithProgramAndTeacher>;

    const courses: Course[] = data.rows.map(row => {
      const points = row.dataValues.program.dataValues.points;

      const startDate = new Date(row.dataValues.start_date);
      const programDuration = points.reduce((sum, point) => sum + point.dataValues.duration_days, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + programDuration);

      return {
        id: row.dataValues.id,
        name: row.dataValues.program.dataValues.title,
        startDate: formatDateToGeneral(startDate),
        endDate: formatDateToGeneral(endDate),
        teacher: row.dataValues.program.dataValues.teacher.dataValues.firstname + ' ' + row.dataValues.program.dataValues.teacher.dataValues.lastname
      }
    });

    return {
      rows: courses,
      totalRecords: data.count,
    };
  },
  getSingleCourse: async (courseId: Id): Promise<Course | null> => {
const attributes: Array<keyof Plan> = ["id", "start_date", "student_id", "program_id"];

    const data: SequelizeReturning<PlanWithProgramAndTeacher> = await Plans.findByPk(courseId, {
      attributes,
      include: [
        {
          model: Programs,
          as: "program",
          include: [
            {
              model: Teachers,
              as: "teacher"
            },
            {
              model: Points,
              as: 'points'
            }
          ]
        },        
      ]
    }) as unknown as SequelizeReturning<PlanWithProgramAndTeacher>;

    if (!data?.dataValues) return null;

      const points = data.dataValues.program.dataValues.points;

      const startDate = new Date(data.dataValues.start_date);
      const programDuration = points.reduce((sum, point) => sum + point.dataValues.duration_days, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + programDuration);

      return {
        id: data.dataValues.id,
        name: data.dataValues.program.dataValues.title,
        startDate: formatDateToGeneral(startDate),
        endDate: formatDateToGeneral(endDate),
        teacher: data.dataValues.program.dataValues.teacher.dataValues.firstname + ' ' + data.dataValues.program.dataValues.teacher.dataValues.lastname
      }
  }
};

export default studentsService;
