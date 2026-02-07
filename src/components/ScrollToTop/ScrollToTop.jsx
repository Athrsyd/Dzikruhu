import { useEffect, useState } from 'react'

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkPosition = () => {
            const scrollY = window.scrollY;
            // console.log(scrollY);
            if (scrollY > 200) {
                setIsVisible(true);
                // console.log(isVisible);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', checkPosition);

        return () => {
            window.removeEventListener('scroll', checkPosition);
        };
    }, []);

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={`scroll-to-top fixed ${isVisible?`bottom-8 right-8`:'-bottom-25 right-8'} transition-all bg-amber-400`}>
            <button onClick={scrollUp}>Naik</button>
        </div> 
    );

}
