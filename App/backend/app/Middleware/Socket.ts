import Redis from '@ioc:Adonis/Addons/Redis';
import { BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import { EEventsSocket } from '@pokemon/service';
import ApiToken from 'App/Models/ApiToken';
import User from 'App/Models/User';
import crypto from 'crypto';
import type { Socket } from 'socket.io';

interface IParsedRedis {
  user: BelongsTo<typeof User>;
  expires_at: string;
}

class SocketMiddleware {
  public async middleWare(socket: Socket) {
    socket.use(async (e, next) => {
      this.authenticate(socket)
        .then(user => {
          e.push(user);
          next();
        })
        .catch(e => next(e));
    });
  }

  private async authenticate(socket: Socket) {
    try {
      const token = socket.handshake?.auth.token;
      const tokenRedis = await Redis.get(token);
      if (tokenRedis) {
        const parsedRedis = JSON.parse(tokenRedis) as IParsedRedis;
        if (new Date(parsedRedis.expires_at).getTime() > new Date().getTime()) {
          return parsedRedis.user as unknown as User;
        }
      }
      if (!token || typeof token !== 'string') {
        throw new Error('bla');
      }
      const user = await this.checkToken(token);
      await Redis.set(token, JSON.stringify(user));
      return user.user as User;
    } catch (error) {
      socket.emit(EEventsSocket.closeReason, { error: error?.message });
      socket.disconnect(true);
      throw new Error(error);
    }
  }

  private urlDecode(encoded: string) {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  }

  private generateHash(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private parseToken(token: string) {
    const parts = token.split('.');
    if (parts.length !== 2) {
      throw new Error('Invalid Token');
    }
    const tokenId = this.urlDecode(parts[0]);

    if (!tokenId) {
      throw new Error('Invalid Token');
    }

    const parsedToken = this.generateHash(parts[1]);
    return {
      token: parsedToken,
      tokenId
    };
  }

  private async checkToken(token: string) {
    try {
      const parsedToken = this.parseToken(token);
      const apiToken = await ApiToken.query()
        .select('userId', 'expires_at')
        .where('id', parsedToken.tokenId)
        .andWhere('token', parsedToken.token)
        .preload('user')
        .first();

      if (!apiToken) {
        throw new Error('Invalid Token');
      }

      if (
        new Date(apiToken.expires_at.toISO() as string).getTime() <
        new Date().getTime()
      ) {
        await ApiToken.query()
          .select('userId', 'expires_at')
          .where('id', parsedToken.tokenId)
          .delete();
        throw new Error('Token expires');
      }
      return {
        user: apiToken.user,
        expires_at: apiToken.expires_at.toISO()
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new SocketMiddleware();
