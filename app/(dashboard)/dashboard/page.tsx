
import DashboardMain from "@/components/dashboard/DashboardMain";
import { DashboardWelcome } from "@/components/WelcomeBanner";
import { getAuthenticatedUser } from "@/config/useAuth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getAuthenticatedUser();
  return (
    <main>
      <DashboardMain />
    </main>
  );
}
