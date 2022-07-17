import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
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
}

export interface Mail {
  to: string;
  subject?: string;
  html?: string;
  text?: any;
  templateId?: string;
  templateData?: any;
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

registerEnumType(UserStatus, {
  name: 'UserStatus',
});
