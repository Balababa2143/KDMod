declare const KDModFiles: Record<string, string>

export function GetFile(path: string){
    return KDModFiles[path] || path
}