import {addToast} from "@heroui/toast";

export const toast = {
    success: (message: string, description?: string) => addToast({
        title: message,
        description,
        color: "success",
    }),
    error: (message: string, description?: string) => addToast({
        title: message,
        description,
        color: "danger",
    }),
    info: (message: string, description?: string) => addToast({
        title: message,
        description,
        color: "primary",
    }), 
    secondary: (message: string, description?: string) => addToast({
        title: message,
        description,
        color: "secondary",
    }),
    warning: (message: string, description?: string) => addToast({
        title: message,
        description,
        color: "warning",
    }),
}