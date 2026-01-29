import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNavbar";

export default function NavBar() {
  return (
    <>
     <div className="navWrapper">
       <DesktopNav />
      <MobileNav />
     </div>
    </>
  );
}
