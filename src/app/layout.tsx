import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppProviders } from "@/app/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "TaskFlow CRM",
    template: "%s | TaskFlow CRM"
  },
  description: "Task and project management workspace",
  applicationName: "TaskFlow CRM"
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
