"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Modal } from "@owners-platform/ui";
import type { AnnouncementPriority } from "@/hooks/use-announcements";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

type FormData = z.infer<typeof schema>;

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    priority: AnnouncementPriority;
  }) => void;
}

export default function CreateAnnouncementModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateAnnouncementModalProps) {
  const t = useTranslations("announcements");

  const priorityOptions: {
    value: AnnouncementPriority;
    label: string;
    activeClass: string;
  }[] = [
    {
      value: "HIGH",
      label: t("high"),
      activeClass: "border-red-300 bg-red-50 dark:bg-red-900/30 text-red-700",
    },
    {
      value: "MEDIUM",
      label: t("medium"),
      activeClass: "border-amber-300 bg-amber-50 dark:bg-amber-900/30 text-amber-700",
    },
    {
      value: "LOW",
      label: t("low"),
      activeClass: "border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { priority: "MEDIUM" },
    mode: "onChange",
  });

  const selectedPriority = watch("priority");

  function handleFormSubmit(data: FormData) {
    onSubmit(data);
    reset();
    onClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t("createTitle")}
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("titleField")}
          </label>
          <input
            {...register("title")}
            placeholder={t("titlePlaceholder")}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("description")}
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder={t("descriptionPlaceholder")}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF] resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("priority")}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setValue("priority", opt.value, { shouldValidate: true })
                }
                className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                  selectedPriority === opt.value
                    ? opt.activeClass
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 rounded-md bg-[#1E40AF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1a3899] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("create")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
