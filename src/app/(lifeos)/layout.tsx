import React from 'react';
import { LifeOSShell } from '@/presentation/components/lifeos/LifeOSShell';

interface LifeOSLayoutProps {
  children: React.ReactNode;
}

export default function LifeOSLayout({ children }: LifeOSLayoutProps) {
  return <LifeOSShell>{children}</LifeOSShell>;
}
