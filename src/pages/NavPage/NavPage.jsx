import {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'

const NavPage = () => {
    const [page, setPage] = useState(() => {
        return localStorage.getItem('currentPage') || 'home';
    });

    const changePage = (page) => {
        setPage(page);
    }
    useEffect(() => {
        localStorage.setItem('currentPage', page);
    }, [page]);
    return (

        <div>
            <header>
                <h1 className='text-center mt-10 text-2xl font-bold'>Mari Tingkatkan Ibadah!</h1>
            </header>
            <section className='m-5 flex flex-wrap flex-row gap-5 justify-center'>
                <Link to="/sholat" onClick={()=>changePage('pray')}>
                    <div className='bg-green-100 p-5 rounded-lg w-35 h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Sholat</h2>
                    </div>
                </Link>
                <Link to="/quran" onClick={()=>changePage('quran')}>
                    <div className='bg-green-100 p-5 rounded-lg w-35 h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Al-Qur'an</h2>
                    </div>
                </Link>
                <Link to="/tasbih">
                    <div className='bg-green-100 p-5 rounded-lg w-35 h-auto text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Tasbih digital</h2>
                    </div>
                </Link>
                <Link to="/doa">
                    <div className='bg-green-100 p-5 rounded-lg w-35 h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Doa</h2>
                    </div>
                </Link>
                <Link to="/settings">
                    <div className='bg-green-100 p-5 rounded-lg w-35 h-25 text-center flex justify-center items-center shadow-md'>
                        <h2 className='text-xl font-semibold mb-3'>Settings</h2>
                    </div>
                </Link>
            </section>
        </div>
    )
}

export default NavPage
