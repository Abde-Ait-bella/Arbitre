import React, { useEffect } from "react";

export function Header() {

    useEffect(() => {
        const handlePrint = () => {
          const header = document.querySelector('.header');
          const headerClone = header.cloneNode(true);
    
          document.body.appendChild(headerClone);
        };
    
        window.addEventListener('beforeprint', handlePrint);
    
        return () => {
          window.removeEventListener('beforeprint', handlePrint);
        };
      }, []);

    return (
        <>
            <div className="images print-header">
                <img className="titleLigue" src="../img/image005.png" alt="ligue souss" />
                <h1 className="text-light text-center mb-0">تقرير الحكم</h1>
                <img className="logoLigue" src="../img/image0004.png" alt="ligue souss" />
            </div>
        </>
    )
}
