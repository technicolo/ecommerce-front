export async function fetchFromBackend<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Error ${res.status}: ${msg}`);
  }

  return await res.json();
}
