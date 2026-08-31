// const stats = [
//   {
//     title: "Total Users",
//     value: "1,284,520",
//     change: "+12.4%",
//     description: "vs. last month",
//   },
//   {
//     title: "Online Users",
//     value: "18,421",
//     change: "+8.2%",
//     description: "currently online",
//   },
//   {
//     title: "Total Songs",
//     value: "842,391",
//     change: "+4.8%",
//     description: "published content",
//   },
//   {
//     title: "Downloads",
//     value: "2,481,923",
//     change: "+16.7%",
//     description: "this month",
//   },
// ];

// export default function DashboardPage() {
//   return (
//     <div className="dashboard">
//       <section className="dashboard-header">
//         <div>
//           <p className="eyebrow">Overview</p>

//           <h2>Good afternoon, Farid</h2>

//           <p>Here&apos;s what&apos;s happening across your platform.</p>
//         </div>

//         <button className="primary-button">Generate Report</button>
//       </section>

//       <section className="stats-grid">
//         {stats.map((stat) => (
//           <article className="stat-card" key={stat.title}>
//             <div className="stat-card-top">
//               <span>{stat.title}</span>

//               <span className="stat-icon">◈</span>
//             </div>

//             <strong>{stat.value}</strong>

//             <div className="stat-card-bottom">
//               <span className="positive">{stat.change}</span>

//               <span>{stat.description}</span>
//             </div>
//           </article>
//         ))}
//       </section>

//       <section className="dashboard-grid">
//         <article className="dashboard-card chart-card">
//           <div className="card-header">
//             <div>
//               <h3>User Growth</h3>
//               <p>New registered users over time</p>
//             </div>

//             <select defaultValue="30d">
//               <option value="7d">Last 7 days</option>
//               <option value="30d">Last 30 days</option>
//               <option value="90d">Last 90 days</option>
//               <option value="1y">Last year</option>
//             </select>
//           </div>

//           <div className="chart-placeholder">
//             <span>User Growth Chart</span>
//           </div>
//         </article>

//         <article className="dashboard-card">
//           <div className="card-header">
//             <div>
//               <h3>Server Status</h3>
//               <p>Infrastructure overview</p>
//             </div>

//             <span className="online-status">7 / 8 online</span>
//           </div>

//           <div className="server-list">
//             <Server name="media-01" status="online" usage="72%" />

//             <Server name="media-02" status="online" usage="54%" />

//             <Server name="media-03" status="warning" usage="91%" />

//             <Server name="api-01" status="online" usage="42%" />
//           </div>
//         </article>
//       </section>

//       <section className="dashboard-grid">
//         <article className="dashboard-card">
//           <div className="card-header">
//             <div>
//               <h3>Revenue</h3>
//               <p>Monthly revenue performance</p>
//             </div>

//             <strong>$82,421</strong>
//           </div>

//           <div className="chart-placeholder">
//             <span>Revenue Chart</span>
//           </div>
//         </article>

//         <article className="dashboard-card">
//           <div className="card-header">
//             <div>
//               <h3>Recent Activity</h3>
//               <p>Latest administrative events</p>
//             </div>
//           </div>

//           <div className="activity-list">
//             <Activity title="New song published" description="Song #842391" />

//             <Activity title="New user registered" description="User #1284520" />

//             <Activity
//               title="Payment received"
//               description="$19.99 subscription"
//             />

//             <Activity title="Backup completed" description="media-01" />
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// }

// function Server({
//   name,
//   status,
//   usage,
// }: {
//   name: string;
//   status: "online" | "warning";
//   usage: string;
// }) {
//   return (
//     <div className="server-row">
//       <div className="server-info">
//         <span className={`server-dot ${status}`} />

//         <div>
//           <strong>{name}</strong>
//           <span>Linux Server</span>
//         </div>
//       </div>

//       <span>{usage}</span>
//     </div>
//   );
// }

// function Activity({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="activity-item">
//       <div className="activity-icon">•</div>

//       <div>
//         <strong>{title}</strong>
//         <span>{description}</span>
//       </div>
//     </div>
//   );
// }
export default function LoginPage() {
  return (
    <div className="w-full">
      sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
      sssssssssssssssssssssssssssssss ssssssssssssssssssss
      ssssssssssssssssssssssss ssssssssssssssss
      ssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssss
      ssssssssssssssssssssssssss sssssssssssssssss ssssssssssss ssssssssss
      sssssssssssssssssssssssssssssssssssssssssss
    </div>
  );
}
