//Exo4
//Creation d'un composant PageLayout

import type { ReactNode } from "react";

interface PageLayoutProps {
    title: string;
    children: ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
    return (
        <div className="page">
            <header>
                <h1>{title}</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>&copy; 2026 MiamMiam</p>
            </footer>
        </div>
    );
};

export default PageLayout;