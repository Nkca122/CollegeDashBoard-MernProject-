import './public/style.css'
export default function Header() {
    return (
        <>
            <header className="header border">
                <div className="headerDiv">
                    <a href="/" className="headerDivLoginPageLink">
                        <i className="fa-solid fa-house"></i>
                    </a>
                </div>
            </header>
        </>
    )
}