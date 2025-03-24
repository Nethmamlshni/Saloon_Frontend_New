import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./component/home page/homepage"
import UserProfile from "./component/home page/user/profile"
import ForgotPassword from "./component/home page/Login/forgotPassword"
import ResetPassword from "./component/home page/Login/resetPassword"
import Feedback from "./component/home page/user/feedback"
import Booking from "./component/home page/HomePages/booking"
import PriceList from "./component/home page/HomePages/pricelist"
import ServicesPage from "./component/home page/HomePages/services"
import WorkersPage from "./component/home page/HomePages/info"
import Adminhomepage from "./component/home page/admin/adminHomepage"
import Adminbooking from "./component/home page/admin/booking"
import AdminFeedback from "./component/home page/admin/feedback"
import AdminPrice from "./component/home page/admin/priceadmin"
import AdminServices from "./component/home page/admin/servicesadmin"
import Admininformation from "./component/home page/admin/infoadmin"
import Adminhomepages from "./component/home page/admin/HomePageAdmin"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/pricelist" element={<PriceList />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<Adminhomepage />} />
        <Route path="/adminhome" element={<Adminhomepages />} />
        <Route path="/adminbooking" element={<Adminbooking />} />
        <Route path="/adminfeedback" element={<AdminFeedback />} />
        <Route path="/adminpricelist" element={<AdminPrice />} />
        <Route path="/adminservices" element={<AdminServices />} />
        <Route path="/admininfor" element={<Admininformation />} />
      </Routes>
    </Router>
   
  )
}

export default App
