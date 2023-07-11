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
      auth: {
        token: 'MQ.ulifcEryKFOyKhLzqnKL0G3Rw2sZ0vhnERxAWoDmXeml8ZZMXetNi1jgTuVA'
      }
    }))
  }, [])

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
