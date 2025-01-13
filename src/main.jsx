import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
import Protected from './components/AuthLayout.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:'/login',
        element: (
          <Protected authentication={false}>
            <Login/> 
          </Protected>
        )
      },
      {
        path:'/signup',
        element: (
          <Protected authentication={false}>
            <Signup /> 
          </Protected>
        )
      },
      {
        path:'/add-post',
        element: (
          <Protected authentication>
            <AddPost /> 
          </Protected>
        )
      },
      {
        path:'/all-posts',
        element: (
          <Protected authentication>
            <AllPosts /> 
          </Protected>
        )
      },
      {
        path:'/Post/:slug',
        element: (
          <Protected authentication>
            <Post /> 
          </Protected>
        )
      },
      {
        path:'/edit-post/:slug',
        element: (
          <Protected authentication>
            <EditPost /> 
          </Protected>
        )
      },
      
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
