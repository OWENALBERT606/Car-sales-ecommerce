
import { getAllOrders } from "@/actions/orders";
import DashboardMain from "@/components/dashboard/DashboardMain";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import UserDashboard from "@/components/frontend/user-dashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userRoles = session?.user?.roles ?? [];

  const isAdmin = userRoles.some((role: any) => role.roleName === "administrator");
  const isUser = userRoles.some((role: any) => role.roleName === "user");

  const allOrders = await getAllOrders();
  // const user = await getAuthenticatedUser();
  // const allOrders=await getAllOrders();
  // const session = await getServerSession(authOptions);
  return (
    <main>
       {isAdmin && <DashboardMain allOrders={allOrders}/>}
      {isUser && <UserDashboard session={session} allOrders={allOrders} />}
    </main>
  );
}
