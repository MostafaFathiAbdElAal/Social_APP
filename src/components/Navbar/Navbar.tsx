"use client"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import PasswordIcon from '@mui/icons-material/Password';
import Avatar from '@mui/material/Avatar';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logout from '@/actions/logout.action';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/Redux.hook';
import { getDataUser } from '@/store/features/user.slice';
import { Container, Skeleton } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import FormDialogChangePassword from '../FormDialogChangePassword/FormDialogChangePassword';
export default function Navbar() {
    const [isOpen, setOpen] = useState(false)
    const router = useRouter()
    const data = useAppSelector((store) => store.userReducer.data)
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseFormPassword = useCallback(() => {
        setOpen(false)
    }, [])
    const handleOpenFormPassword = useCallback(() => {
        setOpen(true)
    }, [])

    useEffect(() => {
        dispatch(getDataUser())
    }, [dispatch])
    return (
        <AppBar position="sticky" color='warning' sx={{ paddingBlock: "5px", zIndex: "2000" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Social App
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        {
                            data.message ?
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? "account-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                    >

                                        <div className="relative w-8 h-8 overflow-hidden rounded-full">
                                            <Image
                                                src={data.user.photo}
                                                alt="User Avatar"
                                                fill
                                                sizes="32px"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>


                                    </IconButton>
                                </Tooltip> : (
                        <Skeleton
                            variant="circular"
                            width={32}
                            height={32}
                        />
                        )
                        }
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        disableScrollLock={true}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        sx={{zIndex:"3001"}}
                    >
                        <MenuItem onClick={handleClose}>
                            <Avatar />  Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add another account
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            handleOpenFormPassword()
                        }}>
                            <ListItemIcon>
                                <PasswordIcon fontSize="small" />
                            </ListItemIcon>
                            Reset password
                        </MenuItem>
                        <MenuItem onClick={() => {
                            logout().then(() => { router.push("/login") })
                            handleClose()
                        }}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                    <FormDialogChangePassword open={isOpen} handleCloseDialog={handleCloseFormPassword} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
