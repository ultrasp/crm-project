import { RoleAccess } from "src/app/common/enums/role-access.enum";
import { ROLES } from "src/app/common/enums/roles-enum";
import { SystemConfig } from "src/app/common/enums/system-config.enum";
import { IRole, IRoleaccess } from "src/app/main/models/role.entity";

export class AccessRoleUtility {

    private static GetRoleAccesses(roles: ROLES): IRoleaccess | undefined {
        let data: IRole[] = JSON.parse(localStorage.getItem(SystemConfig.USER_ROLES)!);
        let roleAccess = data[0]?.role_accesses;
        return roleAccess?.find(access => access.role_id == roles);
    }

    public static HasReaderAccess(roles: ROLES): boolean {
        return AccessRoleUtility.GetRoleAccesses(roles)?.access_id == RoleAccess.HasReaderAccess;
    }

    public static HasAdminAccess(roles: ROLES): boolean {
        return AccessRoleUtility.GetRoleAccesses(roles)?.access_id == RoleAccess.HasAdminAccess;
    }

    public static HasAuthorAccess(roles: ROLES): boolean {
        return AccessRoleUtility.GetRoleAccesses(roles)?.access_id == RoleAccess.HasAuthorAccess;
    }

    public static HasWriterAccess(roles: ROLES): boolean {
        return AccessRoleUtility.GetRoleAccesses(roles)?.access_id == RoleAccess.HasWriterAccess;
    }

    public static IsReadOnlyAccess(roles: ROLES): boolean {
        return AccessRoleUtility.GetRoleAccesses(roles)?.access_id == RoleAccess.IsReadOnlyAccess;
    }

    public static IsAdmin(): boolean {
        return AccessRoleUtility.GetRoleAccesses(ROLES.Administrator)?.access_id == RoleAccess.HasAdminAccess;
    }
}