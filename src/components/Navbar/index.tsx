import { useSession } from "next-auth/react";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
import UnauthenticatedNavbar from "./UnauthenticatedNavbar";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  if (session?.user) return <AuthenticatedNavbar user={session.user} />;

  return <UnauthenticatedNavbar />;
};

export default Navbar;
