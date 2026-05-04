import { API_MODULE } from "../models/api.module";
class ServerUrl {
    
    // Base URL
    static REACT_APP_API_URL = import.meta.env.VITE_API_URL;

    // auth api endpoint
    static AUTH_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.AUTH}`;

        static REGISTER_API = `${ServerUrl.AUTH_API}/register`; //endpoint is same for both sending OTP and verifying OTP for registration, backend will differentiate based on request body
        static LOGIN_API = `${ServerUrl.AUTH_API}/login`; //endpoint is same for all login flows (email/password, send OTP, verify OTP), backend will differentiate based on request body
        static LOGOUT_API = `${ServerUrl.AUTH_API}/logout`; //endpoint to logout user and set is_online to false
    
    // ------------------------- all detective side related api endpoints -------------------------------------------
    // detective kyc api endpoint
    static DETECTIVE_KYC_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.DETECTIVE_KYC}`;
        
        // Detective routes
        static SUBMIT_KYC_API = `${ServerUrl.DETECTIVE_KYC_API}/submit-application`;
        static GET_MY_KYC_API = `${ServerUrl.DETECTIVE_KYC_API}/my-application`; // Assuming the endpoint is /detective-kyc/status
        // Admin routes
        static GET_ALL_KYC_API = `${ServerUrl.DETECTIVE_KYC_API}/`;
        static UPDATE_KYC_STATUS_API = `${ServerUrl.DETECTIVE_KYC_API}/:id/status`; // Assuming the endpoint is /detective-kyc/update-status
        // Get specific application
        static GET_KYC_APPLICATION_API = `${ServerUrl.DETECTIVE_KYC_API}/:id`; // Assuming the endpoint is /detective-kyc/:id
    
    // ------------------------- all user side related api endpoints -----------------------------------------------  
    // user request form api endpoint
    static REQUEST_FORM_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.REQUEST_FORM}`;

        // Public routes
        static DRAFT_REQUEST_FORM_API = `${ServerUrl.REQUEST_FORM_API}/draft`;
        static DRAFT_UPDATE_REQUEST_FORM_API = `${ServerUrl.REQUEST_FORM_API}/draft/:formId`;
        static GET_GUEST_FORM_API = `${ServerUrl.REQUEST_FORM_API}/guest`;
        static GET_FORM_API = `${ServerUrl.REQUEST_FORM_API}/:formId`;
        static UPLOAD_EVIDENCE_API = `${ServerUrl.REQUEST_FORM_API}/:formId/evidence`;
        // Authenticated routes
        static SUBMIT_REQUEST_FORM_BYID_API = `${ServerUrl.REQUEST_FORM_API}/:formId/submit`;
        static DELETE_DRAFT_REQUEST_FORM_API = `${ServerUrl.REQUEST_FORM_API}/:formId`;
        static LINK_GUEST_FORM_API = `${ServerUrl.REQUEST_FORM_API}/:formId/link`;
        static LINK_ALL_GUEST_FORMS_API = `${ServerUrl.REQUEST_FORM_API}/link-all`;
        static GET_MY_FORMS_API = `${ServerUrl.REQUEST_FORM_API}/user/me`;
        // logined user routes
        static CREATE_REQUEST_FORM_API = `${ServerUrl.REQUEST_FORM_API}/submit`;

    // user case api endpoint
    static CASE_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.CASES}`;

        static GET_MY_CASES_API = `${ServerUrl.CASE_API}/my-cases`;
        static GET_CASE_STATS_API = `${ServerUrl.CASE_API}/stats`;
        static GET_CASE_DETAILS_API = `${ServerUrl.CASE_API}/:caseId`;
        
    // profile api endpoint
    static PROFILE_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.PROFILE}`;

        static GET_PROFILE_API = `${ServerUrl.PROFILE_API}/`; //endpoint to get, put and delete current user profile, requires auth token
        static UPDATE_PROFILE_API = `${ServerUrl.PROFILE_API}/`; //endpoint to update current user profile, requires auth token
        static DELETE_PROFILE_API = `${ServerUrl.PROFILE_API}/`; //endpoint to delete current user profile, requires auth token
        
    // ------------------------- all blogs related api endpoints -----------------------------------------------
    // blogs api endpoint
    static BLOGS_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.BLOGS}`;

        // Public routes
        static GET_PUBLISHED_BLOGS_API = `${ServerUrl.BLOGS_API}/`;
        static GET_BLOG_BY_ID_API = `${ServerUrl.BLOGS_API}/:id`;

        // Admin routes
        static CREATE_BLOG_API = `${ServerUrl.BLOGS_API}/`;
        static GET_ALL_BLOGS_API = `${ServerUrl.BLOGS_API}/admin/list`;
        static GET_BLOG_BY_ID_ADMIN_API = `${ServerUrl.BLOGS_API}/admin/preview/:id`;
        static GET_BLOG_BY_STATUS_API = `${ServerUrl.BLOGS_API}/admin/status`;
        static UPDATE_BLOG_API = `${ServerUrl.BLOGS_API}/:id`;
        static DELETE_BLOG_API = `${ServerUrl.BLOGS_API}/:id`;

    // ------------------------- Admin - User Management -----------------------
    static ADMIN_USERS_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.ADMIN_USERS}`;

        static GET_USER_STATS_API = `${ServerUrl.ADMIN_USERS_API}/stats`;
        static GET_ALL_USERS_API = `${ServerUrl.ADMIN_USERS_API}/`;
        static GET_USER_BY_ID_API = `${ServerUrl.ADMIN_USERS_API}/:id`;
        static BLOCK_USER_API = `${ServerUrl.ADMIN_USERS_API}/:id/block`;
        static UNBLOCK_USER_API = `${ServerUrl.ADMIN_USERS_API}/:id/unblock`;

    // ------------------------- Admin - Detective Management ------------------
    static ADMIN_DETECTIVES_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.ADMIN_DETECTIVES}`;

        static GET_DETECTIVE_STATS_API = `${ServerUrl.ADMIN_DETECTIVES_API}/stats`;
        static GET_ALL_DETECTIVES_API = `${ServerUrl.ADMIN_DETECTIVES_API}/`;
        static GET_DETECTIVE_BY_ID_API = `${ServerUrl.ADMIN_DETECTIVES_API}/:id`;
}

export default ServerUrl;