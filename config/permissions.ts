// permissions.ts

export type Permission = {
  create: string;
  read: string;
  update: string;
  delete: string;
};

export type ModulePermissions = {
  display: string;
  name: string;
  permissions: Permission;
};

export const permissions: ModulePermissions[] = [
  {
    display: "Dashboard",
    name: "dashboard",
    permissions: {
      create: "dashboard.create",
      read: "dashboard.read",
      update: "dashboard.update",
      delete: "dashboard.delete",
    },
  },
  {
    display: "Users",
    name: "users",
    permissions: {
      create: "users.create",
      read: "users.read",
      update: "users.update",
      delete: "users.delete",
    },
  },
  {
    display: "Roles",
    name: "roles",
    permissions: {
      create: "roles.create",
      read: "roles.read",
      update: "roles.update",
      delete: "roles.delete",
    },
  },
  {
    display: "Sales",
    name: "sales",
    permissions: {
      create: "sales.create",
      read: "sales.read",
      update: "sales.update",
      delete: "sales.delete",
    },
  },
  {
    display: "Car types",
    name: "types",
    permissions: {
      create: "types.create",
      read: "types.read",
      update: "types.update",
      delete: "types.delete",
    },
  },
  {
    display: "Models",
    name: "models",
    permissions: {
      create: "models.create",
      read: "models.read",
      update: "models.update",
      delete: "models.delete",
    },
  },
   {
    display: "Years",
    name: "years",
    permissions: {
      create: "years.create",
      read: "years.read",
      update: "years.update",
      delete: "years.delete",
    },
  },
   {
    display: "Fuels",
    name: "fuel",
    permissions: {
      create: "fuels.create",
      read: "fuels.read",
      update: "fuels.update",
      delete: "fuels.delete",
    },
  },
   {
    display: "Make",
    name: "make",
    permissions: {
      create: "make.create",
      read: "make.read",
      update: "make.update",
      delete: "make.delete",
    },
  },
  {
    display: "Customers",
    name: "customers",
    permissions: {
      create: "customers.create",
      read: "customers.read",
      update: "customers.update",
      delete: "customers.delete",
    },
  },
  {
    display: "Orders",
    name: "orders",
    permissions: {
      create: "orders.create",
      read: "orders.read",
      update: "orders.update",
      delete: "orders.delete",
    },
  },
  {
    display: "Profile",
    name: "profile",
    permissions: {
      create: "orders.create",
      read: "orders.read",
      update: "orders.update",
      delete: "orders.delete",
    },
  },
  {
    display: "Settings",
    name: "settings",
    permissions: {
      create: "settings.create",
      read: "settings.read",
      update: "settings.update",
      delete: "settings.delete",
    },
  },
  {
    display: "Categories",
    name: "categories",
    permissions: {
      create: "categories.create",
      read: "categories.read",
      update: "categories.update",
      delete: "categories.delete",
    },
  },
  {
    display: "Products",
    name: "products",
    permissions: {
      create: "products.create",
      read: "products.read",
      update: "products.update",
      delete: "products.delete",
    },
  },
  {
    display: "Banners",
    name: "banners",
    permissions: {
      create: "banners.create",
      read: "banners.read",
      update: "banners.update",
      delete: "banners.delete",
    },
  },
];

// Helper function to get all permission strings
export function getAllPermissions(): string[] {
  return permissions.flatMap((module) => Object.values(module.permissions));
}

// Helper function to check if a permission exists
export function isValidPermission(permission: string): boolean {
  return getAllPermissions().includes(permission);
}

// Helper to get module permissions by name
export function getModulePermissions(
  moduleName: string
): Permission | undefined {
  const module = permissions.find((m) => m.name === moduleName);
  return module?.permissions;
}

// Type for the permissions object
export type PermissionsType = {
  [K in (typeof permissions)[number]["name"]]: Permission;
};
