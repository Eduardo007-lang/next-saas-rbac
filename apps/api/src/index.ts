import { defineAbilityFor, projectSchema } from '@saas/auth';


const project = projectSchema.parse({
    __typename: 'Project',
    id: 'project-id',
    name: 'New Project',
    ownerId: 'user2-id',
});

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' });

console.log(ability.can('delete', project)); // true