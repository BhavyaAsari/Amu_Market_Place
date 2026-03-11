import AdminCard from "../adminCard";
import StatsGrid from "../statsGrid";
import { LuUser, LuBan, LuUserPlus } from "react-icons/lu"

export default function StatsTabUser({userStats}) {

    const items = [
    {
      label: "Active Users",
      value: userStats.activeUsers,
      icon: LuUser
    },
    {
      label: "Blocked Users",
      value: userStats.blockedUsers,
      icon: LuBan
    },
    {
      label: "New Signups",
      value: userStats.newSignups,
      icon: LuUserPlus
    }
  ];

    return (

    
   <AdminCard  bgColor="bg-gradient-to-r from-[#4c1d95] via-[#6d28d9] to-[#9333ea]">
       <h1 className="font-semibold text-white text-xl mb-3">User Insights</h1>
      <StatsGrid  items={items}/>
   </AdminCard>
     
    )
}