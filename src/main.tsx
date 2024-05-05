import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.tsx'
import AddReview from './routes/AddReview.tsx'
import About from './routes/About.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import App from './App.tsx'
import CardDetails from './routes/CardDetails.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/add',
        element: <AddReview/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: '/restaurant/:id',
        element: <CardDetails/>
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
