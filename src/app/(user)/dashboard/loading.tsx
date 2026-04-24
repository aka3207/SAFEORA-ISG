export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div style={{ height: "2rem", width: "300px", background: "var(--input-bg)", borderRadius: "8px", marginBottom: "0.5rem" }}></div>
          <div style={{ height: "1rem", width: "200px", background: "var(--input-bg)", borderRadius: "4px" }}></div>
        </div>
        <div style={{ height: "2.5rem", width: "150px", background: "var(--input-bg)", borderRadius: "8px" }}></div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ height: "100px", background: "var(--input-bg)", borderRadius: "16px" }}></div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} style={{ height: "120px", background: "var(--input-bg)", borderRadius: "16px" }}></div>
        ))}
      </div>
    </div>
  );
}
