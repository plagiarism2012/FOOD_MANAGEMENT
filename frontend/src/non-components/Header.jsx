import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {

    const nav = useNavigate();

    function handleLogin() {
        nav("/login");
    }

    function handleLogout() {
        localStorage.setItem('id', "");
        localStorage.setItem('accessToken', "");
        localStorage.setItem('signature', "");
        document.getElementById("logoutAlert").style.display = 'block';

        setTimeout(() => {
            document.getElementById("logoutAlert").style.display = 'none';
            nav('/');
        }, 1500);
    }

    function handleSell() {
        if (!localStorage.getItem('signature')) {
            document.getElementById("loginAlert").style.display = 'block';
            setTimeout(() => {
                document.getElementById("loginAlert").style.display = 'none';
                nav('/login');
            }, 1500);
        } else {
            nav('/postForm');
        }
    }

    return (
        <div>
            <header className="header">
                <nav class="navbar bg-body-tertiary bg-secondary">
                    <div class="container-fluid">
                        <a class="navbar-brand text-reset" href="/">
                            <p class="text-light">Food</p>
                        </a>

                        <div>
                            {localStorage.getItem('signature') && <button onClick={handleSell} type="button" class="btn btn-secondary">Post Form</button>}
                            {!localStorage.getItem('signature') && <button onClick={handleLogin} type="button" class="btn btn-secondary">Login</button>}
                            {localStorage.getItem('signature') && <button onClick={handleLogout} type="button" class="btn btn-secondary">Logout</button>}
                            {localStorage.getItem('signature') && <button type="button" class="btn btn-secondary"><i class="fa-solid fa-user"></i></button>}
                        </div>
                    </div>
                </nav>
                <div id="logoutAlert" class="alert alert-danger container " role="alert" style={{ display: 'none' }}>
                    Logged Out!!!
                </div>
                <div id="loginAlert" class="alert alert-danger container " role="alert" style={{ display: 'none' }}>
                    Need to Login First!!!
                </div>
            </header>
        </div>
    );

}

export default Header;



