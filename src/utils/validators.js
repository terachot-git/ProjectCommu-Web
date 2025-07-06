import { object, string,  ref } from 'yup';


export const registerSchema = object({
	username: string().required().min(3),
	password: string().min(6).required(),
	confirmPassword: string().oneOf([ref("password")], `confirmPassword must match password`),
})
export const loginSchema = object({
	username: string().required(),
	password: string().min(6).required(),
})
export const createCommuSchema = object({
	communityname: string().required().min(3).max(25),
	commudetail: string(),
	membersname:string().required().min(3).max(25),
})


