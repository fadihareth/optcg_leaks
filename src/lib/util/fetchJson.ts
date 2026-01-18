export default async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            "Cache-Control": "max-age=3600", // Cache for 1 hour (3600 seconds)
        },
        cache: "default",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch JSON from "${url}" (status ${response.status})`
        );
    }

    try {
        const data = (await response.json()) as T;
        return data;
    } catch {
        throw new Error(`Invalid JSON response from "${url}"`);
    }
}