import { create } from 'zustand'
import { authApi } from '../api/authapi'
import { persist, createJSONStorage } from 'zustand/middleware'
import { userApi } from '../api/userapi'
const useUserStore = create(persist((set, get) => ({
	user: null,
	token: '',
	actionfecthuser: async () => {
		 const token = get().token; 
            if (!token) return;
		const rs = await userApi.get('/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
		set({user: rs.data.user })
	},
	login: async (input) => {
		const rs = await authApi.post('/login', input)
		set({ token: rs.data.token, user: rs.data.user })
		return rs
	},
	logout: () => set({ token: '', user: null })
}), {
	name: 'userState',
	storage: createJSONStorage(() => localStorage)
}))

export default useUserStore