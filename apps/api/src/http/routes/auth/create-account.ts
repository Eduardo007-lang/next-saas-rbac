import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function CreateAccount(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/user',
		{
			schema: {
				body: {
					name: z.string(),
					email: z.string().email(),
					password: z.string().min(6),
				},
			},
		},
		() => {
			return 'User created successfully'
		}
	)
}
