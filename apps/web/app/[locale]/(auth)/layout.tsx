export default function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const logoSrc =
    params.locale === "ar"
      ? "/images/darik-logo-ar.png"
      : "/images/darik-logo-en.png";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <img
            src={logoSrc}
            alt="DARIK"
            className="h-14 object-contain"
          />
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white p-4 sm:p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
