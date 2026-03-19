import AdminClientWrapper from "@/utils/adminWrapper";


export default function AdminLayout({ children }) {
  return (

    <AdminClientWrapper>
            {children}

    </AdminClientWrapper>
    
    
  );
}