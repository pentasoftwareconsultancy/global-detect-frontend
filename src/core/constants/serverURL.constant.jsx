import { API_MODULE } from "../models/api.module";
class ServerUrl {
    
    // Base URL
    static REACT_APP_API_URL = import.meta.env.VITE_API_URL;

    // auth api endpoint
    static AUTH_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.AUTH}`;

        static REGISTER_API = `${ServerUrl.AUTH_API}/register`;
        static LOGIN_API = `${ServerUrl.AUTH_API}/login`;

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

    // blogs api endpoint
    static BLOGS_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.BLOGS}`;

        // Admin routes
        static CREATE_BLOG_API = `${ServerUrl.BLOGS_API}/`;
        static GET_BLOGS_API = `${ServerUrl.BLOGS_API}/stats`;
        static UPDATE_BLOG_API = `${ServerUrl.BLOGS_API}/:id`;
        static DELETE_BLOG_API = `${ServerUrl.BLOGS_API}/:id`;
        // Admin list
        static GET_ALL_BLOGS_API = `${ServerUrl.BLOGS_API}/`;

    // profile api endpoint
    static PROFILE_API = `${ServerUrl.REACT_APP_API_URL}/${API_MODULE.PROFILE}`;

        static GET_PROFILE_API = `${ServerUrl.PROFILE_API}/`;
}

export default ServerUrl;