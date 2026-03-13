"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const priorityOptions: {
  value: AnnouncementPriority;
  label: string;
  activeClass: string;
}[] = [
  {
    value: "HIGH",
    label: "High",
    activeClass: "border-red-300 bg-red-50 text-red-700",
  },
  {
    value: "MEDIUM",
    label: "Medium",
    activeClass: "border-amber-300 bg-amber-50 text-amber-700",
  },
  {
    value: "LOW",
    label: "Low",
    activeClass: "border-gray-300 bg-gray-100 text-gray-700",
  },
];

export default function CreateAnnouncementModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateAnnouncementModalProps) {
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
      title="Create New Announcement"
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            {...register("title")}
            placeholder="Enter announcement title"
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Enter announcement description"
            className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF] resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <div className="grid grid-cols-3 gap-3">
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
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
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
            className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 rounded-md bg-[#1E40AF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1a3899] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Announcement
          </button>
        </div>
      </form>
    </Modal>
  );
}
