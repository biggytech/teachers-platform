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
  description: string;
  owner_id: number;
}

export interface ProgramWithTeacher extends Program {
  teacher: Teacher;
}

export interface Point {
  id: number;
  title: string;
  description: string;
  duration_days: number;
  program_id: number;
}
