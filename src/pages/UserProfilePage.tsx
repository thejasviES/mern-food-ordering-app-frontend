import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi'
import UserProfileForm from '@/forms/UserProfileForm'

const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser()
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()
    if (isGetLoading) {
        return <div>Loading...</div>
    }
    if (!currentUser) {
        return <div>unable load user profile</div>
    }
    return (
        <UserProfileForm
            onSave={updateUser}
            isLoading={isUpdateLoading}
            currentUser={currentUser}
        />
    )
}


export default UserProfilePage
