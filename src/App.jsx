import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import PrivateRoute from "./utilities/PrivateRoute";
import Footer from "./components/Footer";
import PageNotFound from "./utilities/PageNotFound";
import ErrorBoundary from "./utilities/Error/ErrorBoundary";
import ErrorFallback from "./utilities/Error/ErrorFallback";
import Loader from "./utilities/Loader";

const Login = lazy(() => import("./pages/Login"));
const PostList = lazy(() => import("./pages/Post/List"));
const AddPost = lazy(() => import("./pages/Post/AddPost"));
const EditPost = lazy(() => import("./pages/Post/EditPost"));




function App() {
  return (
    <Router>
      <Header />
      <ErrorBoundary >
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/posts"
              element={
                <Suspense fallback={<Loader />}>
                  <PostList />
                </Suspense>
              }
            />
            <Route
              path="/add-post"
              element={
                <Suspense fallback={<Loader />}>
                  <AddPost />
                </Suspense>
              }
            />
            <Route
              path="/edit-post/:postId"
              element={
                <Suspense fallback={<Loader />}>
                  <EditPost />
                </Suspense>
              }
            />
          </Route>

          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
         
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
