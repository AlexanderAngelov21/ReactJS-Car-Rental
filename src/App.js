import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import HomePge from "./pages/HomePge";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarsListPage from "./pages/CarsListPage";
import CustomersListPage from "./pages/CustomersListPage";
import UserLoggedInGuard from "./util/guards/UserLoggedInGuard";
import UserNotAuthenticatedGuard from "./util/guards/UserNotAuthenticatedGuard";
import CarRentalPage from "./pages/CarRentalPage";

function App() {
  return (
    
    <BrowserRouter>
  
      <Header />
      <Routes>
        <Route path="/" element={<HomePge />} />
        <Route
          path="/login"
          element={
            <UserNotAuthenticatedGuard>
              <LoginPage />
            </UserNotAuthenticatedGuard>
          }
        />
        
        <Route
          path="/register"
          element={
            <UserNotAuthenticatedGuard>
              <RegisterPage />
            </UserNotAuthenticatedGuard>
          }
        />
        
        <Route
          path="/cars"
          element={
            <UserLoggedInGuard>
              <CarsListPage />
            </UserLoggedInGuard>
          }
        />
        <Route
          path="/customers"
          element={
            <UserLoggedInGuard>
              <CustomersListPage />
            </UserLoggedInGuard>
          }
        />
        
        <Route path="/cars/:carId/rent" element={<CarRentalPage />} />
      </Routes>
    </BrowserRouter>

  );

}

export default App;
