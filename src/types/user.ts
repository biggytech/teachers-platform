import { Id } from '@types/database'

export enum ROLES {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface User {
  id: Id;
  role: ROLES;
}