import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from './components/ui/sonner'

//this is the query client that will be used to make the api calls
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            {/* this is the query client provider that will provide the query client to the children components */}
            <QueryClientProvider client={queryClient}>
                {/* this is the Auth0ProviderWithNavigate component that will create the auth0 context */}
                <Auth0ProviderWithNavigate>
                    <AppRoutes />
                    <Toaster
                        visibleToasts={1}
                        position='top-right'
                        richColors
                    />
                </Auth0ProviderWithNavigate>
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
)
