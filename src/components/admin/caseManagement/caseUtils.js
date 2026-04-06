export const getPriorityStyle = (priority) => {
  switch (priority) {
    case "urgent":
      return "bg-red text-white";
    case "high":
      return "bg-orange-500 text-white";
    case "medium":
      return "bg-yellow-500 text-black";
    default:
      return "bg-gray-500 text-white";
  }
};

export const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-gray-500 text-white";
    case "In Progress":
      return "bg-purple-500 text-white";
    case "Assigned":
      return "bg-blue-500 text-white";
    case "Insights Submitted":
      return "bg-yellow-500 text-black";
    case "Report Ready":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};