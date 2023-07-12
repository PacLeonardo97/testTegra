"use client"
import { createContext, useEffect, useContext, useState } from 'react'
import type { ReactNode, MutableRefObject } from 'react'
import { io, Socket } from 'socket.io-client'

interface IProps {
  children: ReactNode
}

interface ISocketContext {
  socketClient: Socket | undefined
}

export const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }: IProps) => {
  const [socketClient, setSocketClient] = useState<Socket>()

  useEffect(() => {
      setSocketClient(io('http://localhost:3333', {
        transports: ['websocket', 'polling'],
        reconnection: true,
        auth: {
          token: 'MTI.7TZBEtTmYfLn7-JYoILOdA1SSKczcWHDTVzpyoUqh6e7uTGpguVKhQHTfANm'
        }
      }))
  }, []);

  useEffect(() => {
    socketClient?.on("connect_error", (err) => {
      console.log(err.message); // prints the message associated with the error
    });
    socketClient?.on("disconnect", (err) => {
      console.log('disconectado', err);
    });
  }, [socketClient])

  return (
    <SocketContext.Provider
      value={{
        socketClient
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
