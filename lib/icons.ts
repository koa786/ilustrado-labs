import {
  CaseUpper,
  CheckCircle,
  Clock,
  Code,
  CopyMinus,
  Diff,
  FileCode,
  FileJson,
  FileText,
  Fingerprint,
  Folder,
  Hash,
  Link,
  Link2,
  Lock,
  Palette,
  PlusCircle,
  RefreshCw,
  Search,
  Shield,
  SortAsc,
  Type,
  type LucideIcon,
} from "lucide-react";

/**
 * Shared icon map for tool/category icons.
 *
 * Tool and category data (see data/tools.ts) stores icons as string keys
 * (e.g. "FileJson") rather than component references, so they can look up
 * their icon here at render time. This map exists specifically so that
 * icons are imported by name instead of via `import * as Icons from
 * "lucide-react"`, which prevents bundlers from tree-shaking the rest of
 * the icon library out of the client bundle.
 *
 * When adding a new tool or category with a new icon, add the icon here.
 */
export const iconMap: Record<string, LucideIcon> = {
  CaseUpper,
  CheckCircle,
  Clock,
  Code,
  CopyMinus,
  Diff,
  FileCode,
  FileJson,
  FileText,
  Fingerprint,
  Folder,
  Hash,
  Link,
  Link2,
  Lock,
  Palette,
  PlusCircle,
  RefreshCw,
  Search,
  Shield,
  SortAsc,
  Type,
};
