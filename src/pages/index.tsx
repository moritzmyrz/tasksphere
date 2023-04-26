import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "~/components/Navbar";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <button onClick={session ? () => void signOut() : () => void signIn()}>
        {session ? "Sign Out" : "Sign In"}
      </button>
      {session && <p>You&apos;re logged in as {session.user.name}</p>}
    </div>
  );
};

export default Home;
