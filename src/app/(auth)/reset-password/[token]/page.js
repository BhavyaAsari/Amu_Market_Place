// app/(auth)/reset-password/[token]/page.js
import ResetPassword from "@/components/authComponents/resetPassword";

export default async function Page({ params }) {

  const   {token} = await params
  return (

    <div className="min-h-screen bg-no-repeat bg-center" style={{backgroundImage:"url('/forgetpassy.gif')"}}>
      <ResetPassword token={token} />
    </div>
  );
}
