"use client";

import ProtectedLayout from "@/middleware/ProtectedLayout";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {

  return (
    <ProtectedLayout>
        {children}
    </ProtectedLayout>
  );
};

export default DashboardLayout;
