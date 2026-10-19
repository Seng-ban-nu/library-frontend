import {useState,useEffect} from 'react';
import {useParams,useNavigate,Link} from 'react-router-dom';
import {useUser} from '../contexts/UserProvider';
export function BookDetail(){
 const {id}=useParams();const navigate=useNavigate();const {user,api}=useUser();const [book,setBook]=useState(null);const [error,setError]=useState('');const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
 useEffect(()=>{api('/api/books/'+id).then(setBook).catch(e=>setError(e.message));},[id]);
 async function save(e){e.preventDefault();setBusy(true);setError('');const d=Object.fromEntries(new FormData(e.currentTarget));try{setBook(await api('/api/books/'+id,{method:'PATCH',body:JSON.stringify({...d,quantity:Number(d.quantity)})}));setMessage('Book saved');}catch(e){setError(e.message);}finally{setBusy(false);}}
 async function remove(){if(!window.confirm('Soft delete this book?'))return;setBusy(true);try{await api('/api/books/'+id,{method:'DELETE'});navigate('/books');}catch(e){setError(e.message);}finally{setBusy(false);}}
 return <><Link to="/books">Back to books</Link><p role="alert">{error}</p><p role="status">{message}</p>{book&&<section><h2>{book.title}</h2><p>{book.author} · {book.location} · Available: {book.quantity} · {book.status}</p>{user.role==='ADMIN'&&book.status==='ACTIVE'&&<><form onSubmit={save}>{['title','author','location','quantity'].map(n=><label key={n}>{n}<input name={n} defaultValue={book[n]} type={n==='quantity'?'number':'text'} min="0" step="1" required/></label>)}<button disabled={busy}>Save changes</button></form><button disabled={busy} onClick={remove}>Soft delete</button></>}{user.role==='USER'&&<Link to={'/borrow?bookId='+book._id}>Request this book</Link>}</section>}</>;
}
