import React, {useState} from 'react';
import {User} from '../../types';
import {Button, Menu, MenuItem} from '@mui/material';
import {useAppDispatch} from '../../app/hooks.ts';
import {NavLink, useNavigate} from "react-router-dom";
import { logout } from '../../features/users/usersThunk.ts';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout()).unwrap();
        navigate('/');
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick}>Hello, {user.username} !</Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem component={NavLink} to="/new-product">Add new product</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;