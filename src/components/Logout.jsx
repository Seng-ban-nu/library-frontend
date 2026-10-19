import {useState} from 'react';
import {useUser} from '../contexts/UserProvider';
export default function Logout(){const {logout}=useUser();const [error,setError]=useState('');return <section><h2>Logout</h2><button onClick={()=>logout().catch(e=>setError(e.message))}>Confirm logout</button><p role="alert">{error}</p></section>;}
