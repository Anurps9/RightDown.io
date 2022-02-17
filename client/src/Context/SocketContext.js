import { createContext } from 'react';
import {io} from 'socket.io-client'

export const socket = process.env.NODE_ENV === 'development' ? io('http://localhost:3001') : io();
export const SocketContext = createContext()