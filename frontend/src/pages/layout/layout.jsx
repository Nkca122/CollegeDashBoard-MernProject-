import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function Layout() {
    return (
        <>
            <div id="app">
                <Header />
                    <div id="container">
                        <Outlet/>
                    </div>
                <Footer />
            </div>
        </>
    )
}