


export function getHashCode(obj: any): number {
    let hash = 0;
    if (obj === null || typeof obj !== 'object') {
        return hashString(String(obj));
    }
 
    // Instead of stringifying the whole thing, 
    // we iterate keys and hash their values
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            hash = ((hash << 5) - hash) + hashString(key);
            const val = obj[key];
            
            // For nested objects, recursion (be careful with depth/circular refs)
            if (typeof val === 'object' && val !== null) {
                hash = ((hash << 5) - hash) + getHashCode(val);
            } else {
                hash = ((hash << 5) - hash) + hashString(String(val));
            }
            hash |= 0; // Convert to 32bit int
        }
    }
    return hash;
}

function hashString(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return h;
}


