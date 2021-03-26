import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import paths from './paths'

const Auth = React.lazy(() => import('../pages/auth/auth'))

export default function Router() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BrowserRouter>
                <Switch>
                    <Route path={paths.auth} render={() => <Auth />} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}