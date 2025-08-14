"use client"

import { useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { NotificationContext } from "@/src/providers/notification-provider"

export type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationProps {
  id: string
  message: string
  type: NotificationType
}

export default function Notification({ id, message, type }: NotificationProps) {
  const { removeNotification } = useContext(NotificationContext)

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id)
    }, 5000)
    return () => clearTimeout(timer)
  }, [id, removeNotification])

  const typeConfig = {
    success: {
      bg: "bg-gradient-to-r from-green-50 to-emerald-50",
      border: "border-green-200",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: "text-green-800",
      accent: "bg-green-500",
      shadow: "shadow-green-100",
    },
    error: {
      bg: "bg-gradient-to-r from-red-50 to-rose-50",
      border: "border-red-200",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      text: "text-red-800",
      accent: "bg-red-500",
      shadow: "shadow-red-100",
    },
    warning: {
      bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
      border: "border-amber-200",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      text: "text-amber-800",
      accent: "bg-amber-500",
      shadow: "shadow-amber-100",
    },
    info: {
      bg: "bg-primary/10",
      border: "border-primary/60",
      icon: <Info className="w-5 h-5 text-primary" />,
      text: "text-primary",
      accent: "bg-primary/80",
      shadow: "shadow-primary/10",
    },
  }

  const config = typeConfig[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={`
        relative overflow-hidden rounded border backdrop-blur-sm
        ${config.bg} ${config.border} ${config.shadow}
        shadow  transition-shadow duration-300
      `}
      dir="rtl"
    >
      {/* Accent bar */}
      <div className={`absolute top-0 right-0 w-1 h-full ${config.accent}`} />
      
      {/* Progress bar for auto-dismiss */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 5, ease: "linear" }}
        className={`absolute bottom-0 right-0 h-0.5 ${config.accent} opacity-30`}
      />

      <div className="p-3 pr-5">
        <div className="flex items-start gap-3">
          {/* Icon with subtle animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="flex-shrink-0 mt-0.5"
          >
            {config.icon}
          </motion.div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`text-sm font-medium leading-relaxed ${config.text}`}
            >
              {message}
            </motion.p>
          </div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeNotification(id)}
            className="flex-shrink-0 p-1 rounded-full hover:bg-white/50 transition-colors duration-200 group cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
