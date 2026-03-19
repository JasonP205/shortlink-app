export type UserState = {
    id: string;
    username: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    provider: "google" | "github";
};