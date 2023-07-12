import type { Socket } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';

export enum EEventsSocket {
    closeReason = 'closeReason'
}

export interface ISocket<User = any> extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
    user: User
}