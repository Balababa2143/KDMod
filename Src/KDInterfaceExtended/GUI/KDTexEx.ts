import { Map } from 'immutable'
import * as Pixi from 'pixi.js'
let TextureCache = Map<string, Pixi.Texture>()

declare const KDModFiles: Record<string, string>

export function KDTexEx(Image: string, Nearest = false) {
    const ret = TextureCache.get(Image)

    if(null != ret){
        return ret
    }
    else{
        try {
            const options =
                Nearest ? {scaleMode: Pixi.SCALE_MODES.NEAREST} : undefined
            const ret = Pixi.Texture.from(KDModFiles[Image] || Image, options)
            TextureCache = TextureCache.set(Image, ret)
            return ret;
        } catch (e) {
            console.error("Failed to find texture " + Image);
            return null;
        }
    }
}