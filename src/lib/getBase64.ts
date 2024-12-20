import { getPlaiceholder } from "plaiceholder";
import type { Photo, ImagesResults } from "@/models/Images";

async function getBase64(imageUrl:string) {
        try {
            const res = await fetch(imageUrl, {cache: 'force-cache'});

            if(!res.ok) {
                throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
            }
            const buffer = await res.arrayBuffer()
            const {base64} = await getPlaiceholder(Buffer.from(buffer))
            return base64; 

        } catch(err) {
            if(err instanceof Error) console.log(err.stack);
        }
}

export default async function addBlurredDataUrls(Images:ImagesResults): Promise<Photo[]> {
    // make all requests at once instead of awaiting each one avoiding a waterfall
    const base64Promises = Images.photos.map(photo => getBase64(photo.src.large));

    // resolve all requests in order
    const base64Results = await Promise.all(base64Promises);

    const photosWithBlur: Photo[] = Images.photos.map((photo, i) => ({
        ...photo,
        blurredDataUrl: base64Results[i]
      
    }));
    // console.log('photosWithBlur', photosWithBlur);
    return photosWithBlur;
}