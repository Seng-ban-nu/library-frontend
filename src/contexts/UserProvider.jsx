import {useContext,useState,useEffect} from 'react';
import {UserContext} from './UserContext';
// Relative requests use Vite's proxy locally and Vercel's proxy online.
const API=import.meta.env.VITE_API_URL || '';
export function UserProvider({children}) {
  const [user,setUser]=useState(null); const [loading,setLoading]=useState(true);
  async function api(path,options={}) {
    const response=await fetch(API+path,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}});
    const data=await response.json();
    if(!response.ok) { if(response.status===401) setUser(null); throw new Error(data.message||'Request failed'); }
    return data;
  }
  useEffect(()=>{ let active=true; fetch(API+'/api/user/profile',{credentials:'include'}).then(async r=>r.ok?(await r.json()).user:null).then(u=>{if(active)setUser(u);}).catch(()=>{}).finally(()=>{if(active)setLoading(false);}); return ()=>{active=false;}; },[]);
  async function login(email,password) { const data=await api('/api/user/login',{method:'POST',body:JSON.stringify({email,password})}); setUser(data.user); }
  async function logout() { await api('/api/user/logout',{method:'POST'}); setUser(null); }
  return <UserContext.Provider value={{user,loading,login,logout,api}}>{children}</UserContext.Provider>;
}
export function useUser(){return useContext(UserContext);}
