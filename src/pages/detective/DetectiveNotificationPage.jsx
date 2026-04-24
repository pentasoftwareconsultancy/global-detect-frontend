import React, { useState } from 'react'
import { FaWpforms } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { GrLocationPin } from "react-icons/gr";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiAlarmClock } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { LuBone } from "react-icons/lu";
import { FaBell } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowAltCircleDown } from "react-icons/fa";



const DetectiveNotificationPage = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [unreadOnly, setUnreadOnly] = useState(false)
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'case',
      icon: <FaWpforms />,
      iconBg: 'bg-blue-500/20',
      title: 'Case Updated',
      unread: true,
      description: 'Detective Watson submitted new insights for Case #1234.',
      time: '5 min ago',
      source: 'case',
      actions: ['View Case', 'Mark as Read', 'Delete']
    },
    {
      id: 2,
      type: 'case',
      icon: <IoPerson />,
      iconBg: 'bg-purple-500/20',
      title: 'New Case Assigned',
      unread: true,
      description: 'You have been assigned to Case #235 - Insurance Fraud Investigation.',
      time: '1 hour ago',
      source: 'case',
      actions: ['View Details', 'Mark as Read', 'Delete']
    },
    {
      id: 3,
      type: 'case',
      icon: <TiTick />,
      iconBg: 'bg-green-500/20',
      title: 'Report Ready',
      unread: false,
      description: 'Final investigation report for Case #1232 is ready for download.',
      time: '2 hours ago',
      source: 'case',
      actions: ['Download Report', 'Delete']
    },
    {
      id: 4,
      type: 'system',
      icon: <GrLocationPin />,
      iconBg: 'bg-red-500/20',
      title: 'Location Update Required',
      unread: true,
      description: 'Please update your location for active investigation Case #1236.',
      time: '3 hours ago',
      source: 'system',
      actions: ['Mark as Read', 'Delete']
    },
    {
      id: 5,
      type: 'case',
      icon: <BsFillLightningChargeFill />,
      iconBg: 'bg-yellow-500/20',
      title: 'Case Priority Changed',
      unread: false,
      description: 'Case #1234 priority has been upgraded to Urgent.',
      time: '5 hours ago',
      source: 'case',
      actions: ['View Case', 'Delete']
    },
    {
      id: 6,
      type: 'case',
      icon: <GiAlarmClock />,
      iconBg: 'bg-orange-500/20',
      title: 'Deadline Approaching',
      unread: true,
      description: 'Case #1233 deadline is in 24 hours.',
      time: '6 hours ago',
      source: 'case',
      actions: ['View Case', 'Mark as Read', 'Delete']
    },
    {
      id: 7,
      type: 'team',
      icon: <IoIosPeople />,
      iconBg: 'bg-cyan-500/20',
      title: 'New Team Member',
      unread: false,
      description: 'Detective Johnson has joined the agency.',
      time: '1 day ago',
      source: 'agent',
      actions: ['Delete']
    },
    {
      id: 8,
      type: 'case',
      icon: <FaCloudUploadAlt />,
      iconBg: 'bg-green-500/20',
      title: 'Evidence Uploaded',
      unread: false,
      description: 'New evidence has been uploaded to Case #1254.',
      time: '1 day ago',
      source: 'case',
      actions: ['View Evidence', 'Delete']
    },
    {
      id: 9,
      type: 'case',
      icon: <GoGraph />,
      iconBg: 'bg-pink-500/20',
      title: 'Case Status Changed',
      unread: false,
      description: 'Case #1238 status updated to Report Ready.',
      time: '2 days ago',
      source: 'case',
      actions: ['View Case', 'Delete']
    },
    {
      id: 10,
      type: 'system',
      icon: <LuBone />,
      iconBg: 'bg-gray-500/20',
      title: 'System Maintenance',
      unread: false,
      description: 'Scheduled maintenance on Saturday 10 PM - 2 AM.',
      time: '3 days ago',
      source: 'system',
      actions: ['Delete']
    }
  ])

  const filters = ['All', 'Cases', 'System', 'Team']
  
  const unreadCount = notifications.filter(n => n.unread).length

  const filteredNotifications = notifications.filter(notification => {
    if (unreadOnly && !notification.unread) return false
    if (activeFilter === 'All') return true
    if (activeFilter === 'Cases') return notification.type === 'case'
    if (activeFilter === 'System') return notification.type === 'system'
    if (activeFilter === 'Team') return notification.type === 'team'
    return true
  })

  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'case': return 'bg-blue-500/20 text-blue-400'
      case 'system': return 'bg-purple-500/20 text-purple-400'
      case 'agent': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getActionButtonStyle = (action) => {
    if (action.includes('View') || action.includes('Download')) {
      return 'bg-red-500 hover:bg-red-600 text-white'
    }
    return 'bg-transparent text-gray-400 hover:text-gray-300'
  }

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false, actions: notification.actions.filter(a => a !== 'Mark as Read') }
          : notification
      )
    )
  }

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        unread: false,
        actions: notification.actions.filter(a => a !== 'Mark as Read')
      }))
    )
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const handleAction = (action, id) => {
    if (action === 'Delete') {
      handleDelete(id)
    } else if (action === 'Mark as Read') {
      handleMarkAsRead(id)
    }
    // View/Download actions would typically navigate or trigger downloads
    // For now they just log to console
    else if (action.includes('View') || action.includes('Download')) {
      console.log(`${action} clicked for notification ${id}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <span className="text-lg"><FaBell /></span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">Notifications</h1>
              <p className="text-sm text-gray-400">{unreadCount} unread notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button 
              onClick={handleMarkAllRead}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span><FaRegEye /></span>
              <span>Mark All Read</span>
            </button>
            <button 
              onClick={handleClearAll}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span><RiDeleteBin6Line /></span>
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-gray-400 mr-2">
              <span><FaArrowAltCircleDown /></span>
              <span className="text-sm">Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <div 
              className={`w-10 h-5 rounded-full transition-colors ${unreadOnly ? 'bg-cyan-500' : 'bg-gray-700'} relative`}
              onClick={() => setUnreadOnly(!unreadOnly)}
            >
              <div 
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${unreadOnly ? 'translate-x-5' : 'translate-x-0.5'}`}
              />
            </div>
            <span className="text-sm text-gray-400">Unread Only</span>
          </label>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-[#111827]/80 rounded-xl p-4 border ${
                notification.unread ? 'border-gray-700/50' : 'border-transparent'
              } hover:bg-[#1a2332] transition-colors`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-lg">{notification.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{notification.title}</h3>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${getSourceBadgeColor(notification.source)}`}>
                        {notification.source}
                      </span>
                      <span className="text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{notification.description}</p>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {notification.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleAction(action, notification.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${getActionButtonStyle(action)}`}
                      >
                        {action === 'Delete' && <span>🗑</span>}
                        {action === 'Mark as Read' && <span>👁</span>}
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No notifications to display</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetectiveNotificationPage
