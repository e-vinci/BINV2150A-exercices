import { Recipe } from "./Recipe"
import { Sidebar } from "./Sidebar"

export const Layout =  () => {
    return ( 
    <div className="layout">
        <Recipe/>
        <Sidebar/>
    </div>
    )
}