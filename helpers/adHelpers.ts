import { APIRequestContext } from "@playwright/test";
import { CreateAdReqDto, CreateAdResDto } from "./types";

const ONEPIX_PNG_BASE64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

// Хелпер подачи объявления
export async function createAd(
    request: APIRequestContext,
    token: string,
    dto: CreateAdReqDto
): Promise<CreateAdResDto> {
    const buffer = Buffer.from(ONEPIX_PNG_BASE64, "base64");

    const res = await request.post("/api/v1/advertisement", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        multipart: {
            title: dto.title,
            description: dto.description,
            price: String(dto.price),
            photos: {
                name: "test.png",
                mimeType: "image/png",
                buffer,
            },
        },
    });

    if (!res.ok()) {
        throw new Error(`Create ad failed: ${res.status()} ${await res.text()}`);
    }

    return res.json();
}

// Хелпер удаления объявления
export async function deleteAd(request: APIRequestContext, token: string, adId: string) {
    const res = await request.delete("/api/v1/advertisement", {
        params: { id: adId },
        headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok()) return;
    if (res.status() === 403 || res.status() === 400) {
        return;
    }

    throw new Error(`Delete ad failed: ${res.status()} ${await res.text()}`);
}

// Хелпер создания нескольких объявлений
export async function createAds(api: APIRequestContext, token: string, dtos: CreateAdReqDto[]) {
    const created: CreateAdResDto[] = [];
    for (const dto of dtos) {
        const ad = await createAd(api, token, dto);
        created.push(ad);
    }

    return created;
}

// Хелпер удаления нескольких объявлений
export async function deleteAds(api: APIRequestContext, token: string, ads: { id: string }[]) {
    await Promise.all(
        ads.map(async (ad) => {
            try {
                await deleteAd(api, token, String(ad.id));
            } catch (e) {
                console.warn("Failed to delete ad", ad.id, e);
            }
        })
    );
}