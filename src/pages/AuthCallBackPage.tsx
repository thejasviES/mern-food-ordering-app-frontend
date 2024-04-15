import { useCreateMyUser } from '@/api/MyUserApi'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallBackPage = () => {
    const navigate = useNavigate()
    //this will get the user object from the auth0 context
    const { user } = useAuth0()
    //this will call the createUser function from the MyUserApi
    const { createUser } = useCreateMyUser()

    const hasCreatedUser = useRef(false)
    //this useEffect hook will be called when the user is authenticated
    //it will create a user in the database if the user does not exist
    //and then navigate to the home page    
    //the user object will be available after the user is authenticated

    useEffect(() => {
        if (user?.sub && user?.email && hasCreatedUser.current === false) {
            createUser({ auth0Id: user.sub, email: user.email })
        }
        
        hasCreatedUser.current = true

        navigate('/')
    }, [createUser, navigate, user])
    return <>Loading.....</>
}

export default AuthCallBackPage
