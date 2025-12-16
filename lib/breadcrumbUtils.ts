export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

const nameMap: { [key: string]: string } = {
  dashboard: "All Pages",
  "balance-sheet-analysis": "8. Balance Sheet Analysis",
  "liquidity-monitor": "Liquidity Monitor",
};

export const createBreadcrumbItems = (
  pathname: string | undefined
): BreadcrumbItem[] => {
  if (!pathname || typeof pathname !== "string") {
    if (pathname === "/") {
      return [{ label: "All Pages", href: "/", isCurrent: true }];
    }
    return [];
  }
  const pathSegments = pathname.split("/").filter((segment) => segment);
  let currentPath = "";

  const segmentsToExclude = ["customise"];
  const filteredSegments = pathSegments.filter(
    (segment) => !segmentsToExclude.includes(segment)
  );

  const items: BreadcrumbItem[] = filteredSegments.map((segment, index) => {
    currentPath += `/${segment}`;
    const label =
      nameMap[segment] ||
      segment
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return {
      label: label,
      href: currentPath,
      isCurrent: index === filteredSegments.length - 1,
    };
  });
  if (items.length > 0 && items[0]?.label !== "All Pages") {
    items.unshift({ label: "All Pages", href: "/", isCurrent: false });
  } else if (items.length === 0) {
    items.push({ label: "All Pages", href: "/", isCurrent: true });
  }

  return items;
};
