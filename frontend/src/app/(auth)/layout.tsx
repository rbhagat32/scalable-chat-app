import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 shadow-xl md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}
