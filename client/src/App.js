import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SharedLayout from "./SharedLayout";
import Signup from "./Pages/SignUp/Signup";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Aboutus from "./Pages/AboutUs/Aboutus";
import Contactus from "./Pages/Contactus/Contactus";
// import Protected from './Pages/Protected/Protected';
import Dashboard from "./Pages/DashboardPages/index";
import SharedLayoutDashboard from "./SharedLayout/DashboardTheme";
import SharedLayoutCompany from "./SharedLayout/CompanyTheme";
import SharedLayoutDashboardAdmin from "./SharedLayout/AdminDashboardTheme";
import ScenrioPlanning from "./Pages/ScenrioPlanning/ScenrioPlanning";
import { Stepper } from "../src/componant/steppers/Stepper";
import ScenrioPlanning2 from "./Pages/ScenrioPlanning/ScenrioPlanning2";
import Settings from "./Pages/DashboardPages/Settings/index";
import BalanceSourceBoard from "./Pages/DashboardPages/BalanceSourceboard/index";
import Users from "./Pages/AdminPages/Users";
import ScenarioGoals from "./Pages/AdminPages/Goals/ScenarioGoals";
import ScenarioPlanningsAdmin from "./Pages/AdminPages/ScenarioPlanning";
import SignupCompany from "./Pages/SignUp/SignupCompany";
// import AdminSetting from './Pages/AdminPages/Adminsetting';
import AddKPI from "./Pages/AdminPages/kpis/AddKPI";
import Payments from "./Pages/AdminPages/Payments";
import CompnayList from "./Pages/AdminPages/CompanyUserList/CompnayList";
import UserDashboard from "./Pages/Protected/UserDashboard";
import AdminDashboard from "./Pages/Protected/AdminDashboard";
import CfoList from "./Pages/AdminPages/cfoList/CfoList";
import EmailVerified from "./Pages/EmailVerified/EmailVerified";
import ServicesPage from "./Pages/Services/Services";
import Features from "./Pages/Features/Features";
import PrivacyPolicyPage from "./Pages/PrivacyPolicy/PrivacyPolicy";
import FAQPage from "./Pages/Faq/Faq";
import BlogPage from "./Pages/BlogPage/BlogPage";
import Careers from "./Pages/Careers/Careers";
import CompanyDashboard from "./Pages/Protected/CompanyDashboard";
import UsersList from "./Pages/DashboardPages/CompanyUsers/UsersList";
import SubscribersTable from "./Pages/AdminPages/SubscribersTable";
import FileUpload from "./Pages/DashboardPages/ExcelFileUpload/FileUpload";
import TemplateTable from "./componant/steppers/TemplateTable";
import Plans from "./Pages/PackagesPlan/Plans";
import StripePayment from "./Pages/StripeFlow/StripePayment";
import CompaniesList from "./Pages/DashboardPages/CompanyUsers/CompaniesList";
import SubscriptionPlans from "./Pages/PackagesPlan/SubscriptionPlans";
import QueriesList from "./Pages/AdminPages/QueriesList";
import ThankyouScreen from "./Pages/ThankyouScreen/ThankyouScreen";
import FetchQuickbookData from "./Pages/ScenrioPlanning/FetchQuickbookData";
import AddBalanceSourceBoard from "./Pages/DashboardPages/AddBalanceSourceBoard/index";
import SourceBourdView from "./Pages/DashboardPages/SourceBoardView/SourceBourdView";
import FileTemplateData from "./Pages/DashboardPages/ExcelFileUpload/FileTemplateData";
import { useState } from "react";
import LoginWithQuickbook from "./Pages/DashboardPages/LoginWithQuickbook";





const App = () => {

  
  


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/userdashboard"
          element={<UserDashboard Component={<SharedLayoutDashboard />} />}
        >
          {/* <Route path='/dashboard' element={<Protected Component={Dashboard} />} /> */}
          <Route
            path="/userdashboard/dashboard"
            element={<UserDashboard Component={<Dashboard />} />}
          />

           
       
          <Route
            path="/userdashboard/scenarioPlanning"
            element={<UserDashboard Component={<ScenrioPlanning2 />} />}
          />
          <Route
            path="/userdashboard/steppers"
            element={<UserDashboard Component={<Stepper />} />}
          />
          <Route
            path="/userdashboard/KpiPlan"
            element={<UserDashboard Component={<TemplateTable />} />}
          />
          <Route
            path="/userdashboard/quickbookdata"
            element={<UserDashboard Component={<ScenrioPlanning />} />}
          />
          <Route
            path="/userdashboard/fetchquickbookdata"
            element={<UserDashboard Component={<FetchQuickbookData />} />}
          />

          <Route
            path="/userdashboard/ViewBalanceScoreCard"
            element={<UserDashboard Component={<BalanceSourceBoard />} />}
          />
          <Route
            path="/userdashboard/addbalancesourceboard"
            element={<UserDashboard Component={<AddBalanceSourceBoard />} />}
          />
          <Route
            path="/userdashboard/balancesourceboard"
            element={<UserDashboard Component={<SourceBourdView />} />}
          />
          <Route
            path="/userdashboard/settings"
            element={<UserDashboard Component={<Settings />} />}
          />
          <Route
            path="/userdashboard/uploadFile"
            element={<UserDashboard Component={<FileUpload />} />}
          />
          <Route
            path="/userdashboard/FileData"
            element={<UserDashboard Component={<FileTemplateData />} />}
          />
        </Route>

        <Route
          path="/admindashboard"
          element={
            <AdminDashboard Component={<SharedLayoutDashboardAdmin />} />
          }
        >
          <Route
            path="/admindashboard/users"
            element={<AdminDashboard Component={<Users    />} />}
          />
          <Route
            path="/admindashboard/subscribers"
            element={<AdminDashboard Component={<SubscribersTable />} />}
          />

          <Route
            path="/admindashboard/scenariogoals"
            element={<AdminDashboard Component={<ScenarioGoals />} />}
          />
          <Route
            path="/admindashboard/scenarioplannings"
            element={<AdminDashboard Component={<ScenarioPlanningsAdmin />} />}
          />
          <Route
            path="/admindashboard/addKPis"
            element={<AdminDashboard Component={<AddKPI />} />}
          />
          <Route
            path="/admindashboard/adminSetting"
            element={<AdminDashboard Component={<Settings />} />}
          />
          <Route
            path="/admindashboard/payments"
            element={<AdminDashboard Component={<Payments />} />}
          />
          <Route
            path="/admindashboard/companyuser"
            element={<AdminDashboard Component={<CompnayList />} />}
          />
          <Route
            path="/admindashboard/cfolist"
            element={<AdminDashboard Component={<CfoList />} />}
          />
          <Route
            path="/admindashboard/queries"
            element={<AdminDashboard Component={<QueriesList />} />}
          />
        </Route>

        <Route
          path="/companyDashboard"
          element={<CompanyDashboard Component={<SharedLayoutCompany />} />}
        >
          <Route
            path="/companyDashboard/Companies"
            element={<CompanyDashboard Component={<CompaniesList    />} />}
          />
          <Route
            path="/companyDashboard/Team-Members"
            element={<CompanyDashboard Component={<UsersList   />} />}
          />
          <Route
            path="/companyDashboard/settings"
            element={<CompanyDashboard Component={<Settings />} />}
          />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-cfo/:id/*" element={<SignupCompany />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/services" element={<ServicesPage />} />
        <Route path="/features" element={<Features />} /> */}
        <Route path="/faq" element={<FAQPage />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:id/*" element={<ResetPassword />} />
        <Route path="/user-verified/:id/*" element={<EmailVerified />} />
        <Route path="/" element={<SharedLayout />}>
          {/* <MenuItems/> */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route index element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          <Route path="/news-blogs" element={<BlogPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route
            path="/subscription-plans/:id/*"
            element={<SubscriptionPlans />}
          />
          <Route path="/payment-form" element={<StripePayment />} />

          {/* <Route path="/features" element={<Features />} /> */}
          <Route path="/thankyou/:id/*" element={<ThankyouScreen />} />
          <Route path="/login-with-quickbook" element={<LoginWithQuickbook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
