import React, { useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';

const UserNotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Case Update',
      message: 'Your investigation CASE-1001 has been updated with new evidence.',
      time: '2 hours ago',
      read: false,
      type: 'update'
    },
    {
      id: 2,
      title: 'Detective Assigned',
      message: 'A detective has been assigned to your case CASE-1002.',
      time: '5 hours ago',
      read: false,
      type: 'info'
    },
    {
      id: 3,
      title: 'Investigation Complete',
      message: 'Your investigation CASE-0998 has been completed. View the final report.',
      time: '1 day ago',
      read: true,
      type: 'success'
    },
    {
      id: 4,
      title: 'Payment Received',
      message: 'Payment for case CASE-1001 has been received successfully.',
      time: '2 days ago',
      read: true,
      type: 'success'
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
              Notifications
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#D92B3A] hover:bg-[#b0202a] text-white px-4 py-2 rounded-xl font-medium transition-all text-sm"
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>
          )}
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-[#111827] rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
              <Bell size={40} className="mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400 text-sm sm:text-base">
                No notifications yet
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-[#111827] rounded-2xl p-4 sm:p-5 md:p-6 border transition-all ${
                  notification.read
                    ? 'border-white/5 opacity-60'
                    : 'border-[#D92B3A]/30 shadow-lg shadow-red/5'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                  {/* TEXT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[#D92B3A] rounded-full"></span>
                      )}
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {notification.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base mb-2 sm:mb-3">
                      {notification.message}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                      {notification.time}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all"
                      >
                        <CheckCheck size={16} />
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default UserNotificationPage;