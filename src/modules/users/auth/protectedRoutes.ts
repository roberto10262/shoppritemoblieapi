import { Role } from "@prisma/client";

interface IprotectedRoute {
  path: string;
  roles: Role[];
}

const isRouteProtected = (path: string, protectedRoutes: IprotectedRoute[]) => {
  const protectedRoute = protectedRoutes.find((route) => route.path === path);

  if (protectedRoute) return protectedRoute;

  return !!protectedRoute;
};

export { IprotectedRoute,isRouteProtected };
