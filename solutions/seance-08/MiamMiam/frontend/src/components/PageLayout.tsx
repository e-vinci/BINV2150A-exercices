import type { ReactNode } from "react";
interface PageLayoutProps {
title: string;
children: ReactNode;
}


export const PageLayout = ({ title, children }: PageLayoutProps) => {
return <div className="page">
            <header><h1>{title}</h1></header>
            <main>{children}</main>
            <footer>&copy; 2026 MiamMiam</footer>
        </div>;
};