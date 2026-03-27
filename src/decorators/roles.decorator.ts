import { SetMetadata } from "@nestjs/common";
import { usersRole } from "src/enums/users.roles.enum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: usersRole[]) => SetMetadata(ROLES_KEY, roles);
