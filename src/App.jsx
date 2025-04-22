import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Write from './pages/Write';
import Article from './pages/Article';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAppWrite } from './context/AppwriteContext';
import { useEffect } from 'react';
import ArticleDetail from './pages/ArticleDetail';
import UserPosts from './pages/UserPosts';
import UpdatePost from './pages/UpdatePosts';
import UserProfilePage from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile'

function App() {
  const {userAccountInfo} = useAppWrite()
    useEffect(()=>{
      userAccountInfo()
    },[])
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{style:{width:600,height:50}}} reverseOrder={false} />
      <Header />
      <div className=" w-full mt-10 sm:max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/all-post" element={<Article />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-post" element={<UserPosts />} />
           <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfilePage/>} />
          <Route path="/update-profile" element={<UpdateProfile/>} />
          
          


        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
