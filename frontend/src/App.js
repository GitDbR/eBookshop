import { Route, Routes } from 'react-router-dom';
import Header from './pages/auth/header/Header';

//Auth components
import Signup from '../src/pages/auth/components/signup/Signup'
import Signin from '../src/pages/auth/components/signin/Signin'

import AdminDashboard from "./pages/admin/components/dashboard/AdminDashboard"
import CustomerDashboard from "./pages/customer/components/dashboard/CustomerDashboard"
import PostBook from './pages/admin/components/post-book/PostBook';
import UpdateBook from './pages/admin/components/update-book/UpdataBook';
import ViewOrders from './pages/admin/components/view-orders/ViewOrders';
import Cart from './pages/customer/components/cart/Cart';
import MyOrders from './pages/customer/components/my-orders/MyOrders';


function App() {
  return (
    <>
    {/* {Header compoent} */}
    <Header/>
    <Routes>
      {/* {Auth compoent} */}
      <Route path='/register' element={<Signup/>}/>
      <Route path='/login' element={<Signin/>}/>

      {/* {Admin compoent} */}
      <Route path ='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path ='/admin/book/post' element={<PostBook/>}/>
      <Route path ='/admin/book/:id/edit' element={<UpdateBook/>}/>
      <Route path ='/admin/orders' element={<ViewOrders/>}/>



      {/* {Customer compoent} */}
      <Route path='/customer/dashboard' element={<CustomerDashboard/>}/>
      <Route path='/customer/cart' element={<Cart/>}/>
      <Route path='/customer/orders' element={<MyOrders/>}/>


    </Routes>
    </>
  );
}

export default App;
