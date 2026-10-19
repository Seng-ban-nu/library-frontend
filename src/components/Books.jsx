import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../contexts/UserProvider';
export default function Books(){
 const {user,api}=useUser();const [books,setBooks]=useState([]);const [error,setError]=useState('');const [busy,setBusy]=useState(false);const [filters,setFilters]=useState({title:'',author:'',status:'ACTIVE'});
 async function load(){try{setError('');setBooks(await api('/api/books?'+new URLSearchParams(filters)));}catch(e){setError(e.message);}}
 useEffect(()=>{load();},[]);
 async function create(e){e.preventDefault();const form=e.currentTarget;const d=Object.fromEntries(new FormData(form));setBusy(true);try{await api('/api/books',{method:'POST',body:JSON.stringify({...d,quantity:Number(d.quantity)})});form.reset();await load();}catch(e){setError(e.message);}finally{setBusy(false);}}
 return <><h2>Books</h2><form onSubmit={e=>{e.preventDefault();load();}} className="row"><input aria-label="Search title" placeholder="Search title" value={filters.title} onChange={e=>setFilters({...filters,title:e.target.value})}/><input aria-label="Search author" placeholder="Search author" value={filters.author} onChange={e=>setFilters({...filters,author:e.target.value})}/>{user.role==='ADMIN'&&<select aria-label="Book status" value={filters.status} onChange={e=>setFilters({...filters,status:e.target.value})}><option>ACTIVE</option><option>DELETED</option><option>ALL</option></select>}<button>Search</button></form>
 <p role="alert">{error}</p><div className="scroll"><table><thead><tr><th>Title</th><th>Author</th><th>Available</th><th>Location</th><th>Status</th><th>Action</th></tr></thead><tbody>{books.map(b=><tr key={b._id}><td>{b.title}</td><td>{b.author}</td><td>{b.quantity}</td><td>{b.location}</td><td>{b.status}</td><td><Link to={'/books/'+b._id}>View</Link></td></tr>)}</tbody></table></div>{!books.length&&<p>No matching books.</p>}
 {user.role==='ADMIN'&&<section><h2>Add a book</h2><form onSubmit={create}>{['title','author','location'].map(n=><label key={n}>{n}<input name={n} maxLength="200" required/></label>)}<label>Quantity<input name="quantity" type="number" min="0" step="1" required/></label><button disabled={busy}>Add book</button></form></section>}</>;
}
