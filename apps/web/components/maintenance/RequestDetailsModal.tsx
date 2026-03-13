"use client";

import React from "react";
import { Clock, Info, CheckCircle, XCircle } from "lucide-react";
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
    label: "Pending",
    sublabel: "Awaiting Approval",
    icon: Clock,
    color: "text-amber-500",
    border: "border-amber-300",
    bg: "bg-amber-50",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    sublabel: "Awaiting Assignment",
    icon: Info,
    color: "text-blue-500",
    border: "border-blue-300",
    bg: "bg-blue-50",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    sublabel: "Completed",
    icon: CheckCircle,
    color: "text-green-500",
    border: "border-green-300",
    bg: "bg-green-50",
  },
  {
    value: "REJECTED",
    label: "Reject",
    sublabel: "Approval Reject",
    icon: XCircle,
    color: "text-red-500",
    border: "border-red-300",
    bg: "bg-red-50",
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
    label: "Pending",
    sublabel: "Awaiting Transaction",
    icon: Clock,
    color: "text-amber-500",
    border: "border-amber-300",
    bg: "bg-amber-50",
  },
  {
    value: "UNPAID",
    label: "Unpaid",
    sublabel: "Awaiting Paid",
    icon: XCircle,
    color: "text-red-500",
    border: "border-red-300",
    bg: "bg-red-50",
  },
  {
    value: "PAID",
    label: "Paid",
    sublabel: "Paid",
    icon: CheckCircle,
    color: "text-green-500",
    border: "border-green-300",
    bg: "bg-green-50",
  },
];

export default function RequestDetailsModal({
  isOpen,
  onClose,
  request,
  onStatusChange,
  onPaymentStatusChange,
}: RequestDetailsModalProps) {
  if (!request) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={request.title} size="lg">
      <div className="space-y-6">
        {/* Subtitle */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            {request.description || "No description"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {request.location || "No location"}
          </p>
        </div>

        {/* Request Status */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Request Status:
          </h4>
          <div className="grid grid-cols-4 gap-3">
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
                      : "border-gray-100 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isSelected ? s.bg : "bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isSelected ? s.color : "text-gray-400"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {s.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Paid Status */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Paid Status:
          </h4>
          <div className="grid grid-cols-3 gap-3">
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
                      : "border-gray-100 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isSelected ? s.bg : "bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isSelected ? s.color : "text-gray-400"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[10px] text-gray-400">
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
          className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
