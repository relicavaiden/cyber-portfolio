

export type StoredMedia = {
    storageKey: string;
    url: string;
};

export type StoreMediaInput = {
    buffer: Buffer;
    mimeType: string;
    originalName: string;
};

export type StoreMedia = (
    input: StoreMediaInput
) => Promise<StoredMedia>