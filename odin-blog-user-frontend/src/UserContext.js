import { createContext } from 'react';

export const UserContext = createContext({
    id: '',
    firstName: '',
    lastName: '',
    username: ''
});