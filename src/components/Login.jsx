import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useUser} from '../contexts/UserProvider';
export default function Login(){
 const {user,login,loading}=useUser(); const [error,setError]=useState(''); const [busy,setBusy]=useState(false);
 if(loading)return <p>Loading...</p>; if(user)return <Navigate to="/books" replace/>;
 async function submit(e){e.preventDefault();setBusy(true);setError('');const d=new FormData(e.currentTarget);try{await login(d.get('email'),d.get('password'));}catch(err){setError(err.message);}finally{setBusy(false);}}
 return <section><h2>Login</h2><form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label><button disabled={busy}>{busy?'Logging in...':'Login'}</button></form><p role="alert">{error}</p></section>;
}
