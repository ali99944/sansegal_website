"use client"

import type React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../redux/store"
import ReactQueryProvider from "./query-provider"
import { Spinner } from "@/components/ui/spinner"
import NotificationProvider from "./notification-provider"

interface AppProviderProps {
    children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <NotificationProvider>
            <Provider store={store}>
            <PersistGate loading={<Spinner size="lg"/>} persistor={persistor}>
                <ReactQueryProvider>
                    <div>
                        {children}
                    </div>
                </ReactQueryProvider>
            </PersistGate>
        </Provider>
        </NotificationProvider>
    )
}
