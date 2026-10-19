import {useUser} from '../contexts/UserProvider';
import {Navigate} from 'react-router-dom';
export default function RequireAuth({children}) { const {user,loading}=useUser(); if(loading)return <p>Loading...</p>; return user?children:<Navigate to="/login" replace/>; }
