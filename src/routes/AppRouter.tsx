import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import WikiPage from '../pages/WikiPage';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wiki/:Nombre" element={<WikiPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;



