"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/authHooks";

type Props = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: Props) => {
  const router = useRouter();

  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

  }, [isLoading, router, user]);

  if (isLoading || !user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
