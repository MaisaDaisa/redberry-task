import "./App.css";
import Header from "@/components/Header";
import ListingPage from "@/components/ListingPage/ListingPage";
import Main from "./components/Main";
import AddListingPage from "./components/AddListingPage/AddListingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ListingPage />,
	},
	{
		path: "/add-listing",
		element: <AddListingPage />,
	},
]);

function App() {
	return (
		<>
			<Header />
			<Main>
				<RouterProvider router={router} />
			</Main>
		</>
	);
}

export default App;
