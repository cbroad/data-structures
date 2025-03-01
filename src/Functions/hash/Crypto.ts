import Crypto from "crypto";

import { stringify } from "@/Functions/stringify";

export function MD5Hash(value: any): number {
    return CryptoHash(value, "md5");
}

export function SHA256Hash(value: any): number {
    return CryptoHash(value, "sha256");
}

export function SHA512Hash(value: any): number {
    return CryptoHash(value, "sha512");
}

function CryptoHash(value: any, algorithm: string): number {
    return Crypto.createHash(algorithm).update(stringify(value)).digest().readUInt32BE(0);
}