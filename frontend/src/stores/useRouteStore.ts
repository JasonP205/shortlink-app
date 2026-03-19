import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type {Route} from '../types/route';

export const useRouteStore = create<Route>()(
    persist(
        (set) => ({
        Path: "/",
        setPath: (path: string) => set({ Path: path }),
    }), {
        name: 'route-storage',
    })
)