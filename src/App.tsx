import './App.css'
import Header from '@/components/Layout/Header'
import MainPage from '@/Pages/MainPage/MainPage'
import Main from './components/Layout/MainSection'
import AddListingPage from './Pages/AddListingPage/AddListingPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListingPage from '@/Pages/ListingPage/ListingPage'

const router = createBrowserRouter([
  {
    // Main Page
    // path: '/',
    // element: <MainPage />,
  },
  {
    // Page for adding a listing
    path: '/add-listing',
    element: <AddListingPage />,
  },
  {
    // Page for viewing a specific listing
    path: '/listing/:idParam',
    element: <ListingPage />,
  },
])

function App() {
  return (
    <>
      <Header />
      <Main>
        <RouterProvider router={router} />
      </Main>
    </>
  )
}

export default App
