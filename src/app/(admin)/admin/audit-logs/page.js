import { getAdminLogs } from "@/app/actions/adminActions/AdminDashBoardAction/getAuditLogs";
import LogSystemMain from "@/components/admin/logs_Segment/logSection";

export default async function AuditPage() {

    const dbLogs  = await getAdminLogs();

    console.log("page db logs",dbLogs)

    return <LogSystemMain dbLogs = {dbLogs} />
}