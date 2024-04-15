import { User } from '@/types'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'sonner'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getMyUserRequest = async (): Promise<User> => {
        const accesToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accesToken}`,
            },
        })
        if (!response.ok) {
            throw new Error('Failed to get user')
        }
        return response.json()
    }
    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery('fetchCurrentUser', getMyUserRequest)

    if (error) {
        toast.error(error.toString())
    }

    return { currentUser, isLoading }
}

type CreateUserRequest = {
    auth0Id: string
    email: string
}

//this is the hook that will be used to create a user in the database
export const useCreateMyUser = () => {
    //this is the hook that will be used to get the jwt token from the auth0 context once the user is authenticated
    const { getAccessTokenSilently } = useAuth0()
    //
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accesToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                //this is the jwt token that will be used to authenticate the user
                Authorization: `Bearer ${accesToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to create user')
        }
    }

    //all this is done by the react-query library and mutateAsync function will be called by the react-query library
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useMutation(createMyUserRequest)

    //this hook will return the createUser function and the loading error and success state
    //all this is done by the react-query library and each of these states will be set by the react-query library and mutateAsync function will be called by the react-query library
    return { createUser, isLoading, isError, isSuccess }
}

type UpdateUserRequest = {
    name: string
    addressLine1: string
    city: string
    country: string
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const updateMyUserRequest = async (formDate: UpdateUserRequest) => {
        const accesToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accesToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDate),
        })
        if (!response.ok) {
            throw new Error('Failed to update user')
        }

        return response.json()
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isError,
        isSuccess,
        error,
        reset,
    } = useMutation(updateMyUserRequest)

    if (isSuccess) {
        toast.success('User updated successfully')
    }
    if (error) {
        console.log(error)
        toast.error(error.toString())
        reset()
    }

    return { updateUser, isLoading, isError, isSuccess, error, reset }
}
