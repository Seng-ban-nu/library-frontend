import './App.css';
import {Routes,Route,Link,Navigate} from 'react-router-dom';
import {useUser} from './contexts/UserProvider';
import RequireAuth from './middleware/RequireAuth';
import Login from './components/Login';
import Logout from './components/Logout';
import Books from './components/Books';
import {BookDetail} from './components/BookDetail';
import BookBorrow from './components/BookBorrow';
export default function App(){
 const {user}=useUser();
 return <><header><h1>Library Management</h1>{user&&<><p>{user.email} · {user.role}</p><nav><Link to="/books">Books</Link><Link to="/borrow">{user.role==='ADMIN'?'Manage requests':'My requests'}</Link><Link to="/logout">Logout</Link></nav></>}</header><main><Routes>
 <Route path="/login" element={<Login/>}/>
 <Route path="/books" element={<RequireAuth><Books/></RequireAuth>}/>
 <Route path="/books/:id" element={<RequireAuth><BookDetail/></RequireAuth>}/>
 <Route path="/borrow" element={<RequireAuth><BookBorrow/></RequireAuth>}/>
 <Route path="/logout" element={<RequireAuth><Logout/></RequireAuth>}/>
 <Route path="*" element={<Navigate to="/books" replace/>}/>
 </Routes></main></>;
}
