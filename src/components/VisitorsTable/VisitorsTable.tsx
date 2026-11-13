import type { Visitor } from 'src/lib/supabase';

type VisitorsTableProps = {
  visitors: Visitor[];
};

const VisitorsTable: React.FC<VisitorsTableProps> = ({ visitors }) => {
  return (
    <div className="container mb-4 rounded-sm bg-slate-800 px-8 pt-6 pb-8 shadow-md">
      <h2 className="mb-4 text-lg">Usage</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-slate-950">
          <tr>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {!visitors.length ? (
            <tr>
              <td colSpan={2} className="p-16 px-4 text-center">
                No Visitors
              </td>
            </tr>
          ) : (
            visitors.map((visitor) => (
              <tr key={visitor.user_id}>
                <td className="border px-4 py-2">{visitor.email}</td>
                <td className="border px-4 py-2 text-center">
                  {visitor.count}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorsTable;
