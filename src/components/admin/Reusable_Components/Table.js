"use client";

import AdminCard from "../adminCard";
import SearchBarAdmin from "./SearchBarAdmin";
import PaginationButton from "./PaginationButton";

export default function Table({ columns, rows,totalPages }) {

  // console.log("Rows of user",rows)
  console.log("Total Number Pages: ",totalPages); 

  return (
   
<>

   <div className="overflow-x-auto ">

    <section className="px-4 py-10 flex justify-end">
          <SearchBarAdmin/>

    </section>
       <table className="w-full text-sm min-w-225 ">

        <thead className="bg-linear-to-r from-purple-500 via-violet-700 to-purple-500">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left px-10 py-2 text-gray-100 text-sm "
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {rows.map((row, i) => (
            <tr
              key={i}
className={`${
  i % 2 === 0 ? "bg-white" : "bg-gray-50"
} border-b hover:bg-purple-50 transition`}       >

              {columns.map((col, j) => (
                <td key={j} className="px-6 py-3">

                  {col.render
                    ? col.render(row[col.key], row)
                    : row[col.key]
                  }

                </td>
              ))}

            </tr>
          ))}

          {rows.length === 0 && (
  <tr>
    <td colSpan={columns.length} className="text-center py-6 text-gray-500">
      No results found
    </td>
  </tr>
)}

        </tbody>

      </table>

      
   </div>

  <div className="flex justify-center py-4"> <PaginationButton totalPages={totalPages}/></div>

    </>
  );
}