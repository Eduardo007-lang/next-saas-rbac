import {
	createMongoAbility,
	AbilityBuilder,
} from '@casl/ability'

import { z } from 'zod'

import type { 
    MongoAbility, 
    CreateAbility, 
} from '@casl/ability'
import type { User } from './models/user'
import { permissions } from './permissions'

import { userSubject } from './subjects/user'
import { projectSubject } from './subjects/project'
import { billingSubject } from './subjects/billing'
import { inviteSubject } from './subjects/invite'
import { organizationSubject } from './subjects/organization'




// type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']


const appAbilitiesSchema = z.union([
	userSubject,
	projectSubject,
	billingSubject,
	inviteSubject,
	organizationSubject,
	
	z.tuple([
		z.literal('manage'), 
		z.literal('all')
	])
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {

	const builder = new AbilityBuilder<AppAbility>(createAppAbility)

	// Verificar se a permissão do usuário existe antes de chamá-la
	if(typeof permissions[user.role] !== 'function'){
		throw new Error(`No permissions defined for role: ${user.role}`);
	}

	permissions[user.role](user, builder)

	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		}
	})

	return ability
}
