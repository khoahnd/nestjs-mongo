import * as bcrypt from 'bcrypt';

/**
 * @description The encryption helper base on bcrypt
 */
export class Encrypt {
  /**
   * @description Hash a plaintext with salt equals to 10.
   * @param {string} input
   * @param {number} saltRounds
   * @returns {string}
   */
  static hash(input: string, saltRounds = 10): string {
    return bcrypt.hashSync(input, saltRounds);
  }

  /**
   * @description Compare a plainText with the given hashedText.
   * @param {string} plainText
   * @param {string} hashedText
   * @returns {boolean}
   */
  static compare(plainText: string, hashedText: string): boolean {
    return bcrypt.compareSync(plainText, hashedText);
  }
}
