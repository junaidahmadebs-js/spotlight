"use client";

import React from "react";
import ExecutiveSummaryComponent from "@/components/organisms/allPages/excutive";
import LayoutPage from "@/app/excelsheet/components/LayoutPage";
import Page from "@/app/customise/[slug]/page";


const Index = ({ slug }: { slug: string }) => {
  const pageTitle = "Executive Summary";

  switch (slug) {
    case "executive":
      return <ExecutiveSummaryComponent pageTitle={pageTitle} />;
    case "Introduction":
      return <LayoutPage  />;
      case "Analysis":
    return <Page />;

    default:
      return <div>I get slug as : {slug}</div>;
  }
};

export default Index;