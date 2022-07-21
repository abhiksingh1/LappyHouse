import logo from './logo.svg';
import './App.css';
import {Route , BrowserRouter , Redirect} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingLaptop from './pages/BookingLaptop'
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddLaptop from './pages/AddLaptop';
import AdminHome from './pages/AdminHome';
import EditLaptop from './pages/EditLaptop';

function App() {
  return (
    <div className="App">
         
         <BrowserRouter>
             
             <ProtectedRoute path='/' exact component={Home} />
             <Route path='/login' exact component={Login} />
             <Route path='/register' exact component={Register} />
             <ProtectedRoute path='/booking/:laptopid' exact component={BookingLaptop} />
             <ProtectedRoute path='/userbookings' exact component={UserBookings} />
             <ProtectedRoute path='/addlaptop' exact component={AddLaptop} />
             <ProtectedRoute path='/editlaptop/:laptopid' exact component={EditLaptop} />
             <ProtectedRoute path='/admin' exact component={AdminHome} />
         
         </BrowserRouter>

    </div>
  );
}

export default App;


export function ProtectedRoute(props)
{

    if(localStorage.getItem('user'))
    {
      return <Route {...props}/>
    }
    else{
      return <Redirect to='/login'/>
    }

}
