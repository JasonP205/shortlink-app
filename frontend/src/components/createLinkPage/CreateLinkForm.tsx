import {
  Input,
  Card,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useLinkStore } from "@/stores/useLinkStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/lib/toast";
import { EllipsisVertical, Link as LinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const urlFormSchema = z.object({
  originalUrl: z.string().url("Please enter a valid URL"),
  customAlias: z.string().optional(),
  includeUsername: z.boolean().optional(),
});

type UrlFormData = z.infer<typeof urlFormSchema>;

const CreateLinkForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlFormSchema),
  });
  const {
    createLink,
    loading,
    checkAlias,
    isAliasTaken,
    copyMode,
    copyLink,
    createdLink,
  } = useLinkStore();
  const [customAlias, setCustomAlias] = useState("");
  const onSubmit = async (data: UrlFormData) => {
    await createLink(data.originalUrl, customAlias || undefined);
  };

  useEffect(() => {
    if (customAlias === "") return; // Skip validation if custom alias is empty
    const validateAlias = async () => {
      await checkAlias(customAlias);
      if (isAliasTaken) {
        toast.error(t("toast.aliasTaken"));
      }
    };
    const checkAliasDebounce = setTimeout(validateAlias, 500); // Debounce to avoid excessive API calls
    return () => clearTimeout(checkAliasDebounce);
  }, [customAlias, checkAlias, isAliasTaken]);

  useEffect(() => {
    if (errors.originalUrl) {
      toast.error(errors.originalUrl.message || t("toast.invalidUrl"));
    }
  }, [errors]);

  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-3 flex bg-white/60 backdrop-blur-md flex-row rounded-full gap-2 items-center justify-center border border-[#A0C4FF]/40">
          {copyMode ? (
            <>
              <Input
                startContent={<LinkIcon size={20} />}
                type="url"
                size="lg"
                radius="full"
                color="primary"
                value={createdLink?.shortUrl}
                readOnly
              />
              <Button
                type="submit"
                variant="bordered"
                color="primary"
                size="lg"
                onPress={copyLink}
                radius="full"
              >
                {t("home.copy")}
              </Button>
            </>
          ) : (
            <>
              <Input
                startContent={<LinkIcon size={20} />}
                isClearable
                type="url"
                size="lg"
                radius="full"
                color="default"
                placeholder={t("home.placeholder")}
                isInvalid={errors.originalUrl ? true : false}
                onClear={() => {
                  reset({ originalUrl: "", customAlias: "" });
                  setCustomAlias("");
                }}
                {...register("originalUrl")}
              />
              <Popover
                classNames={{
                  content: "shadow-xl bg-white border border-[#BDB2FF]/40",
                }}
              >
                <PopoverTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    color="primary"
                    size="sm"
                    radius="full"
                  >
                    <EllipsisVertical size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="">
                  <div className="p-2 w-64 space-y-3">
                    <h2 className="text-sm font-gelasio font-semibold text-[#2D3748] mb-2">
                      {t("home.customLink")}
                    </h2>
                    <Input
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      placeholder={t("home.customAliasLabel")}
                      radius="md"
                      size="sm"
                      color={isAliasTaken ? "danger" : "default"}
                      isInvalid={isAliasTaken}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                isLoading={loading}
                type="submit"
                variant="solid"
                size="lg"
                color="primary"
                radius="full"
                className="font-semibold text-xs sm:text-base"
                isDisabled={isAliasTaken}
              >
                {loading ? t("home.working") : t("home.getLink")}
              </Button>
            </>
          )}
        </Card>
        <span className="px-3 text-[10px] sm:text-sm text-[#718096]">
          * {t("home.terms")}
        </span>
      </form>
    </>
  );
};

export default CreateLinkForm;
