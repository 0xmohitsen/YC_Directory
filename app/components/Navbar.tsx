import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "@/app/auth";

const Navbar = async () => {
  const session = await auth();
  console.log("What is inside in session :", session);
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="cursor-pointer">
                  Logout
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
                <span>
                  <Image
                    src={session?.user?.image ?? "/logo.png"}
                    alt="user image"
                    width={40}
                    height={40}
                    className="rounded-full border"
                  />
                </span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="cursor-pointer">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
