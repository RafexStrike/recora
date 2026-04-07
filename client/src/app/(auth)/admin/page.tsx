"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { 
  getAdminStats, 
  getAdminUsers, 
  getAdminProjects, 
  deleteAdminUser, 
  deleteAdminProject 
} from "@/lib/api";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "ADMIN") {
        router.push("/dashboard");
      } else {
        fetchData();
      }
    }
  }, [user, loading, router]);

  const fetchData = async () => {
    try {
      const statsRes = await getAdminStats();
      setStats(statsRes.data);
      const usersRes = await getAdminUsers();
      setUsers(usersRes.data);
      const projectsRes = await getAdminProjects();
      setProjects(projectsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteAdminUser(id);
      fetchData();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteAdminProject(id);
      fetchData();
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  if (loading || !user || user.role !== "ADMIN") return <div className="p-20 text-center text-white">Loading...</div>;

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-white font-outfit">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Metrics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Users</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Projects</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalProjects}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Animations</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalAnimations}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">System Health</h3>
            <p className="text-3xl font-bold mt-2 text-green-400">{stats.healthStatus}</p>
            <p className="text-xs text-gray-500 mt-1">Uptime: {Math.floor(stats.uptime / 60)} mins</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 mb-6">
        <button 
          onClick={() => setTab("overview")} 
          className={`pb-3 px-2 transition-colors ${tab === "overview" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-white"}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setTab("users")} 
          className={`pb-3 px-2 transition-colors ${tab === "users" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-white"}`}
        >
          Manage Users
        </button>
        <button 
          onClick={() => setTab("projects")} 
          className={`pb-3 px-2 transition-colors ${tab === "projects" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-white"}`}
        >
          Manage Projects
        </button>
      </div>

      {/* Tab Content */}
      {tab === "users" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">{u.name || "N/A"}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${u.role === "ADMIN" ? "bg-primary/20 text-primary" : "bg-white/10 text-gray-300"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    {u.role !== "ADMIN" && (
                      <button onClick={() => handleDeleteUser(u.id)} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Delete</button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                 <tr><td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "projects" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Owner</th>
                <th className="p-4 font-medium">Created</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">{p.title}</td>
                  <td className="p-4 text-gray-400">{p.user?.email}</td>
                  <td className="p-4 text-gray-400 text-sm">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDeleteProject(p.id)} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "overview" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary"></span>
               Recent Users
            </h3>
            <ul className="space-y-1">
              {stats.recentUsers.map((u: any) => (
                <li key={u.id} className="flex justify-between py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded -mx-2 transition-colors">
                  <span className="font-medium text-sm">{u.email}</span>
                  <span className="text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
              {stats.recentUsers.length === 0 && <li className="text-gray-500 text-sm py-2">No users found.</li>}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-secondary"></span>
               Recent Projects
            </h3>
            <ul className="space-y-1">
              {stats.recentProjects.map((p: any) => (
                <li key={p.id} className="flex justify-between py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded -mx-2 transition-colors">
                  <span className="font-medium text-sm truncate max-w-[200px]">{p.title}</span>
                  <span className="text-gray-400 text-sm shrink-0">{p.user?.email || "Unknown"}</span>
                </li>
              ))}
              {stats.recentProjects.length === 0 && <li className="text-gray-500 text-sm py-2">No projects found.</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
