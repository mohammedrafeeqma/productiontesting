import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/user/Login'
import Home from './pages/user/Home'
import Sample from "./components/Sample";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminUsers from "./pages/admin/AdminUsers";
import Profile from "./pages/user/Profile";
import SearchUser from "./pages/user/SearchUser";
import Friends from "./pages/user/Friends";
import Chat from "./pages/user/Chat";
import Events from "./pages/user/Events";
import CreateEvent from "./pages/user/CreateEvent";
import Reportspage from "./components/admin/Reportspage";


function App() {
  return (

    

<Router>
{/* <Routes>
  <Route  path='/' element={<Login/>}/>
  <Route  path='/:id' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes> */}
<Routes>        
  <Route path="/">

    <Route index element={<Login />} />
    <Route path=":id" element={<Home />} />
    <Route path=":id/:favourite" element={<Home />} />
    <Route path="login" element={<Login />} />

    <Route path="/profile/:username" element={<Profile />} />
    <Route path='/search/:searchkey' element={<SearchUser/>} />
    <Route path="/friends" element={<Friends/>} />
    <Route path="/friends/:discovery" element={<Friends/>} />
    <Route path="/friends/:sugested" element={<Friends/>} />
    <Route path="/chat" element={<Chat/>} />
    <Route path="/events/:nearby" element={<Events/>} />
    <Route path="/createevents" element={<CreateEvent/>} />
    {/* <Route path="/404" element={<NotFound/>} /> */}

    <Route path="/sample" element={<Sample/>} />
  </Route>
  

  {/* admin */}

  <Route path="/admin">
    <Route index element={<AdminLogin/>} />
    <Route path=":reports" element={<AdminUsers/>} />
  </Route>


  
  
</Routes>
</Router>
  );
}

export default App;
