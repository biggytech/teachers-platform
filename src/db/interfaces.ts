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
  teacher: Teacher;
}

export interface Plan {
  id: number;
  start_date: Date;
  student_id: number;
  program_id: number;
}

export interface PlanWithStudentAndProgram extends Plan {
  student: Student;
  program: Program;
}

export interface Material {
  id: number;
  title: string;
  description?: string;
  link?: string;
  program_id: number;
}

export interface MaterialWithProgram extends Material {
  program: Program;
}

export interface Point {
  id: number;
  title: string;
  description?: string;
  duration_days: number;
  program_id: number;
}

export interface PointWithProgram extends Point {
  program: Program;
}

export interface TaskPoint {
  task_id: number;
  point_id: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
}

export interface TaskWithPoint {
  point: Point;
}

export interface TaskMark {
  // id: number; // TODO: what to do? PRIMARY KEY(task_id, plan_id)
  mark: number;
  task_id: number;
  plan_id: number;
};

export interface TaskMarkWithTaskAndProgram extends TaskMark {
  task: Task;
  program: Program;
}