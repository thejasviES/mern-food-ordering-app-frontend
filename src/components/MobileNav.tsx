import { CircleUserRound, Menu } from 'lucide-react'
import { Button } from './ui/button'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from './ui/sheet'
import { useAuth0 } from '@auth0/auth0-react'
import { Separator } from '@radix-ui/react-separator'
import MobileNavLinks from './MobileNavLinks'

const MobileNav = () => {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0()

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='text-orange-500' />
            </SheetTrigger>
            <SheetContent className='space-y-3'>
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className='flex item-centre font-bold gap-2'>
                            <CircleUserRound className='text-orange-500' />
                            {user?.email}
                        </span>
                    ) : (
                        <span> welcome to MernEats.com</span>
                    )}
                </SheetTitle>
                <Separator></Separator>
                <SheetDescription className='flex flex-col gap-4'>
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button
                            className='flex-1 font-bold bg-orange-500'
                            onClick={async () => await loginWithRedirect()}
                        >
                            Login
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
