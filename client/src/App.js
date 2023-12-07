import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from './pages/Home'
import Result from './pages/Result'
import Header from './components/Header'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />}></Route>
      <Route path="/result" element={<Result />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <Header/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
