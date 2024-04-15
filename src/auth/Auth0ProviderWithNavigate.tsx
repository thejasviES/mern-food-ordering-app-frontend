import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

type Props = {
    children: React.ReactNode
}

const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate()
    const domain = import.meta.env.VITE_AUTH0_DOMAIN
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE

    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error('unable to initialize auth')
    }
        //this is the call back function that will be called after the user is authenticated
    const onRedirectCallback = () => {
        //this will navigate to the auth-callback page
        //we could have called the backedn api here to create a user in the database but we are doing it in the AuthCallBackPage component
        //because we need to access the user object from the auth0 context
        //and this page is not chidren of the Auth0Provider component which will create the auth0 context , so we cannot access the user object here 
        //we can only access the user object in the children of the Auth0Provider component
        //and the AuthCallBackPage component is the children of the Auth0Provider component

        navigate('/auth-callback')
    }

    return (
        //this is the Auth0Provider component that wraps the children components
        //this will create the auth0 context
        //and this will take care of all login log out and jwt token thing s and all the auth0 related stuff
        //we just need to call the getAccessTokenSilently function from the useAuth0 hook to get the jwt token
        //and then we can use this jwt token to call the backend api
        
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate
