import React, {useState} from 'react';
import fetch from 'isomorphic-unfetch';
import Hoc from '../components/HOC';
import Router from 'next/router'


function Index(props) {
    const [errors, setError] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const handleSubmit = async event => {
        event.preventDefault();
        const res = await fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.token}`,
                'Accept': 'application/vnd.api+json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const json = await res.json();

        if (json.errors) {
            setError(json.errors);
        } else {
            Router.push('/account/[user]', `/account/${playerName}`);
        }
    };

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    return <div>
        <p className='lead'>Tìm kiếm người chơi</p>
        {
            errors.length > 0 && <ul>
                {
                    errors.map((error, index) => {
                        return <li key={index}>{error.detail}</li>
                    })
                }
            </ul>
        }
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Tên người chơi" onChange={handleChange}/>
            <button type='submit'>Tìm kiếm</button>
        </form>
    </div>
}

Index = Hoc(Index);

export default Index;