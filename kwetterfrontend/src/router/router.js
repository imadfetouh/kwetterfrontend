import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import paths from './paths'

const Auth = React.lazy(() => import('../pages/auth/auth'))
const Home = React.lazy(() => import('../pages/home/home'))

export default function Router() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={paths.root} render={() => <Home />} />
                    <Route exact path={paths.auth} render={() => <Auth />} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}