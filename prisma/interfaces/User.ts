import { Prisma } from '@prisma/client';
import { UserArgs } from "@prisma/client/runtime/library";

export interface UserDocument {
  first_name: string;
  last_name: string;
  email: string;
  confirmEmail?: boolean;
  role?: string | undefined;
  age?: number | null; 
  phone?: string | null; 
  password: string;
}