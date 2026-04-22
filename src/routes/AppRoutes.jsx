import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "../core/constants/routes.constant";



/* ======================= LAYOUTS ======================= */
const PublicLayout = lazy(() => import("../components/layout/PublicLayout"));
const UserLayout = lazy(() => import("../components/layout/UserLayout"));
const DetectiveLayout = lazy(() => import("../components/layout/DetectiveLayout"));
const AdminLayout = lazy(() => import("../components/layout/AuthLayout"));
const AboutUs = lazy(() => import("../components/nonuser/home/AboutUs"));
const Blogs = lazy(() => import("../components/nonuser/home/Blogs"));
const BlogDetails = lazy(() => import("../components/nonuser/home/BlogDetails"));
const ContactInfo = lazy(() => import("../components/nonuser/home/ContactInfo"));
const Services = lazy(() => import("../components/nonuser/home/Services"));

/* ======================= AUTH PAGES ======================= */
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const OTP = lazy(() => import("../pages/auth/OTP"));

const UserForm = lazy(() => import("../pages/auth/UserForm"));
const DetectiveForm = lazy(() => import("../pages/auth/DetectiveForm"));

/* ======================= USER PAGES ======================= */
const UserDashboardPage = lazy(() => import("../pages/user/UserDashboardPage"));
const UserDetailsPage = lazy(() => import("../pages/user/UserDetailsPage"));
const UserBlogDetailPage = lazy(() => import("../pages/user/UserBlogDetailPage"));
const UserNotificationPage = lazy(() => import("../pages/user/UserNotificationPage"));
const UserProfilePage = lazy(() => import("../pages/user/UserProfilePage"));
const UserSettingsPage = lazy(() => import("../pages/user/UserSettingsPage"));
const RequestInvestigationPage = lazy(() => import("../pages/user/RequestInvestigationPage"));

/* ======================= DETECTIVE PAGES ======================= */
const DetectiveDashboardPage = lazy(() => import("../pages/detective/DetectiveDashboardPage"));
const CaseDetailsPage = lazy(() => import("../pages/detective/CaseDetailsPage"));
const DetectiveNotificationPage = lazy(() => import("../pages/detective/DetectiveNotificationPage"));
const DetectiveProfilePage = lazy(() => import("../pages/detective/DetectiveProfilePage"));
const DetectiveSettingsPage = lazy(() => import("../pages/detective/DetectiveSettingsPage"));

/* ======================= ADMIN PAGES ======================= */
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));

const AllCaseManagement = lazy(() => import("../components/admin/caseManagement/AllCaseManagement"));

const AdminUserManagementPage = lazy(() => import("../pages/admin/userManagement/AdminUserManagementPage"));
const AdminUserDetailsPage = lazy(() => import("../pages/admin/userManagement/AdminUserDetailsPage"));

const AdminCaseDetailsPage = lazy(() => import("../pages/admin/caseManagement/AdminCaseDetailsPage"));
const AdminCaseDetailsUnassignedPage = lazy(() => import("../pages/admin/caseManagement/AdminCaseDetailsUnassignedPage"));
const AdminCaseManagementPage = lazy(() => import("../pages/admin/caseManagement/AdminCaseManagementPage"));

const AdminDetectiveDetailsPage = lazy(() => import("../pages/admin/detectiveManagement/AdminDetectiveDetailsPage"));
const AdminDetectiveKYC = lazy(() => import("../pages/admin/detectiveManagement/AdminDetectiveKYC"));
const AdminDetectiveManagementOnCasePage = lazy(() => import("../pages/admin/detectiveManagement/AdminDetectiveManagementOnCasePage"));
const AdminDetectiveManagementPage = lazy(() => import("../pages/admin/detectiveManagement/AdminDetectiveManagementPage"));

const AdminHistoryPage = lazy(() => import("../pages/admin/history/AdminHistoryPage"));

const AdminNotification = lazy(() => import("../pages/admin/AdminNotification"));
const AdminBlogPage = lazy(() => import("../pages/admin/AdminBlogPage"));
const AdminProfilePage = lazy(() => import("../pages/admin/AdminProfilePage"));
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings"));
const PendingCaseManagement = lazy(() =>
  import("../components/admin/caseManagement/PendingCaseManagement")
);

const ReviewInsightsCaseManagement = lazy(() =>
  import("../components/admin/caseManagement/ReviewInsightsCaseManagement")
);
/* ======================= PUBLIC PAGES ======================= */
const HomeHero = lazy(() => import("../pages/nonuserpages/HomePage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.OTP} element={<OTP />} />
        <Route element={<PublicLayout />}>
          <Route index element={<HomeHero />} />

            {/* NEW ROUTES */}
            <Route path={ROUTES.ABOUT} element={<AboutUs />} />
              <Route path={ROUTES.SERVICES} element={<Services />} />
          
            <Route path={ROUTES.BLOG} element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
             <Route path={ROUTES.CONTACT} element={<ContactInfo />} />
            <Route path={ROUTES.USER_BLOG_DETAIL} element={<UserBlogDetailPage />} />
        </Route>

        {/* ================= REQUEST INVESTIGATION (public - no auth required) ================= */}
        {/* <Route element={<UserLayout />}>
  <Route path={ROUTES.REQUEST_INVESTIGATION} element={<RequestInvestigationPage />} />
        </Route> */}

        {/* ================= USER ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route element={<UserLayout />}>
            <Route path={ROUTES.USER_FORM} element={<UserForm />} />
            <Route path={ROUTES.USER_DASHBOARD} element={<UserDashboardPage />} />
            <Route path={`${ROUTES.USER_DASHBOARD_DETAILS}/:id`} element={<UserDetailsPage />} />
            <Route path={ROUTES.USER_NOTIFICATION} element={<UserNotificationPage />} />
            <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage />} />
            <Route path={ROUTES.USER_SETTINGS} element={<UserSettingsPage />} />
          </Route>
        </Route>

        {/* ================= DETECTIVE FORM (NO LAYOUT) ================= */}
        <Route element={<ProtectedRoute allowedRoles={["detective"]} />}>
          <Route path={ROUTES.DETECTIVE_FORM} element={<DetectiveForm />} />
        </Route>

        {/* ================= DETECTIVE ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["detective"]} />}>
          <Route element={<DetectiveLayout />}>
            <Route path={ROUTES.DETECTIVE_DASHBOARD} element={<DetectiveDashboardPage />} />
            <Route path={ROUTES.DETECTIVE_CASE_DETAILS} element={<CaseDetailsPage />} />
            <Route path={ROUTES.DETECTIVE_NOTIFICATION} element={<DetectiveNotificationPage />} />
            <Route path={ROUTES.DETECTIVE_PROFILE} element={<DetectiveProfilePage />} />
            <Route path={ROUTES.DETECTIVE_SETTING} element={<DetectiveSettingsPage />} />
          </Route>
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
            <Route
  path={ROUTES.ADMIN_ALL_CASE_MANAGEMENT}
  element={<AllCaseManagement />}
/>
<Route
  path={ROUTES.ADMIN_PENDING_CASE_MANAGEMENT}
  element={<PendingCaseManagement />}
/>

<Route
  path={ROUTES.ADMIN_REVIEW_INSIGHTS}
  element={<ReviewInsightsCaseManagement />}
/>
            <Route path={ROUTES.ADMIN_USER_MANAGEMENT} element={<AdminUserManagementPage />} />
            <Route path={ROUTES.ADMIN_USER_MANAGEMENT_DETAIL} element={<AdminUserDetailsPage />} />

            <Route path={ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL} element={<AdminCaseDetailsPage />} />
            <Route path={ROUTES.ADMIN_CASE_MANAGEMENT_UNASSIGNED} element={<AdminCaseDetailsUnassignedPage />} />
            <Route path={ROUTES.ADMIN_CASE_MANAGEMENT} element={<AdminCaseManagementPage />} />

            <Route path={ROUTES.ADMIN_DETECTIVE_MANAGEMENT_DETAIL} element={<AdminDetectiveDetailsPage />} />
            <Route path={ROUTES.ADMIN_DETECTIVE_KYC} element={<AdminDetectiveKYC />} />
            <Route path={ROUTES.ADMIN_DETECTIVE_MANAGEMENT_ONCASE} element={<AdminDetectiveManagementOnCasePage />} />
            <Route path={ROUTES.ADMIN_DETECTIVE_MANAGEMENT} element={<AdminDetectiveManagementPage />} />
            
            <Route path={ROUTES.ADMIN_HISTORY} element={<AdminHistoryPage />} />
            
            <Route path={ROUTES.ADMIN_NOTIFICATION} element={<AdminNotification />} />
            <Route path={ROUTES.ADMIN_BLOG} element={<AdminBlogPage />} />
            <Route path={ROUTES.ADMIN_PROFILE} element={<AdminProfilePage />} />
            <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;