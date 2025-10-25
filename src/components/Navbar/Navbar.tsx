"use client"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { MouseEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import logout from '@/actions/logout.action';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux.hook';
import { getDataUser } from '@/store/features/user.slice';

export default function Navbar() {
    const router = useRouter()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const currentURL: string = usePathname()
    const data = useAppSelector((store) => store.userReducer.data)
    const dispatch = useAppDispatch()



    const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    // ...
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
        if (data.message === null) {
            dispatch(getDataUser())
            console.log(true)
        }

    }, [data.message, dispatch])
    return (
        <AppBar position="sticky" color='warning' sx={{ paddingBlock: "5px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Social App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >

                        </Menu>
                    </Box>


                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={data.user.name} src={data.user.photo} />

                        </IconButton>

                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        maxWidth: '18rem',
                                        width: '100%',
                                        overflow: 'visible',
                                        boxShadow: 'none',
                                        background: 'transparent',
                                    },
                                },

                            }}
                            disableScrollLock
                        >
                            <div className="max-w-xs w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]">
                                <div className="px-4 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-700 to-blue-600">
                                    <p className="text-xs font-medium text-blue-200 uppercase tracking-wider">
                                        Signed in as
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 overflow-hidden flex items-center justify-center mr-2">
                                            <Image alt={data.user.name} src={data.user.photo} width={100} height={200} className='w-full object-contain' />
                                        </div>
                                        <p className="text-sm font-medium text-white truncate">
                                            {data.user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="py-1.5">
                                    <Link
                                        href={`/myProfile`}
                                        className={`group relative flex items-center px-4 py-2.5 text-sm hover:bg-blue-50 transition-all duration-200 ${currentURL.includes("myProfile") ? "bg-blue-50" : "text-gray-700"
                                            }`}
                                    >
                                        <div
                                            className={`absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition-all duration-200 ${currentURL.includes("myProfile")
                                                ? "opacity-100 scale-y-100"
                                                : "opacity-0 scale-y-80 group-hover:opacity-100 group-hover:scale-y-100"
                                                }`}
                                        />
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors duration-200 ${currentURL.includes("myProfile") ? "bg-blue-200" : "bg-blue-100 group-hover:bg-blue-200"
                                                }`}
                                        >
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                className={`h-5 w-5 ${currentURL.includes("myProfile")
                                                    ? "text-[#2b6cb0]"
                                                    : "text-blue-600 group-hover:text-[#2b6cb0]"
                                                    }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    clipRule="evenodd"
                                                    fillRule="evenodd"
                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                />
                                            </svg>
                                        </div>
                                        <span
                                            className={`font-medium transition-colors duration-200 ${currentURL.includes("myProfile")
                                                ? "text-[#1a365d]"
                                                : "text-gray-700 group-hover:text-[#1a365d]"
                                                }`}
                                        >
                                            Profile
                                        </span>
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            className={`h-3 w-3 ml-auto transition-colors duration-200 ${currentURL.includes("myProfile")
                                                ? "text-[#2b6cb0]"
                                                : "text-gray-400 group-hover:text-[#2b6cb0]"
                                                }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            />
                                        </svg>
                                    </Link>

                                    <Link
                                        href={`/settings`}
                                        className={`group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 ${currentURL.includes("settings") ? "bg-blue-50" : ""} transition-all duration-200`}
                                    >
                                        <div className={`absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r group-hover:opacity-100 ${currentURL.includes("settings") ? "opacity-100 scale-y-100" : "opacity-0 scale-y-80"} transition-all duration-200 group-hover:scale-y-100`} />
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 ${currentURL.includes("settings") ? "bg-blue-200" : "bg-blue-100"} transition-colors duration-200`}>
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                className={`h-5 w-5 ${currentURL.includes("settings") ? "text-[#2b6cb0]" : "text-blue-600"} group-hover:text-[#2b6cb0]`}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    clipRule="evenodd"
                                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                                    fillRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className={`font-medium ${currentURL.includes("settings") ? "text-gray-700" : "text-gray-700"} group-hover:text-[#1a365d]`}>
                                            Settings
                                        </span>
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            className={`h-3 w-3  ml-auto ${currentURL.includes("settings") ? "text-[#2b6cb0]" : "text-gray-400"} group-hover:text-[#2b6cb0]`}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                    <div
                                        className="group cursor-pointer relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200"
                                        onClick={() => {
                                            logout().then(() => {
                                                router.push("/login")
                                            })
                                        }}
                                    >
                                        <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80" />
                                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                className="h-5 w-5 text-red-500 group-hover:text-red-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    clipRule="evenodd"
                                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                                    fillRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <button className="font-medium text-gray-700 group-hover:text-red-600">
                                            Logout
                                        </button>
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            className="h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
