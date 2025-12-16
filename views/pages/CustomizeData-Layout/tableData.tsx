// "use client";
// import { useState, useMemo, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Download, Plus } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import * as XLSX from "xlsx";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/lib/store";
// import { setCustomizeDataExcelData } from "@/lib/features/(spotlight)/report/reportSlice";
 
// interface DataTableProps {
//   data: any[];
//   activeType: string;
// }
 
// export const DataTable = ({ data, activeType }: DataTableProps) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [tableData, setTableData] = useState<any[]>(data);
//   const [showDetails, setShowDetails] = useState<boolean>(false);
 
//   // 🔄 Sync local data with Redux data (on re-import)
//   useEffect(() => {
//     setTableData(data);
//   }, [data]);
 
//   // ✅ Filtered Data (Memoized)
//   const filteredData = useMemo(() => {
//     return tableData.filter((row) => {
//       const type = row?.Type || row?.Types || row?.type || row?.types || "";
//       return type.toLowerCase() === activeType.toLowerCase();
//     });
//   }, [tableData, activeType]);
 
//   // ✅ Dynamically extract all possible month keys from data
//   const monthColumns = useMemo(() => {
//     const monthRegex =
//       /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}$/;
//     const allKeys = new Set<string>();
 
//     // Loop through all rows
//     tableData?.forEach((row) => {
//       Object.keys(row)?.forEach((key) => {
//         if (monthRegex.test(key)) allKeys.add(key);
//       });
//     });
 
//     // Convert to array and sort by actual calendar order
//     const monthOrder = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
 
//     return Array.from(allKeys).sort((a, b) => {
//       const aMonth = monthOrder.findIndex((m) => a.startsWith(m));
//       const bMonth = monthOrder.findIndex((m) => b.startsWith(m));
//       return aMonth - bMonth;
//     });
//   }, [tableData]);
 
//   const handleCellEdit = (rowIndex: number, column: string, value: string) => {
//     const actualIndex = tableData.findIndex(
//       (row) => row === filteredData[rowIndex]
//     );
//     const updated = [...tableData];
//     updated[actualIndex] = { ...updated[actualIndex], [column]: value };
//     setTableData(updated);
//     dispatch(setCustomizeDataExcelData(updated));
//   };
 
//   const addAccount = () => {
//     const newAccount: Record<string, any> = { Type: activeType, "Account Name": "New Account" };
//     monthColumns?.forEach((col) => (newAccount[col] = ""));
//     const updated = [...tableData, newAccount];
//     setTableData(updated);
//     dispatch(setCustomizeDataExcelData(updated));
//   };
 
//   const downloadExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(tableData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Data");
//     XLSX.writeFile(wb, "updated-data.xlsx");
//   };
 
//   const downloadPDF = () => {
//     // Placeholder for PDF export
//     alert("PDF export functionality would be implemented here");
//   };
 
//   console.log("filteredData", filteredData);
 
//   return (
//     <div className="space-y-4">
//        {/* === Toolbar === */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <div>
//             <label className="text-sm font-medium mb-1 block">
//               Data Source
//             </label>
//             <Select defaultValue="excel">
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="excel">Import from Excel</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <label className="text-sm font-medium mb-1 block">
//               Financial Year
//             </label>
//             <Select defaultValue="jan25-dec25">
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="jan25-dec25">Jan '25 - Dec '25</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <label className="text-sm font-medium mb-1 block">Metric</label>
//             <Select defaultValue="actual">
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="actual">Actual</SelectItem>
//                 <SelectItem value="budget">Budget</SelectItem>
//                 <SelectItem value="forecast">Forecast</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" onClick={downloadExcel}>
//             <Download className="w-4 h-4 mr-2" />
//             Download Excel
//           </Button>
//           <Button variant="outline" size="sm" onClick={downloadPDF}>
//             <Download className="w-4 h-4 mr-2" />
//             Download PDF
//           </Button>
//         </div>
//       </div>
 
//       <div className="border rounded-lg overflow-hidden">
//         <Button
//           variant="outline"
//           size="sm"
//           className="m-4"
//           onClick={addAccount}
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Account
//         </Button>
 
//         <div className="border rounded-lg overflow-hidden">
//           {/* ===== Title Bar ===== */}
//           <div className="border-t border-b bg-[#f7f9fc] px-4 py-2 flex items-center justify-between w-full">
//             <div className="w-[25%] flex justify-between ">
//               <h2 className="font-semibold text-sm text-gray-700">Accounts</h2>
//               <button
//                 className="text-sm text-blue-600 hover:underline flex items-center"
//                 onClick={() => setShowDetails(!showDetails)}
//               >
//                 {showDetails ? "◃ Hide details" : "▹ Show details"}
//               </button>
//             </div>
//             <div className="flex items-center justify-between px-4 py-2 bg-white border-b text-xs text-gray-600 w-[45%] ">
//               <span>Jan 2025</span>
//               <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div className="h-full bg-blue-500 rounded-full w-3/4" />
//               </div>
//               <span>Dec 2025</span>
//             </div>
//           </div>
 
//           {/* ===== Month Range Header Bar ===== */}
 
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-table-header">
//                   <th className="border border-table-border px-4 py-2 text-left font-semibold text-sm">
//                     Accounts Name
//                   </th>
//                   {showDetails && (
//                     <>
//                       <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
//                         Report Code
//                       </th>
//                       <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
//                         Spotlight Display Name
//                       </th>
//                     </>
//                   )}
//                   {monthColumns?.map((month) => (
//                     <th
//                       key={month}
//                       className="border border-table-border px-4 py-2 text-right font-semibold text-sm whitespace-nowrap"
//                     >
//                       {month}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData?.map((row, rowIndex) => (
//                   <tr
//                     key={rowIndex}
//                     className={
//                       rowIndex % 2 === 0
//                         ? "bg-table-row-even"
//                         : "bg-table-row-odd"
//                     }
//                   >
//                     <td className="border border-table-border px-4 py-2 font-medium text-sm">
//                       <Input
//                         value={
//                           (
//                             row["Account Name"] ||
//                             row.Accounts ||
//                             row.Account ||
//                             row.account ||
//                             ""
//                           ).trim() // 👈 removes extra spaces before/after
//                         }
//                         onChange={(e) =>
//                           handleCellEdit(
//                             rowIndex,
//                             "Account Name",
//                             e.target.value
//                           )
//                         }
//                         className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
//                       />
//                     </td>
 
//                     {showDetails && (
//                       <>
//                         <td className="border border-gray-300 px-4 py-2">
//                           <Input
//                             value={row["Report Code"] || ""}
//                             onChange={(e) =>
//                               handleCellEdit(
//                                 rowIndex,
//                                 "Report Code",
//                                 e.target.value
//                               )
//                             }
//                             className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
//                           />
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2">
//                           <Input
//                             value={
//                               row["Spotlight Display Name"] || activeType || ""
//                             }
//                             onChange={(e) =>
//                               handleCellEdit(
//                                 rowIndex,
//                                 "Spotlight Display Name",
//                                 e.target.value
//                               )
//                             }
//                             className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm"
//                           />
//                         </td>
//                       </>
//                     )}
//                     {monthColumns?.map((month) => (
//                       <td
//                         key={month}
//                         className="border border-table-border px-4 py-2 text-right text-sm"
//                       >
//                         <Input
//                           value={row[month] || ""}
//                           onChange={(e) =>
//                             handleCellEdit(rowIndex, month, e.target.value)
//                           }
//                           className="border-0 bg-transparent p-0 h-auto text-right focus-visible:ring-0"
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
 