import type { ReactNode } from 'react';

interface PageLayoutProps{
    title: string;
    children: ReactNode;
}


export const PageLayout = ({title, children}: PageLayoutProps) =>{
    return(
        <>
        <header><h1>{title}</h1></header>
        <main className="page-layout">{children}</main>
        <footer></footer>
        </>
    )
}