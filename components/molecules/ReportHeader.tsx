"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ColourSettingsPanel from "./ColourSettingsPanel"; 

export default function ReportHeader() {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] =
    useState<boolean>(false);
  

  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  return (
    <>
      <div className="flex items-end gap-3 p-4 border-b bg-white">
        
        <div className="flex flex-col">
          <label htmlFor="report-date" className="text-sm font-medium">Report Date</label>    
          <Input
            id="report-date" 
            type="text"
            defaultValue="31 October 2025"
            className="w-[180px]"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="report-template" className="text-sm font-medium">Template</label>    
          <Select defaultValue="ebs">
            <SelectTrigger id="report-template" className="w-[150px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ebs">EBS AED</SelectItem>
              <SelectItem value="s4">SAP S4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Add Page
        </Button>
        
        <div
          className="ml-auto text-sm text-blue-700 cursor-pointer pb-2" 
          onClick={toggleSettingsPanel}
        >
          {isSettingsPanelOpen
            ? "Hide colour settings"
            : "Show colour settings"}{" "}
          ▾
        </div>
      </div>

      {isSettingsPanelOpen && (
        <ColourSettingsPanel /> 
      )}
    </>
  );
}