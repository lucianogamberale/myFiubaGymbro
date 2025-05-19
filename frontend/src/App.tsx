import './App.css';
import SideBar from './components/SideBar';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <>
      <div className="flex bg-slate-100 text-slate-900">
        <SideBar />
        <div className='lg:mt-0 mt-14 flex w-full h-full justify-center fade-in'>
          <AppRouter />
        </div>
      </div>
    </>
  );

}

export default App;