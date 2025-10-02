import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Roles } from './roles'

type PermissionByRole = (
    user: User, 
    builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Roles, PermissionByRole>= {

	ADMIN: (user, { can, cannot }) => {
        can('manage', 'all')
        cannot(['transfer_ownership', 'update'], 'Organization')
        can(['transfer_ownership', 'update'], 'Organization', {ownerId: {$eq: user.id}})
    },
	MEMBER: (user, { can }) => {
        can('get', 'User')
        can(['create', 'get'], 'Project')
        can(['delete', 'update'], 'Project', {ownerId: {$eq: user.id}})
    },
    BILLING: (_, {can}) => {
        can('manage', 'Billing')
    },
}
