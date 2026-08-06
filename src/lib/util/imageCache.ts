const CACHE_NAME = 'thumbnail-cache-v3';

export default async function getCachedImage(url: string): Promise<string> {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(url);

    if (cached) {
        return URL.createObjectURL(await cached.blob());
    }

    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error('Failed to fetch image');

    await cache.put(url, response.clone());

    return URL.createObjectURL(await response.blob());
}

export async function cleanupCaches() {
    const cacheNames = await caches.keys();

    await Promise.all(
        cacheNames
            .filter(name => name.startsWith('thumbnail-cache-') && name !== CACHE_NAME)
            .map(name => caches.delete(name))
    );
}
