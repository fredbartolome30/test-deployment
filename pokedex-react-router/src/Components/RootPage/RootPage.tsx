import {Link,Outlet} from 'react-router-dom';

const RootPage: React.FC = () =>{
    return(
        <header>
            <h2>
                <Link to="/">Pokedex</Link>
            </h2>
            <div>
                <p>
                    <Link to="/home">Home</Link>
                </p>
                <p>
                    <Link to="/about">About</Link>
                </p>
                <p>
                    <Link to="/profile">Profile</Link>
                </p>
            </div>
            <main>
                <Outlet/>
            </main>
        </header>
    );
};
export default RootPage;