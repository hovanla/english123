"use client";
import { useRouter } from "next/navigation";

export default function ProfilePicker({ profiles }: { profiles: Array<{ id: string; displayName: string; gradeName: string }> }) {
  const router = useRouter();
  if (profiles.length < 2) return null;
  return <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
    Hồ sơ
    <select className="min-h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 shadow-sm outline-none focus:border-emerald-500" onChange={async (event) => { await fetch("/api/profiles/select", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profileId: event.target.value }) }); router.refresh(); }}>
      {profiles.map((profile) => <option value={profile.id} key={profile.id}>{profile.displayName} · {profile.gradeName}</option>)}
    </select>
  </label>;
}
