import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { communityApi } from '../api/communityapi'
const useCommuStore = create(persist((set, get) => ({
    community:[],
    member:[],
    memberrole:[],
    actionfecthinfo: async (communityname,token) => {
            const rs = await communityApi.get(`/${communityname}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            // console.log(rs)
            set({community: rs.data.community , member:rs.data.member,memberrole:rs.data.memberrole})
        },
   
}), {
    name: 'commuState',
    storage: createJSONStorage(() => localStorage)
}))

export default useCommuStore