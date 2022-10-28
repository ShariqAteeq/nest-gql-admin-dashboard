import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
  HR = 'HR',
  DEVELOPER = 'DEVELOPER',
  BOOTCAMPER = 'BOOTCAMPER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}

export enum ProjectStatus {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}

export enum EmployeeType {
  DEVELOPER = 'DEVELOPER',
  HR = 'HR',
  CLEANER = 'CLEANER',
}

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export interface Mail {
  to: string;
  subject?: string;
  html?: string;
  text?: any;
  templateId?: string;
  templateData?: any;
}

registerEnumType(Role, {
  name: 'Role',
});

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

registerEnumType(EmployeeType, {
  name: 'EmployeeType',
});
