"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Modal } from "@owners-platform/ui";
import type { Priority } from "@/hooks/use-maintenance";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

type FormData = z.infer<typeof schema>;

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    location: string;
    description: string;
    category: string;
    priority: Priority;
  }) => void;
}

export default function CreateRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateRequestModalProps) {
  const t = useTranslations("maintenance");

  const priorityOptions: { value: Priority; label: string }[] = [
    { value: "LOW", label: t("priorityLow") },
    { value: "MEDIUM", label: t("priorityMedium") },
    { value: "HIGH", label: t("priorityHigh") },
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
    defaultValues: { priority: "MEDIUM", description: "" },
    mode: "onChange",
  });

  const selectedPriority = watch("priority");

  function handleFormSubmit(data: FormData) {
    onSubmit({
      title: data.title,
      location: data.location,
      description: data.description || "",
      category: data.category,
      priority: data.priority,
    });
    reset();
    onClose();
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("createTitle")} size="md">
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

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("location")}
          </label>
          <input
            {...register("location")}
            placeholder={t("locationPlaceholder")}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
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
        </div>

        {/* Category + Priority row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t("category")}
            </label>
            <input
              {...register("category")}
              placeholder=""
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
            />
            {errors.category && (
              <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {t("priority")}
            </label>
            <div className="flex gap-2">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValue("priority", opt.value, { shouldValidate: true })}
                  className={`flex-1 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
                    selectedPriority === opt.value
                      ? opt.value === "HIGH"
                        ? "border-red-300 bg-red-50 dark:bg-red-900/30 text-red-700"
                        : opt.value === "MEDIUM"
                          ? "border-amber-300 bg-amber-50 dark:bg-amber-900/30 text-amber-700"
                          : "border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
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
            className="flex-1 rounded-md bg-[#1E3A5F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#162d4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("submit")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
