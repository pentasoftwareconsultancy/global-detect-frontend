import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Eye, Search, Trash2 } from "lucide-react";
import { FiFileText, FiClock, FiClipboard } from "react-icons/fi";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes.constant";
import adminCaseService from "../../../core/services/adminCase.service";
import { toast } from "react-toastify";

const CaseManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [priority, setPriority] = useState("All");
  const [dateSort, setDateSort] = useState("All");
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedDetective, setSelectedDetective] = useState("");
  
  // Real data from backend
  const [cases, setCases] = useState([]);
  const [availableDetectives, setAvailableDetectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCases, setTotalCases] = useState(0);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(20); // 20 items per page

  // Store previous tab to detect changes
  const prevTabRef = useRef(activeTab);
  
  // Debounce timer for search
  const searchDebounceRef = useRef(null);

  // Fetch cases from backend with caching
  useEffect(() => {
    // Reset to page 1 when tab changes
    if (activeTab !== prevTabRef.current) {
      setCurrentPage(1);
      prevTabRef.current = activeTab;
    }
    fetchCases();
  }, [activeTab, status, type, priority, search, currentPage]);

  // Fetch available detectives with caching
  useEffect(() => {
    fetchAvailableDetectives();
  }, []);

  // Handle URL query parameters
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "pending") setActiveTab("pending");
    else if (tab === "review") setActiveTab("review");
    
    const action = searchParams.get("action");
    if (action === "generate-report") { setActiveTab("review"); setShowReportModal(true); }
    
    // Handle status filter from URL
    const statusParam = searchParams.get("status");
    if (statusParam) {
      const statusMap = {
        'submitted': 'Unassigned',
        'pending_assignment': 'Unassigned',
        'assigned': 'Assigned',
        'in_progress': 'In Progress',
        'insights_submitted': 'Insights Submitted',
        'changes_requested': 'Report Ready',
        'completed': 'Report Ready',
      };
      const mappedStatus = statusMap[statusParam] || statusParam;
      setStatus(mappedStatus);
    }
    
    // Handle priority filter from URL
    const priorityParam = searchParams.get("priority");
    if (priorityParam) {
      setPriority(priorityParam);
    }
    
    // Handle investigation type filter from URL
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setType(typeParam);
    }
    
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [searchParams]);

  // Generate cache key based on current filters
  const getCacheKey = useCallback(() => {
    return `caseManagement_${activeTab}_${status}_${type}_${priority}_${search}_${currentPage}`;
  }, [activeTab, status, type, priority, search, currentPage]);

  const fetchCases = async () => {
    try {
      // Check cache first (valid for 2 minutes)
      const cacheKey = getCacheKey();
      const cachedData = sessionStorage.getItem(cacheKey);
      const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
      
      if (cachedData && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        if (age < 120000) { // 2 minutes
          const parsed = JSON.parse(cachedData);
          setCases(parsed.cases || []);
          setTotalCases(parsed.totalCases || 0);
          setTotalPages(parsed.totalPages || 1);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      
      const filters = {
        page: currentPage,
        limit: itemsPerPage,
      };

      // Map frontend status to backend status
      const statusMap = {
        'Unassigned': 'pending_assignment',
        'Assigned': 'assigned',
        'In Progress': 'in_progress',
        'Insights Submitted': 'insights_submitted',
        'Report Ready': 'completed',
      };

      if (status !== "All") {
        filters.status = statusMap[status] || status.toLowerCase().replace(' ', '_');
      }

      if (type !== "All") {
        filters.investigationType = type;
      }

      if (priority !== "All") {
        filters.priority = priority.toLowerCase();
      }

      if (search) {
        filters.search = search;
      }

      let response;
      if (activeTab === "pending") {
        response = await adminCaseService.getPendingCases(currentPage, itemsPerPage);
      } else if (activeTab === "review") {
        response = await adminCaseService.getCasesWithInsights(currentPage, itemsPerPage);
      } else {
        response = await adminCaseService.getAllCases(filters);
      }

      if (response.success) {
        const casesData = response.data.cases || [];
        const totalItems = response.data.pagination?.totalItems || casesData.length || 0;
        const pages = response.data.pagination?.totalPages || 1;
        
        setCases(casesData);
        setTotalCases(totalItems);
        setTotalPages(pages);

        // Cache the data
        const dataToCache = {
          cases: casesData,
          totalCases: totalItems,
          totalPages: pages,
        };
        sessionStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        sessionStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      }
    } catch (error) {
      console.error('Failed to fetch cases:', error);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableDetectives = async () => {
    try {
      // Check cache first (valid for 5 minutes)
      const cachedDetectives = sessionStorage.getItem('availableDetectives');
      const cacheTimestamp = sessionStorage.getItem('availableDetectives_timestamp');
      
      if (cachedDetectives && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        if (age < 300000) { // 5 minutes
          setAvailableDetectives(JSON.parse(cachedDetectives));
          return;
        }
      }

      const response = await adminCaseService.getAvailableDetectives();
      if (response.success) {
        const detectives = response.data || [];
        setAvailableDetectives(detectives);
        
        // Cache the detectives list
        sessionStorage.setItem('availableDetectives', JSON.stringify(detectives));
        sessionStorage.setItem('availableDetectives_timestamp', Date.now().toString());
      }
    } catch (error) {
      console.error('Failed to fetch detectives:', error);
    }
  };

  // Clear cache when actions are performed
  const clearCaseCache = useCallback(() => {
    // Clear all case management cache entries
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('caseManagement_')) {
        sessionStorage.removeItem(key);
      }
    });
  }, []);

  // Clear dashboard cache to force refresh of statistics
  const clearDashboardCache = useCallback(() => {
    sessionStorage.removeItem('dashboardData');
    sessionStorage.removeItem('dashboardDataTimestamp');
  }, []);

  const handleAssignDetective = async () => {
    if (!selectedCase || !selectedDetective) return;

    try {
      setActionLoading(true);
      const response = await adminCaseService.assignDetective(selectedCase.id, selectedDetective);
      if (response.success) {
        // Clear both case and dashboard cache
        clearCaseCache();
        clearDashboardCache();
        await fetchCases();
        setShowAssignModal(false);
        setSelectedCase(null);
        setSelectedDetective("");
        toast.success('Detective assigned successfully!');
      }
    } catch (error) {
      console.error('Failed to assign detective:', error);
      toast.error(error.response?.data?.message || 'Failed to assign detective. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCase = async () => {
    if (!selectedCase) return;

    try {
      setActionLoading(true);
      const response = await adminCaseService.deleteCase(selectedCase.id);
      if (response.success) {
        // Clear both case and dashboard cache
        clearCaseCache();
        clearDashboardCache();
        await fetchCases();
        setShowDeleteModal(false);
        setSelectedCase(null);
        toast.success('Case deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete case:', error);
      toast.error(error.response?.data?.message || 'Failed to delete case. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePriority = async (caseId, newPriority) => {
    try {
      const response = await adminCaseService.updateCasePriority(caseId, newPriority);
      if (response.success) {
        // Clear both case and dashboard cache
        clearCaseCache();
        clearDashboardCache();
        await fetchCases();
        toast.success('Priority updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update priority:', error);
      toast.error(error.response?.data?.message || 'Failed to update priority. Please try again.');
    }
  };

  // Debounced search handler
  const handleSearchChange = useCallback((value) => {
    // Clear existing timeout
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    // Set new timeout
    searchDebounceRef.current = setTimeout(() => {
      setSearch(value);
      setCurrentPage(1); // Reset to first page on search
    }, 500); // 500ms debounce
  }, []);

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setType("All");
    setPriority("All");
    setDateSort("All");
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const tabs = [
    { name: "All Cases",      key: "all",     icon: <FiFileText size={14} /> },
    { name: "Pending Cases",  key: "pending", icon: <FiClock size={14} /> },
    { name: "Review Insights",key: "review",  icon: <FiClipboard size={14} /> },
  ];

  // Filter data locally for date sorting
  const filteredData = useMemo(() => {
    let data = [...cases];

    if (dateSort === "Newest") {
      data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    } else if (dateSort === "Oldest") {
      data.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    }

    return data;
  }, [cases, dateSort]);

  return (
    <div className="text-white bg-[#121F27] p-4 font-monserrat ">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
          <FiFileText className="text-red-500" />
          Case Management
        </h1>
        <p className="text-lightGray text-sm">
          View and manage all investigation cases
        </p>
      </div>

      {/* TABS */}
      <div className="mb-6">
        <div className="inline-flex gap-1 p-1 border border-[#2a3a44] rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2 text-sm rounded-lg font-medium transition whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-red text-white"
                  : "text-[#8FA3B0] hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* FILTERS ONLY FOR ALL TAB */}
      {activeTab === "all" && (
        <div className="bg-[#1A2832] border border-[#22313d] rounded-xl p-5 mb-6">

          {/* SEARCH */}
          <div className="flex items-center bg-[#1A2832] px-4 py-3 rounded-lg border border-white/50 mb-5">
            <Search size={16} className="text-[#8FA3B0]" />
            <input
              defaultValue={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by case number, title, client name, or investigation type..."
              className="ml-3 bg-transparent outline-none w-full text-sm text-white placeholder-[#8FA3B0]"
            />
          </div>

          {/* FILTER GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">

            {/* STATUS */}
            <div>
              <p className="text-sm text-white mb-2">Status</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option value="All">All Status</option>
                <option value="Unassigned">Unassigned</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Insights Submitted">Insights Submitted</option>
                <option value="Report Ready">Report Ready</option>
              </select>
            </div>

            {/* TYPE */}
            <div>
              <p className="text-sm text-white mb-2">Investigation Type</p>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option value="All">All Types</option>
                <option value="Financial Fraud">Financial Fraud</option>
                <option value="Cybercrime">Cybercrime</option>
                <option value="Homicide">Homicide</option>
                <option value="Insurance Fraud">Insurance Fraud</option>
                <option value="Missing Person">Missing Person</option>
                <option value="Workplace Investigation">Workplace Investigation</option>
                <option value="Corporate Investigation">Corporate Investigation</option>
                <option value="Personal Investigation">Personal Investigation</option>
                <option value="Asset Recovery">Asset Recovery</option>
                <option value="Background Check">Background Check</option>
              </select>
            </div>

            {/* PRIORITY */}
            <div>
              <p className="text-sm text-white mb-2">Priority</p>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option value="All">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <p className="text-sm text-white mb-2">Date Range</p>
              <select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                className="w-full bg-[#1A2832] border border-white/50 px-3 py-2.5 rounded-lg text-sm text-white"
              >
                <option>All Time</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-5">
            <p className="text-sm text-[#8FA3B0]">
              Showing {filteredData.length} of {totalCases} cases
            </p>

            <button
              onClick={clearFilters}
              className="text-sm px-4 py-2 border border-white/50 rounded-lg text-white hover:bg-[#22313d]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      {activeTab !== "review" && (
        <div className="bg-[#1A2832] border border-[#22313d] rounded-xl p-4">

          {/* TITLE */}
          <div className="mb-4">
            <p className="text-sm text-white">Cases</p>
            <p className="text-xs text-[#8FA3B0]">
              All investigation cases with details and actions
            </p>
          </div>

          {loading ? (
            <div className="space-y-3">
              {/* Loading skeleton */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-[120px_260px_220px_120px_140px_180px_100px] items-center px-4 py-4 bg-[#1A2832] border border-[#243642] rounded-xl animate-pulse">
                  <div className="h-4 bg-[#2a3a44] rounded w-3/4"></div>
                  <div className="h-4 bg-[#2a3a44] rounded w-2/3"></div>
                  <div className="h-4 bg-[#2a3a44] rounded w-1/2"></div>
                  <div className="h-6 bg-[#2a3a44] rounded w-16"></div>
                  <div className="h-6 bg-[#2a3a44] rounded w-20"></div>
                  <div className="h-4 bg-[#2a3a44] rounded w-24"></div>
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 bg-[#2a3a44] rounded-lg"></div>
                    <div className="h-8 w-8 bg-[#2a3a44] rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-8 text-[#8FA3B0]">No cases found</div>
          ) : (
            <>
              {/* HEADER */}
              <div className="bg-[#243643] rounded-lg border border-[#22313d] px-4 py-3 text-xs text-[#8FA3B0] grid grid-cols-[120px_260px_220px_120px_140px_180px_100px]">
                <div>Case ID</div>
                <div>Client Name</div>
                <div>Investigation Type</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Detective</div>
                <div className="text-right">Actions</div>
              </div>

              {/* ROWS */}
              <div className="mt-3 space-y-3">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[120px_260px_220px_120px_140px_180px_100px] items-center px-4 py-4 bg-[#1A2832] border border-[#243642] rounded-xl hover:bg-[#1b2a35] transition"
                  >
                    {/* CASE ID */}
                    <div>
                      <p className="text-white text-sm">{item.caseId || item.formNumber}</p>
                      <p className="text-xs text-[#8FA3B0] mt-1">
                        {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>

                    {/* CLIENT */}
                    <div>
                      <p className="text-white text-sm">{item.clientName || 'N/A'}</p>
                      <p className="text-xs text-[#8FA3B0]">
                        {item.caseDescription || item.investigationType || 'Investigation'}
                      </p>
                    </div>

                    {/* TYPE */}
                    <div className="text-sm">{item.investigationType || 'General'}</div>

                    {/* PRIORITY */}
                    <div>
                      <select
                        value={item.priority}
                        onChange={(e) => handleUpdatePriority(item.id, e.target.value)}
                        className={`
                          px-2 py-1 text-xs rounded-md font-medium border-0 cursor-pointer
                          ${item.priority === "urgent" && "bg-red-500/20 text-red-400"}
                          ${item.priority === "high" && "bg-orange-500/20 text-orange-400"}
                          ${item.priority === "medium" && "bg-yellow-400/20 text-yellow-300"}
                          ${item.priority === "low" && "bg-green-500/20 text-green-300"}
                        `}
                      >
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>

                    {/* STATUS */}
                    <div>
                      <span className={`
                        px-3 py-1 text-xs rounded-md font-medium
                        ${item.statusLabel?.includes("Pending") && "bg-gray-500/20 text-gray-300"}
                        ${item.statusLabel?.includes("Assigned") && "bg-blue-500/20 text-blue-300"}
                        ${item.statusLabel?.includes("Progress") && "bg-purple-500/20 text-purple-300"}
                        ${item.statusLabel?.includes("Insights") && "bg-yellow-400/20 text-yellow-300"}
                        ${item.statusLabel?.includes("Completed") && "bg-green-500/20 text-green-300"}
                      `}>
                        {item.statusLabel || item.status}
                      </span>
                    </div>

                    {/* DETECTIVE */}
                    <div className="text-sm text-[#8FA3B0] italic">
                      {item.detective || "Unassigned"}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-2">

                      {/* SHOW ASSIGN BUTTON IF UNASSIGNED */}
                      {(!item.detectiveId || item.detective === "Unassigned") && (
                        <button
                          onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL, { state: { caseItem: item } })}
                          className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                          title="Assign Detective"
                        >
                          <MdOutlinePersonAddAlt />
                        </button>
                      )}

                      <button
                        onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL, { state: { caseItem: item } })}
                        className="p-2 border border-[#243642] rounded-lg hover:bg-[#223544]"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCase(item);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10"
                        title="Delete Case"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-[#8FA3B0]">
                    Page {currentPage} of {totalPages} • Showing {filteredData.length} of {totalCases} cases
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-[#243642] rounded-lg text-sm text-white hover:bg-[#223544] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {/* First Page */}
                      {currentPage > 3 && (
                        <>
                          <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-2 border border-[#243642] rounded-lg text-sm text-white hover:bg-[#223544]"
                          >
                            1
                          </button>
                          {currentPage > 4 && <span className="text-[#8FA3B0]">...</span>}
                        </>
                      )}

                      {/* Current Page and Neighbors */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          return page === currentPage || 
                                 page === currentPage - 1 || 
                                 page === currentPage + 1 ||
                                 (currentPage <= 2 && page <= 3) ||
                                 (currentPage >= totalPages - 1 && page >= totalPages - 2);
                        })
                        .map(page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 border rounded-lg text-sm ${
                              page === currentPage
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'border-[#243642] text-white hover:bg-[#223544]'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                      {/* Last Page */}
                      {currentPage < totalPages - 2 && (
                        <>
                          {currentPage < totalPages - 3 && <span className="text-[#8FA3B0]">...</span>}
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-2 border border-[#243642] rounded-lg text-sm text-white hover:bg-[#223544]"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-[#243642] rounded-lg text-sm text-white hover:bg-[#223544] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* REVIEW TAB CONTENT */}
      <div className="max-w-5xl px-6">
        {activeTab === "review" && (
          <div className="max-w-4xl">
            <p className="text-sm text-white mb-4">
              Cases with Submitted Insights
            </p>

            {loading ? (
              <div className="space-y-4">
                {/* Loading skeleton */}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-[#1A2832] border border-[#22313d] rounded-xl p-5 animate-pulse">
                    <div className="h-4 bg-[#2a3a44] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[#2a3a44] rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-[#2a3a44] rounded w-1/3 mb-1"></div>
                    <div className="h-3 bg-[#2a3a44] rounded w-1/4 mb-4"></div>
                    <div className="bg-[#243643] border border-[#2a3a44] rounded-lg p-4 mb-4">
                      <div className="h-3 bg-[#2a3a44] rounded w-full mb-2"></div>
                      <div className="h-3 bg-[#2a3a44] rounded w-5/6"></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-9 bg-[#2a3a44] rounded-lg w-32"></div>
                      <div className="h-9 bg-[#2a3a44] rounded-lg w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-8 text-[#8FA3B0]">No cases with insights found</div>
            ) : (
              filteredData.map((item) => (
                <div key={item.id} className="bg-[#1A2832] border border-[#22313d] rounded-xl p-5 mb-4">
                  <p className="text-white font-medium mb-2">
                    {item.caseDescription || item.investigationType}
                  </p>

                  <p className="text-xs text-[#8FA3B0] mb-3">
                    Client: {item.clientName}
                  </p>

                  <p className="text-xs text-[#8FA3B0]">Detective:</p>
                  <p className="text-sm text-white mb-4">
                    {item.detective}
                  </p>

                  {/* INSIGHT BOX */}
                  {item.insightsPreview && (
                    <div className="bg-[#243643] border border-[#2a3a44] rounded-lg p-4 mb-4">
                      <p className="text-xs text-[#8FA3B0] mb-1">Insights:</p>
                      <p className="text-sm text-white leading-relaxed">
                        {item.insightsPreview}
                      </p>
                    </div>
                  )}

                  {/* BUTTONS */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate(ROUTES.ADMIN_CASE_MANAGEMENT_DETAIL, { state: { caseItem: item } })}
                      className="px-6 py-2 rounded-lg border border-[#2a3a44] text-sm text-white hover:bg-[#243643]"
                    >
                      View Full Details
                    </button>

                    <button
                      onClick={() => setShowReportModal(true)}
                      className="px-6 py-2 rounded-lg bg-red text-white text-sm hover:bg-red-600"
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ASSIGN DETECTIVE MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-md bg-[#1A2832] border border-[#22313d] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Assign Detective</h2>
            <p className="text-sm text-[#8FA3B0] mb-4">
              Case: {selectedCase?.caseId || selectedCase?.formNumber}
            </p>

            <div className="mb-4">
              <label className="text-sm text-white mb-2 block">Select Detective</label>
              <select
                value={selectedDetective}
                onChange={(e) => setSelectedDetective(e.target.value)}
                className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm text-white"
              >
                <option value="">Choose a detective...</option>
                {availableDetectives.map((detective) => (
                  <option key={detective.id} value={detective.id}>
                    {detective.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedCase(null);
                  setSelectedDetective("");
                }}
                disabled={actionLoading}
                className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm text-white hover:bg-[#243643] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignDetective}
                disabled={!selectedDetective || actionLoading}
                className="px-4 py-2 bg-[#D92B3A] hover:bg-[#b0222f] rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Assigning...' : 'Assign Detective'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A2832] border border-[#22313d] rounded-xl p-6 relative">
            <button 
              onClick={() => setShowReportModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>
            <h2 className="font-['Montserrat'] font-semibold text-[18px] text-white mb-1">
              Generate Comprehensive Case Report
            </h2>
            <p className="font-['Montserrat'] font-normal text-[12px] text-[#9CA3AF] mb-6">
              Create a detailed investigation report with findings, evidence, and supporting documents
            </p>
            <div className="space-y-5">
              {[
                { label: "Executive Summary *",  placeholder: "Provide a high-level overview..." },
                { label: "Key Findings *",        placeholder: "• Finding 1..." },
                { label: "Evidence Collected",    placeholder: "Document all evidence..." },
                { label: "Recommendations",       placeholder: "" },
                { label: "Next Steps",            placeholder: "" },
                { label: "Conclusion *",          placeholder: "" },
              ].map((field) => (
                <div key={field.label}>
                  <p className="font-['Montserrat'] font-medium text-[14px] text-white mb-2">{field.label}</p>
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full bg-[#0f1a1f] border border-[#22313d] rounded-lg p-3 text-sm text-white placeholder-[#9CA3AF] outline-none resize-none"
                  />
                </div>
              ))}
              <div className="bg-[#1f2f3a] border border-[#2a3a44] rounded-lg p-4">
                <p className="font-['Montserrat'] font-medium text-[14px] text-white mb-2">Supporting Documents</p>
                <button className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm text-white hover:bg-[#243643] transition">
                  Choose Files
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowReportModal(false)} 
                className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm text-white font-['Montserrat'] font-medium hover:bg-[#243643] transition"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#D92B3A] hover:bg-[#b0222f] rounded-lg text-sm text-white font-['Montserrat'] font-medium transition">
                Generate & Send Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-md bg-[#1A2832] border border-[#22313d] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Delete Case</h2>
            <p className="text-sm text-[#8FA3B0] mb-2">
              Are you sure you want to delete this case?
            </p>
            <p className="text-sm text-white mb-4">
              Case: {selectedCase?.caseId || selectedCase?.formNumber}
            </p>
            <p className="text-xs text-red-400 mb-6">
              This action cannot be undone. All case data will be permanently deleted.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCase(null);
                }}
                disabled={actionLoading}
                className="px-4 py-2 border border-[#2a3a44] rounded-lg text-sm text-white hover:bg-[#243643] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCase}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Deleting...' : 'Delete Case'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CaseManagement;
