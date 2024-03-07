import crypto from "crypto"
export function generateRandom4DigitNumber() {
  // Generate a random number between 1000 and 9999
  const min = 1000
  const max = 9999

  return crypto.randomInt(min, max)
}
