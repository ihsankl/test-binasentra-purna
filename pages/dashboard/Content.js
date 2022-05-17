import * as React from 'react';
import Title from './Title';
import { Divider } from '@mui/material';
import Request from '../../component/request';
import Profile from '../../component/profile';
import Admin from '../../component/admin';
import { capitalizeFirstLetter } from '../../helper';
import MyRequest from '../../component/myrequest';


export default function Content({ menu }) {
    const title = capitalizeFirstLetter(menu);
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Divider />
            {menu === 'request' && <Request />}
            {menu === 'profile' && <Profile />}
            {menu === 'admin' && <Admin />}
            {menu === 'myrequest' && <MyRequest />}
        </React.Fragment>
    );
}