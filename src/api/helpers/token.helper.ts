import * as jwt from 'jsonwebtoken';
import { DecodedToken } from '@api/interfaces';
/**
 * @description The token helpers
 */
export class Token {
  /**
   * @name signAccessToken
   * @description Sign the access token.
   * @param {Object} payload
   * @param {string} payload.userId  The user id.
   * @param {string} payload.roles   The user roles.
   * @return {Promise<Object>}
   */
  static signAccessToken(payload: {
    userId: string | number;
    roles: string[];
  }): { token: string; ttl: Date } {
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES,
      algorithm: process.env.ALGORITHM,
    });

    const { exp: ttl }: { exp: number } = jwt.decode(token);
    /* ++ Convert time-to-live to current date ++ */
    return { token, ttl: new Date(ttl * 1000) };
  }

  /**
   * @name signRefreshToken
   * @description Sign the refresh token.
   * @param {Object} payload
   * @param {string} payload.userId  The user id.
   * @param {string} payload.roles   The user roles.
   * @return {Promise<Object>}
   */
  static signRefreshToken(payload: {
    userId: string | number;
    roles: string[];
  }): { token: string; ttl: Date } {
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      algorithm: process.env.ALGORITHM,
    });

    const { exp: ttl }: { exp: number } = jwt.decode(token);
    /* ++ Convert time-to-live to current date ++ */
    return { token, ttl: new Date(ttl * 1000) };
  }

  /**
   * @name verifyToken
   * @description Verify the token with the secret provided.
   * @param {string} token   The token to verify.
   * @param {string} secret  The secret to use.
   * @return {Promise<T>} payload
   */
  static async verifyToken<T>(token: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(token, secret);
        /* seconds to miliseconds */
        payload.iat = payload.iat;
        payload.exp = payload.exp;
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @name verifyAccessToken
   * @description Verify the access token.
   * @param {string} token  The access token.
   * @return {Promise<T>}   The payload.
   */
  static async verifyAccessToken(token: string): Promise<DecodedToken> {
    return this.verifyToken(token, process.env.SECRET);
  }

  /**
   * @name verifyRefreshToken
   * @description Verify the refresh token.
   * @param {string} token  The refresh token.
   * @return {Promise<T>}   The payload.
   */
  static async verifyRefreshToken(token: string): Promise<DecodedToken> {
    return this.verifyToken(token, process.env.SECRET);
  }
}
