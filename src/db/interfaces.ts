import { Id } from "@projectTypes/database";
import { SequelizeReturning } from "./types";

export interface Teacher {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  picture?: Buffer;
}

export type TeacherSafeInfo = Omit<Teacher, "password">;
export type TeacherMainInfo = Omit<Teacher, "password" | "picture">;

export interface Student {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  picture?: Buffer;
  teacher_id: number;
}

export type StudentSafeInfo = Omit<Student, "password">;
export type StudentMainInfo = Omit<Student, "password" | "picture">;

export interface Program {
  id: number;
  title: string;
  description?: string;
  owner_id: number;
}

export interface ProgramWithTeacher extends Program {
  teacher: SequelizeReturning<Teacher>
}

export interface ProgramWithTeacherAndPoints extends Program {
  teacher: SequelizeReturning<Teacher>
  points: SequelizeReturning<Point>[]
}

export interface ProgramWithMaterials extends Program {
  materials: SequelizeReturning<Material>[]
}

export interface Plan {
  id: number;
  start_date: Date;
  student_id: number;
  program_id: number;
}

export interface PlanWithProgram extends Plan {
  program: SequelizeReturning<Program>;
}

export interface PlanWithStudentAndProgram extends PlanWithProgram {
  student: SequelizeReturning<Student>;
}

export interface PlanWithMaterials extends Plan {
  program: SequelizeReturning<ProgramWithMaterials>
}

export interface PlanWithProgramAndTeacher extends Plan {
  program: SequelizeReturning<ProgramWithTeacherAndPoints>;
}

export interface Material {
  id: Id;
  title: string;
  description?: string;
  link: string;
  program_id: number;
}

export interface MaterialWithProgram extends Material {
  program: SequelizeReturning<Program>;
}

export interface Point {
  id: number;
  title: string;
  description?: string;
  duration_days: number;
  program_id: number;
}

export interface PointWithProgram extends Point {
  program: SequelizeReturning<Program>;
}

export interface TaskPoint {
  task_id: number;
  point_id: number;
}

export interface Task {
  id: Id;
  title: string;
  description?: string;
}

export interface TaskWithPoints extends Task {
  points: SequelizeReturning<PointWithProgram>[];
}

export interface TaskWithPointsAndMarks extends TaskWithPoints {
  taskMarks: SequelizeReturning<TaskMark>[];
}

export interface TaskMark {
  mark: number;
  task_id: number;
  plan_id: number;
};

export interface TaskMarkWithTaskAndPlan extends TaskMark {
  task: SequelizeReturning<Task>;
  plan: SequelizeReturning<PlanWithProgram>;
}

export interface Test {
  id: number;
  title: string;
  description?: string;
};

export interface TestWithPoint extends Test {
  point: Point;
};

export interface TestWithPoints extends Test {
  points: SequelizeReturning<PointWithProgram>[];
}

export interface TestWithPointsAndMarks extends TestWithPoints {
  testMarks: SequelizeReturning<TestMark>[];
}

export interface TestPoint {
  test_id: number;
  point_id: number;
}

export interface TestWithQuestionsAndAnswers extends Test {
  questions: SequelizeReturning<QuestionWithAnswers>[];
  testMarks: SequelizeReturning<TestMark>[]
}

export interface TestWithFullQuestionsAndAnswers extends Test {
  questions: SequelizeReturning<QuestionWithFullAnswers>[];
}

export interface Question {
  id: Id;
  description: string;
  test_id: number;
}

export interface QuestionWithTest extends Question {
  test: Test;
}

export interface QuestionWithAnswers extends Question {
  answers: SequelizeReturning<AnswerWithoutIsCorrect>[]
}

export interface QuestionWithFullAnswers extends Question {
  answers: SequelizeReturning<Answer>[]
}

export interface Answer {
  id: Id;
  description: string;
  is_correct: boolean;
  question_id: number;
}


export type AnswerWithoutIsCorrect = Omit<Answer, 'is_correct'>
export interface AnswerWithQuestion extends Answer {
  question: Question;
}

export interface TestMark {
  mark: number;
  test_id: number;
  plan_id: number;
};

export interface TestMarkWithTestAndProgram extends TestMark {
  test: Test;
  program: Program;
}

export interface TestMarkWithTestAndPlan extends TestMark {
  test: SequelizeReturning<Test>;
  plan: SequelizeReturning<PlanWithProgram>;
}