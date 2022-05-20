export enum ROLES {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface User {
  role: ROLES
}