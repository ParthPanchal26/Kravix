import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux_store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";

const isGitHubPages = import.meta.env.VITE_NODE_ENV === "production";
const basePath = isGitHubPages ? "/Kravix" : "";
const router = createBrowserRouter([
    {
        path: basePath + "/",
        element: <App />,
        children: [
            {
                path: basePath + "/",
                element: <Home />,
            },
            {
                path: basePath + "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: basePath + "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path: basePath + "/all-posts",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: basePath + "/add-post",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: basePath + "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: basePath + "/post/:slug",
                element: <Post />,
            },
        ],
    },
]);


const router_local = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <RouterProvider router={router_local} /> */}
    </Provider>
  </StrictMode>,
)
