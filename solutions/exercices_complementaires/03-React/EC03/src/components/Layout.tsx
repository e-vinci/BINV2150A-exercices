import { Recipe } from "./Recipe";
import { SideBar } from "./SideBar";

export const Layout = () =>{

    return (
        <div className = "layout">
            <Recipe />
            <SideBar />
        </div>
    );

}