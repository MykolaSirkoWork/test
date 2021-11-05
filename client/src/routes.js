import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {StudentsList} from "./pages/StudentsList";
import {CreateStudents} from "./pages/CreateStudents";



export const useRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home" component={StudentsList}>
                    <StudentsList/>
                </Route>
                <Route path="/new" exact component={CreateStudents}>
                    <CreateStudents/>
                </Route>
                <Route path="/">
                    <StudentsList/>
                </Route>
            </Switch>
        </Router>
    );
}