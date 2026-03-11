"Use Client";

import AdminCard from "../adminCard";

export default function Table({ columns, rows }) {

  return (
    <AdminCard>

   <div className="overflow-x-auto shadow-sm">
       <table className="w-full text-sm  min-w-200 ">

        <thead className="  bg-linear-to-b from-purple-400 to-purple-800 ">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left p-3  text-gray-700 text-sm "
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
              className="border-b hover:bg-purple-50 transition hover:-translate-y-1 hover:shadow-xl"
            >

              {columns.map((col, j) => (
                <td key={j} className="p-3">

                  {col.render
                    ? col.render(row[col.key], row)
                    : row[col.key]
                  }

                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>
   </div>

    </AdminCard>
  );
}