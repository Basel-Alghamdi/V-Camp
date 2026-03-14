"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, File, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Modal } from "@owners-platform/ui";
import type { DocumentCategory } from "@/hooks/use-documents";

const schema = z.object({
  name: z.string().min(1, "Document name is required"),
  category: z.enum(["Invoice", "Contract", "Report", "Vendor", "Other"], {
    required_error: "Category is required",
  }),
  relatedTo: z.string().min(1, "Related To is required"),
});

type FormData = z.infer<typeof schema>;

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    category: string;
    relatedTo?: string;
    file: File;
  }) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadDocumentModal({
  isOpen,
  onClose,
  onSubmit,
}: UploadDocumentModalProps) {
  const t = useTranslations("documents");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; raw: File } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function handleFile(file: globalThis.File) {
    setSelectedFile({ name: file.name, size: formatFileSize(file.size), raw: file });
  }

  function handleFormSubmit(data: FormData) {
    if (!selectedFile) return;
    onSubmit({
      name: data.name,
      category: data.category,
      relatedTo: data.relatedTo || undefined,
      file: selectedFile.raw,
    });
    reset();
    setSelectedFile(null);
    onClose();
  }

  function handleClose() {
    reset();
    setSelectedFile(null);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("uploadTitle")} size="md">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Document Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("documentName")}
          </label>
          <input
            {...register("name")}
            placeholder={t("namePlaceholder")}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("category")}
          </label>
          <select
            {...register("category")}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          >
            <option value="">{t("selectCategory")}</option>
            <option value="Invoice">{t("invoice")}</option>
            <option value="Contract">{t("contract")}</option>
            <option value="Report">{t("report")}</option>
            <option value="Vendor">{t("vendorDoc")}</option>
            <option value="Other">{t("other")}</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Related To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("relatedTo")}
          </label>
          <input
            {...register("relatedTo")}
            placeholder={t("relatedToPlaceholder")}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.relatedTo && (
            <p className="mt-1 text-xs text-red-500">{errors.relatedTo.message}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {t("file")}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />

          {selectedFile ? (
            <div className="flex items-center gap-3 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-3">
              <File className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{selectedFile.size}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFile(file);
              }}
              className={`flex w-full flex-col items-center gap-2 rounded-md border-2 border-dashed px-4 py-8 transition-colors ${
                dragOver
                  ? "border-[#1E40AF] bg-blue-50 dark:bg-blue-900/30"
                  : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >
              <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("dragDrop")}{" "}
                <span className="font-medium text-[#1E40AF]">{t("clickBrowse")}</span>
              </p>
            </button>
          )}
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
            disabled={!isValid || !selectedFile}
            className="flex-1 rounded-md bg-[#1E40AF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1a3899] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("upload")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
