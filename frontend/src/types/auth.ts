import type { UserState } from "./user";

export interface AuthState {
    loading: boolean;
    accessToken: string | null;
    user: UserState | null;
    /** Called after OAuth redirect — stores token, then fetches /me */
    handleOAuthCallback: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
}