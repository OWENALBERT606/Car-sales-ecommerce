import { ProductStatus, ProductUsage, Role, User } from "@prisma/client";

export type CategoryProps = {
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
};
export type FarmProps = {
  name: string;
  slug: string;
  locationId:string;
  ownerId: string;
};
export type LocationProps = {
  name: string;
  slug: string;
};
export type UnitProps = {
  name: string;
  slug: string;
  prefix: string
};
export type SavingProps = {
  amount: number;
  month: string;
  name: string;
  userId: string;
  paymentDate: any;
};
export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};
export type LoginProps = {
  email: string;
  password: string;
};
export type ForgotPasswordProps = {
  email: string;
};

// types/types.ts

export interface RoleFormData {
  displayName: string;
  description?: string;
  permissions: string[];
}

export interface UserWithRoles extends User {
  roles: Role[];
}

export interface RoleOption {
  label: string;
  value: string;
}

export interface UpdateUserRoleResponse {
  error: string | null;
  status: number;
  data: UserWithRoles | null;
}

export interface RoleResponse {
  id: string;
  displayName: string;
  description?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type QueriesResponse = {
  data: any[];
  error?: string;
};

// For single contact queries
export type SingleQueryResponse = {
  data: any | null;
  error?: string;
};

// For mutation operations
export type MutationResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export type ProductProps = {
  name: string;
  description: any;
  price: number;
  engine:string;
  imageUrl: string;
  color: string;
  imageUrls: string[];
  status: ProductStatus; 
  usage:ProductUsage;
  typeId:string;
  yearId:string;
  modelId:string;
  makeId:string;
  steering:string;
  fuelId:string;
  rating: number;
  categoryId: string;
  unitId: string | null;
  farmId: string | null;
};
export type BannerProps = {
  title:string;
  description:string;
  imageUrl:string;
  categoryId:string;
};