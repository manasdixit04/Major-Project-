import {create} from "zustand"
import { persist } from 'zustand/middleware';


let appStore = (set) => ({
    dopen : true,
    updateOpen :(dopen) => set(() => ({dopen:dopen}))
})

appStore = persist(appStore, {name : "my_app_store"})
const useAppStore= create(appStore);

export default useAppStore