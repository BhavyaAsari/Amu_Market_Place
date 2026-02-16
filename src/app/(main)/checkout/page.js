import CheckOutPage from "@/components/ShippingComponents/ProceedToCheckOut";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default  async function CheckoutPageConatiner() {

    const result = await getCurrentUser();

    if(!result.success) {

        redirect("/login?callbackUrl=/checkout");


    }


return (

    <>

    <CheckOutPage user={result.user}/>
    </>
)


}