export async function getMe() {
  const token = localStorage.getItem('strapi-jwt');

  console.log("Token:", token);
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) return null;

  return res.json();
}