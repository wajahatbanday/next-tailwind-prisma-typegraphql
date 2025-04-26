import {
  Home,
  Settings,
  Bell,
  Search,
  Mail,
  Calendar,
  FileText,
  Download,
  Upload,
  Trash,
  Edit,
  Plus,
  Minus,
  Check,
  X,
  AlertCircle,
  Info,
  LucideIcon,
  Loader2,
  UserRound,
  LayoutDashboard,
  FilePlus,
  FilePenLine,
  Eye,
  SquareArrowOutUpRight,
  Phone,
  Image,
} from "lucide-react";

import React from "react";
import { LucideProps } from "lucide-react";

const IconMap: Record<string, LucideIcon> = {
  home: Home,
  settings: Settings,
  user: UserRound,
  bell: Bell,
  search: Search,
  mail: Mail,
  calendar: Calendar,
  file: FileText,
  download: Download,
  upload: Upload,
  trash: Trash,
  edit: Edit,
  plus: Plus,
  minus: Minus,
  check: Check,
  close: X,
  alert: AlertCircle,
  info: Info,
  loader: Loader2,
  dashboard: LayoutDashboard,
  blog: FileText,
  appointment: Calendar,
  filePlus: FilePlus,
  fileUpdated: FilePenLine,
  view: Eye,
  go: SquareArrowOutUpRight,
  phone: Phone,
  media: Image,
} as const;

type IconName = keyof typeof IconMap;

export type IconProps = Omit<LucideProps, "ref"> & {
  name: IconName;
};

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = IconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" Not Found In IconMap`);
    return null;
  }

  return <IconComponent {...props} />;
};
