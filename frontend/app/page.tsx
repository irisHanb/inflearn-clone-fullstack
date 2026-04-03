import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <>
          <div>user 보여주기</div>
          <div>user: {session.user.email}</div>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </>
      ) : (
        <Link href={"/sign-in"}>누구세요? 로그인하기</Link>
      )}
    </div>
  );
}
