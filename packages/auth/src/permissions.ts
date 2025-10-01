import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Roles } from './roles'

type PermissionByRole = (
    user: User, 
    builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Roles, PermissionByRole>= {

	ADMIN: (_, { can }) => {
        can('manage', 'all');
    },
	MEMBER: (user, { can }) => {
        // can('delete', 'Organization', {ownerId: { $eq: user.id }});
        can('invite', 'User');
        can(['create', 'get', 'update', 'delete'], 'Project', {ownerId: { $eq: user.id }});
    },
    BILLING: () => {},
}
