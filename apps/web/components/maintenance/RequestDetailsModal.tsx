"use client";

import React from "react";
import { Clock, Info, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Modal } from "@owners-platform/ui";
import type {
  MaintenanceRequest,
  RequestStatus,
  PaymentStatus,
} from "@/hooks/use-maintenance";

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: MaintenanceRequest | null;
  onStatusChange: (id: string, status: RequestStatus) => void;
  onPaymentStatusChange: (id: string, status: PaymentStatus) => void;
}

export default function RequestDetailsModal({
  isOpen,
  onClose,
  request,
  onStatusChange,
  onPaymentStatusChange,
}: RequestDetailsModalProps) {
  const t = useTranslations("maintenance");

  if (!request) return null;

  const requestStatuses: {
    value: RequestStatus;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
    border: string;
    bg: string;
  }[] = [
    {
      value: "PENDING",
      label: t("statusPending"),
      sublabel: t("awaitingApproval"),
      icon: Clock,
      color: "text-amber-500",
      border: "border-amber-300",
      bg: "bg-amber-50 dark:bg-amber-900/30",
    },
    {
      value: "IN_PROGRESS",
      label: t("statusInProgress"),
      sublabel: t("awaitingAssignment"),
      icon: Info,
      color: "text-blue-500",
      border: "border-blue-300",
      bg: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
      value: "COMPLETED",
      label: t("statusCompleted"),
      sublabel: t("completed"),
      icon: CheckCircle,
      color: "text-green-500",
      border: "border-green-300",
      bg: "bg-green-50 dark:bg-green-900/30",
    },
    {
      value: "REJECTED",
      label: t("reject"),
      sublabel: t("approvalReject"),
      icon: XCircle,
      color: "text-red-500",
      border: "border-red-300",
      bg: "bg-red-50 dark:bg-red-900/30",
    },
  ];

  const paymentStatuses: {
    value: PaymentStatus;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
    border: string;
    bg: string;
  }[] = [
    {
      value: "PENDING",
      label: t("paymentPending"),
      sublabel: t("awaitingTransaction"),
      icon: Clock,
      color: "text-amber-500",
      border: "border-amber-300",
      bg: "bg-amber-50 dark:bg-amber-900/30",
    },
    {
      value: "UNPAID",
      label: t("paymentUnpaid"),
      sublabel: t("awaitingPaid"),
      icon: XCircle,
      color: "text-red-500",
      border: "border-red-300",
      bg: "bg-red-50 dark:bg-red-900/30",
    },
    {
      value: "PAID",
      label: t("paymentPaid"),
      sublabel: t("paymentPaid"),
      icon: CheckCircle,
      color: "text-green-500",
      border: "border-green-300",
      bg: "bg-green-50 dark:bg-green-900/30",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={request.title} size="lg">
      <div className="space-y-6">
        {/* Subtitle */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {request.description || t("noDescription")}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {request.location || t("noLocation")}
          </p>
        </div>

        {/* Request Status */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            {t("requestStatus") + ":"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {requestStatuses.map((s) => {
              const Icon = s.icon;
              const isSelected = request.status === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => onStatusChange(request.id, s.value)}
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                    isSelected
                      ? `${s.border} ${s.bg}`
                      : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isSelected ? s.bg : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isSelected ? s.color : "text-gray-400 dark:text-gray-500"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? "text-gray-800 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {s.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Paid Status */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            {t("paidStatus") + ":"}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentStatuses.map((s) => {
              const Icon = s.icon;
              const isSelected = request.paymentStatus === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() =>
                    onPaymentStatusChange(request.id, s.value)
                  }
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                    isSelected
                      ? `${s.border} ${s.bg}`
                      : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isSelected ? s.bg : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isSelected ? s.color : "text-gray-400 dark:text-gray-500"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? "text-gray-800 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {s.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {t("cancel")}
        </button>
      </div>
    </Modal>
  );
}
