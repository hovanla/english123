"use client";
import { useRouter } from "next/navigation";

export default function ProfilePicker({ profiles }: { profiles: Array<{ id: string; displayName: string; gradeName: string }> }) {
  const router = useRouter();
  if (profiles.length < 2) return null;
  return <label className="text-sm font-bold">Hồ sơ<select className="ml-2 rounded-xl border bg-white px-3 py-2" onChange={async (event) => { await fetch("/api/profiles/select", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profileId: event.target.value }) }); router.refresh(); }}>{profiles.map((profile) => <option value={profile.id} key={profile.id}>{profile.displayName} · {profile.gradeName}</option>)}</select></label>;
}
