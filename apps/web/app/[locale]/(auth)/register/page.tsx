"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import apiClient from "@/lib/api-client";
import { setToken } from "@/lib/auth";
import { useAuthStore } from "@/store/auth.store";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["OWNER", "MANAGER"], {
    required_error: "Please select a role",
  }),
  unitNumber: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const locale = useLocale();
  const { setAuth } = useAuthStore();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: undefined },
  });

  const selectedRole = watch("role");

  async function onSubmit(data: RegisterForm) {
    setError("");
    try {
      // Register — API returns token + user directly
      const res = await apiClient.post("/auth/register", data);
      const { token, user } = res.data.data;
      setToken(token);
      setAuth(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          unitNumber: user.unitNumber,
        },
        token
      );
      router.push(`/${locale}/dashboard`);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "error" in err.response.data
      ) {
        setError(String((err.response as { data: { error: string } }).data.error));
      } else {
        setError(t("registrationFailed"));
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1E3A5F]">{t("createAccount")}</h1>
      <p className="mt-1 text-sm text-gray-500">
        {t("registerSubtitle")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {t("fullName")}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t("fullNamePlaceholder")}
            {...register("name")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 shadow-sm focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            {...register("email")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 shadow-sm focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            {t("password")}
          </label>
          <input
            id="password"
            type="password"
            placeholder={t("createPasswordPlaceholder")}
            {...register("password")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 shadow-sm focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            {t("role")}
          </label>
          <select
            id="role"
            {...register("role")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-700 shadow-sm focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          >
            <option value="">{t("selectRole")}</option>
            <option value="OWNER">{t("roleOwner")}</option>
            <option value="MANAGER">{t("roleManager")}</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
          )}
        </div>

        {/* Unit Number — shown only for Owner */}
        {selectedRole === "OWNER" && (
          <div>
            <label
              htmlFor="unitNumber"
              className="block text-sm font-medium text-gray-700"
            >
              {t("unitNumber")}
            </label>
            <input
              id="unitNumber"
              type="text"
              placeholder={t("unitNumberPlaceholder")}
              {...register("unitNumber")}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm placeholder-gray-400 shadow-sm focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-[#1E40AF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1E3A9F] focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? t("creatingAccount") : t("createAccount")}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        {t("haveAccount")}{" "}
        <Link
          href={`/${locale}/login`}
          className="font-medium text-[#1E40AF] hover:underline"
        >
          {t("loginLink")}
        </Link>
      </p>
    </div>
  );
}
