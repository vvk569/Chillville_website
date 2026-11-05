import { redirect } from "next/navigation";

/** /admin is just an entry point — send straight to the analytics dashboard. */
export default function AdminIndex() {
  redirect("/admin/analytics");
}
