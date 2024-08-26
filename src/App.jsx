import { Outlet } from 'react-router-dom';
import Silebar from './components/Silebar';
import { useEffect } from 'react';
import Gemini from './gemini';
function App() {
    useEffect(() => {
        Gemini('js là gì');
    }, []);
    return (
        <>
            <div className="flex w-full h-screen bg-default">
                <div className="hidden xl:block">
                    <Silebar />
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default App;
