import api from "../lib/axios";

export const LinkService = {
  createShortLink: async (originalUrl: string, customAlias?: string) => {
    const response = await api.post("/create", {
      originalUrl,
      customAlias,
    });
    return response.data; //Return shortened link
  },
  checkAlias: async (alias: string) => {
    const response = await api.get(`/check?alias=${alias}`);
    return response.data.isTaken; // Return true if alias is taken, false otherwise
  },
};
