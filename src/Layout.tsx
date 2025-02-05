import { HeaderSimple } from './components/.MantineUI/HeaderSimple/HeaderSimple';
import { FooterCentered } from './components/.MantineUI/FooterCentered/FooterCentered';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.css';

export function Layout() {
    return (
        <div className={classes['body-wrap']}>
            <div className={classes['header-wrap']}>
                <HeaderSimple />
            </div>
            <div className={classes['content-wrap']}>
                <Outlet />
            </div>
            <div className={classes['footer-wrap']}>
                <FooterCentered />
            </div>
        </div>
    );
}