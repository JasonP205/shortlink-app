import { create } from "zustand";
import { LinkService } from "../services/linkServie";
import type { Link, ShortLink } from "../types/link";
import { toast } from "../lib/toast";
import i18n from "../i18n";

const t = (key: string) => i18n.t(key);
export const useLinkStore = create<ShortLink>((set,get) => ({
  createdLink: null,
  isAliasTaken: false,
  loading: false,
  copyMode: false,
  copyLink: () => {
    const link = get().createdLink;
    if (link) {
      navigator.clipboard.writeText(link.shortUrl);
      toast.success(t("toast.copySuccess"));
      get().setCreatedLink(null);
      get().setCopyMode(false);
    }
  },
  setCreatedLink: (link: Link | null) => set({ createdLink: link }),
  setCopyMode: (mode: boolean) => set({ copyMode: mode }),
  createLink: async (originalUrl: string, customAlias?: string) => {
    set({ loading: true });
    try {
      const result = await LinkService.createShortLink(
        originalUrl,
        customAlias,
      );
      if (result) {
        set((state)=> {
          state.createdLink = result;
          state.copyMode = true;
          return state;
        });
        toast.success(t("toast.createSuccess"));
      }
    } catch (error) {
      set({ loading: false });
      toast.error(t("toast.createError"));
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  checkAlias: async (alias: string) => {
    try {
      set({ loading: true });
      const isTaken = await LinkService.checkAlias(alias);
      if (isTaken) {
        set({ isAliasTaken: true });
      } else {
        set({ isAliasTaken: false });
      }
    } catch (error) {
      set({ isAliasTaken: false });
    } finally {
      set({ loading: false });
    }
  },
}));
