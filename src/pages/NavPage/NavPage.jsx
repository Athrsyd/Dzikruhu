import { Link } from 'react-router-dom'
import { useNavbar } from '../../context/NavbarContext.jsx'

const NavPage = () => {
    const { setPathBefore, setPage } = useNavbar();

    const savePathBefore = () => {
        setPathBefore(window.location.pathname);
    }

    const changePage = (p) => {
        setPage(p);
    }

    return (
        <div>
            <header>
                <h1 className='text-center mt-10 text-2xl font-bold'>Mari Tingkatkan Ibadah!</h1>
            </header>
            <section className='m-5 mb-30 flex flex-col gap-5 '>
                <Link to="/sholat">
                    <div className='bg-green-100  p-5 rounded-lg w-full h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Sholat</h2>
                    </div>
                </Link>
                <Link to="/quran">
                    <div className='bg-green-100  p-5 rounded-lg w-full h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Al-Qur'an</h2>
                    </div>
                </Link>
                <Link to="/tasbih">
                    <div className='bg-green-100  p-5 rounded-lg w-full h-auto text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Tasbih digital</h2>
                    </div>
                </Link>
                <Link to="/doa">
                    <div className='bg-green-100  p-5 rounded-lg w-full h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Doa</h2>
                    </div>
                </Link>
                <Link to="/settings" onClick={savePathBefore}>
                    <div className='bg-green-100 p-5 rounded-lg w-full h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Settings</h2>
                    </div>
                </Link>
            </section>
        </div>
    )
}

export default NavPage
