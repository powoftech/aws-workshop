import joi from 'joi'

export const createTodoSchema = joi.object({
  title: joi.string().trim().min(1).max(255).required(),
  description: joi.string().trim().max(1000).optional().allow(''),
})

export const updateTodoSchema = joi
  .object({
    title: joi.string().trim().min(1).max(255).optional(),
    description: joi.string().trim().max(1000).optional().allow(''),
    completed: joi.boolean().optional(),
  })
  .min(1) // At least one field must be provided

export const todoIdSchema = joi.object({
  id: joi.string().trim().min(1).required(),
})
