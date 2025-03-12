import { cookies } from "next/headers";

export async function getServerUser() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("token")?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
      headers: {
        Cookie: `token=${sessionCookie}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}
