import "./App.css";
import Header from "@/components/Header";
import MainPage from "@/Pages/MainPage/MainPage";
import Main from "./components/MainSection";
import AddListingPage from "./Pages/AddListingPage/AddListingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/add-listing",
		element: <AddListingPage />,
	},
	{
		path: "/listing/:id",
		element: <div></div>,
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
