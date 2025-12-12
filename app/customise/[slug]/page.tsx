"use client";

import { useParams } from "next/navigation";
import CustomisePage from "@/views/pages/index";

export default function Page() {
  const params = useParams();

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  console.log("Client params:", params);
  console.log("Slug:", slug);

  if (!slug) return null; 

  return <CustomisePage slug={slug} />;
}
