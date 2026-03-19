export interface Link {
    code: string;
    originalUrl: string;
    shortUrl: string;
    ogTitle?: string;
    ogDescription?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ShortLink {
    createdLink?: Link | null;
    isAliasTaken: boolean;
    loading: boolean;
    copyMode: boolean;
    copyLink: () => void;
    setCreatedLink: (link: Link | null) => void;
    setCopyMode: (mode: boolean) => void;
    createLink: (originalUrl: string, customAlias?: string) => Promise<void>; 
    checkAlias: (alias: string) => Promise<void>; 
}