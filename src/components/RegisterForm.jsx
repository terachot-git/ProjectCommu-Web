import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../utils/validators'
// import useUserStore from '../stores/userStore'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import Button from './Button'
import { authApi } from '../api/authapi'
function RegisterForm({close}) {

	
const { handleSubmit, register, formState: { errors, isSubmitting }, reset, } = useForm({
        resolver: yupResolver(registerSchema),
    }) 
    console.log(close)
    const hdlRegister = async data => {
      
       try {
			await new Promise(resolve => setTimeout(resolve, 1000))
			const resp = await authApi.post('/register', data)
			// console.log(resp)
			toast.success(resp.data.message)
			close()
			reset()
		} catch (err) {
			const errMsg = err.response?.data?.error || err.message
			toast.error(errMsg, {
				position: "top-left",
			})
		}
    }
   


  return (
    <div className='flex flex-1  '>
						<div className="bg-base-100 w-full h-fit shadow-xl  mt-8 mx-8 px-4 py-6  bg-violet-50 ">
							<form onSubmit={handleSubmit(hdlRegister)} >
								<fieldset disabled={isSubmitting} >
									<div className="flex gap-2 flex-col ">
										<input type='text'
											className='input w-full h-8 px-2 bg-gray-100 shadow-md' 
											placeholder='Username'
											{...register('username')}
										/>
										{!errors.username?.message && <p className='text-xs text-transparent select-none'>{'for space'}</p>}
										{errors.username?.message && <p className='text-xs text-red-500'>{errors.username.message}</p>}
										<input type='password'
											className='input w-full h-8 px-2 bg-gray-100 shadow-md '
											placeholder='password'
											{...register('password')}
										/>
										{!errors.password?.message && <p className='text-xs text-transparent select-none'>{'for space'}</p>}
										{errors.password?.message && <p className='text-xs text-red-500'>{errors.password.message}</p>}
										<input type='password'
											className='input w-full h-8 px-2 bg-gray-100 shadow-md '
											placeholder='confirmpassword'
											{...register('confirmPassword')}
										/>
										{!errors.confirmPassword?.message && <p className='text-xs text-transparent select-none'>{'for space'}</p>}
										{errors.confirmPassword?.message && <p className='text-xs text-red-500'>{errors.confirmPassword.message}</p>}

										{!isSubmitting && <div className='self-end'><Button>Register</Button></div>}
										{isSubmitting && <div className='self-end'><Button>
											<div className='flex'> 
												<span>Register</span>
											<Loader className='animate-spin'/>
                                            </div>
										</Button>
										</div>}
									</div>
								</fieldset>
							</form>
						</div>
					</div>
  )
}
export default RegisterForm