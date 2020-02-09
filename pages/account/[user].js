import React, {useState} from 'react';
import {useRouter} from 'next/router'
import Hoc from '../../components/HOC';
import fetch from "isomorphic-unfetch";
import Link from 'next/link';
import ItemInfo from "../../components/itemInfo";

function User({seasonJson}) {
    console.log(seasonJson);
    const router = useRouter();
    const {user} = router.query;
    const [tab, setTab] = useState('squad-fpp');
    const handleTab = (tab) => {
        setTab(tab);
    };

    const info = seasonJson.data.attributes.gameModeStats[tab];
    console.log(info.assists);

    return <div>
        <Link href="/">
            <a>Quay lại</a>
        </Link>
        <p style={{marginTop: '10px'}}>Thông tin mùa này của : <b style={{color: 'orange'}}>{user}</b></p>
        <div className='select'>
            <button onClick={() => handleTab('duo')} className={tab === 'duo' ? 'active' : ''}>DOU</button>
            <button onClick={() => handleTab('duo-fpp')} className={tab === 'duo-fpp' ? 'active' : ''}>DOU-FPP</button>
            <button onClick={() => handleTab('solo')} className={tab === 'solo' ? 'active' : ''}>SOLO</button>
            <button onClick={() => handleTab('solo-fpp')} className={tab === 'solo-fpp' ? 'active' : ''}>SOLO-FPP
            </button>
            <button onClick={() => handleTab('squad')} className={tab === 'squad' ? 'active' : ''}>SQUAD</button>
            <button onClick={() => handleTab('squad-fpp')} className={tab === 'squad-fpp' ? 'active' : ''}>SQUAD-FPP
            </button>
        </div>

        <ul className="list_info">
            <ItemInfo>Chiến thắng : {info.wins}</ItemInfo>
            <ItemInfo>Hỗ trợ : {info.assists}</ItemInfo>
            <ItemInfo>Tiêu diệt : {info.kills}</ItemInfo>
            <ItemInfo>Hồi máu : {info.heals}</ItemInfo>
            <ItemInfo>Thua : {info.losses}</ItemInfo>
            <ItemInfo>Chuỗi tiêu diệt cao nhất : {info.maxKillStreaks}</ItemInfo>
            <ItemInfo>Hồi sinh : {info.revives}</ItemInfo>
            <ItemInfo>Trong top 10 : {info.top10s}</ItemInfo>
            <ItemInfo>Giết đồng đội : {info.teamKills}</ItemInfo>
            <ItemInfo>Khoảng cách xa nhất : {~~info.longestKill} mét</ItemInfo>
        </ul>

    </div>
}

User = Hoc(User);

User.getInitialProps = async ctx => {
    const res = await fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${ctx.query.user}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.token}`,
            'Accept': 'application/vnd.api+json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    const json = await res.json();
    const playerId = json.data[0].id;
    const seasonId = 'division.bro.official.pc-2018-06';

    const season = await fetch(`https://api.pubg.com/shards/steam/players/${playerId}/seasons/${seasonId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.token}`,
            'Accept': 'application/vnd.api+json'
        }
    });
    const seasonJson = await season.json();
    // console.log();
    return {seasonJson};
}

export default User