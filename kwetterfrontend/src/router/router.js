import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import paths from './paths'

const Auth = React.lazy(() => import('../pages/auth/auth'))
const SignUp = React.lazy(() => import('../pages/signup/signup'))
const Home = React.lazy(() => import('../pages/home/home'))
const Profile = React.lazy(() => import('../pages/profile/profile'))
const Manage = React.lazy(() => import('../pages/manage/manage'))

export default function Router() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={paths.root} render={() => <Home />} />
                    <Route exact path={paths.auth} render={() => <Auth />} />
                    <Route exact path={paths.signup} render={() => <SignUp />} />
                    <Route exact path={paths.profile} render={() => <Profile />} />
                    <Route exact path={paths.manage} render={() => <Manage />} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}