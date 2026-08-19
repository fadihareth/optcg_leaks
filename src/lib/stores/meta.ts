import { fetchJson } from "$lib/util";
import { baseURL } from "$lib/constants";

type MetaData = {
    cache_name: string;
}

let metadataPromise: Promise<MetaData> | undefined;

export function getMetaData() {
    if (!metadataPromise) {
        metadataPromise = fetchJson(`${baseURL}/meta.json`);
    }

    return metadataPromise;
}
