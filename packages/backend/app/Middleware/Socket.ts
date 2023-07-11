import ApiToken from 'App/Models/ApiToken';
import User from 'App/Models/User';
import crypto from 'crypto'
import type { Socket } from 'socket.io';

class SocketMiddleware {
    public run(socket: Socket) {
        try {
            const token = socket.handshake?.auth.token;
            if (!token || typeof token !== 'string') {
                throw new Error('bla');
            }

            return this.checkToken(token)
        } catch (error) {
            return Promise.reject(error);
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
            throw new Error('E_INVALID_API_TOKEN');
        }
        const tokenId = this.urlDecode(parts[0]);
    
        if (!tokenId) {
            throw new Error('E_INVALID_API_TOKEN');
        }
    
        const parsedToken = this.generateHash(parts[1]);
        return {
            token: parsedToken,
            tokenId,
        }
    }

    private async checkToken(token: string) {
        const parsedToken = this.parseToken(token);
        const apiToken = await ApiToken.query()
            .select('userId')
            .where('id', parsedToken.tokenId)
            .andWhere('token', parsedToken.token)
            .preload('user')
            .first();
        if (!apiToken) {
            throw new Error('E_INVALID_API_TOKEN');
        }
        return apiToken.user;
    }
}

export default new SocketMiddleware();
