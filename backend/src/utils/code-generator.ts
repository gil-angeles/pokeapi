import { randomBytes } from "crypto";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function generateCode(length = 6): string {
  const bytes = randomBytes(length);

  return Array.from(bytes)
    .map((byte) => ALPHABET[byte % ALPHABET.length])
    .join("");
}
