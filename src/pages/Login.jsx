
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../utils/validators'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import { Weblogo } from '../icons'
import Button from '../components/Button'
import { useState } from 'react'
import Modal from 'react-modal';
import RegisterForm from '../components/RegisterForm'
import useUserStore from '../stores/userStore'
function Login() {
    const login = useUserStore(state=>state.login)
	const user = useUserStore(state => state.user)
	const [modalIsOpen, setModalIsOpen] = useState(false);
   
	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm({
		resolver: yupResolver(loginSchema),
	})

	const hdlLogin = async data => {

		try {
			console.log(data)
			await new Promise(resolve => setTimeout(resolve, 1000))
			const resp = await login(data)
			toast.success(resp.data.message)
		    // await toast.success(`Welcom ${user.username}`)
			
		} catch (err) {
			const errMsg = err.response?.data?.error || err.message
			toast(errMsg)
		}
	}
	

	return (
		<>  <div className='h-screen bg-gray-200'>
			<div className="h-[700px] pt-[15vh] pb-28">
				<div className="p-5 mx-auto max-w-screen-lg min-h-[540px] flex justify-between max-md:flex-col ">
					<div className='flex flex-1  '>
						<div className="bg-base-100 w-full h-fit shadow-xl  mt-8 mx-8 px-4 py-6 flex flex-col bg-violet-50 ">
							<form onSubmit={handleSubmit(hdlLogin)} >
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
										{!isSubmitting && <div className='self-end'><Button>Login</Button></div>}
										{isSubmitting && <div className='self-end'><Button>
											<div className='flex'>
												<span>Login</span>
												<Loader className='animate-spin' /></div>
										</Button>
										</div>}
										<div className="divider my-0"></div>

									</div>
								</fieldset>
							</form>
							<div className='self-end'>
								<Button onClick={openModal} bgColor='#FF00D4'>Create new account</Button></div>



						</div>
					</div>

					<div className='flex flex-col max-md:items-center max-md:text-center mt-20 basis-3/5 '>

						<Weblogo />
						<div className="text-4xl">  </div>
						<h2 className='text-[48px] max-md:text-[28px] leading-8 mt-8 w-[514px] self-center'>
							สร้างพื้นที่ อวดสิ่งที่ชอบ
						</h2>
					</div>

				</div>
			</div>
		</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
			    shouldCloseOnOverlayClick={false}

				overlayClassName="fixed  backdrop-blur-sm inset-0   flex justify-center items-center z-50"
			
				className="bg-white rounded-lg shadow-xl p-6 pb-20 w-full max-w-md outline-none backdrop-blur-sm flex flex-col"
			>
				<div className='self-end  '>
					<Button onClick={closeModal} bgColor='#FF0004' size='sm'>
						ปิด
					</Button>
				</div>
				
                <RegisterForm close={closeModal}/>
              
			</Modal>


		</>

	)

}

export default Login