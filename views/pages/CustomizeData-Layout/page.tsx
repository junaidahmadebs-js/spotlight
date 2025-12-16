// "use client";
 
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card } from "@/components/ui/card";
// import { useState } from "react";
// import { DataTable } from "./DataTable";
// import useCustomizeData from "./useCustomizeData";
 
// const Page = () => {
//   const { activeTab, excelData, dataTypes, handleToChangeActiveTab } =
//     useCustomizeData();
//   return (
//     <Card className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit your imported data</h1>
 
//       {dataTypes?.length > 0 && (
//         <Tabs
//           value={activeTab}
//           onValueChange={handleToChangeActiveTab}
//           className="w-full"
//         >
//           <TabsList className="mb-4">
//             {dataTypes?.slice(1)?.map((type) => (
//               <TabsTrigger key={type} value={type}>
//                 {type}
//               </TabsTrigger>
//             ))}
//           </TabsList>
 
//           {dataTypes?.slice(1)?.map((type) => (
//             <TabsContent key={type} value={type}>
//               <DataTable data={excelData} activeType={type} />
//             </TabsContent>
//           ))}
//         </Tabs>
//       )}
//     </Card>
//   );
// };
 
// export default Page;