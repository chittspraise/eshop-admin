import{z} from "zod"

export const createCategorySchema = z.object({
image: z
.any().refine(file => file.length === 1,'image is required'),
name: z
.string()
.min(2,{message:'Name must be at least 2 characters long'}),
intent:z
.enum(['create','update'],{
    message:'Intent must be either create or update',
})
.optional(),
slug: z.string().optional(),

});
export type CreateCategorySchema=z.infer<typeof createCategorySchema>

export const CreateCategorySchemaServer = z.object({
    imageUrl: z
    .string().min(1,{message:'image is required'}),
    name: z
    .string()
    .min(2,{message:'Name must be at least 2 characters long'})  
    }); 
    
    export type CreateCategorySchemaServer=z.infer<
    typeof CreateCategorySchemaServer> 

    export const updateCategorySchema=z.object({
        ImageUrl: z.string()
        .min(1,{message:'image is required'}),
        name: z
        .string()
        .min(2,{message:'Name must be at least 2 characters long'}),
        intent:z.enum(['create','update'],{
            message:'Intent must be either create or update',
        }),
        slug: z.string().min(1,{message:'slug is required'}),
        
        });
        
        export type UpdateCategorySchema=z.infer<typeof updateCategorySchema>

