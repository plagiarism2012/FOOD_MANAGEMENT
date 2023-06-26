import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "./Carousel";

function UserPage(props) {
    const nav = useNavigate();

    const [item, setItem] = useState({});
    const location = useLocation();
    const { ID } = location.state;

    async function fetchData() {
        await axios
            .get("http://localhost:5000/getPost/" + ID,
                { headers: { 'x-access-signature': localStorage.getItem('signature'), 'x-access-token': localStorage.getItem('accessToken') } })
            .then(function (response) {
                console.log(response.data);
                setItem(response.data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const data = {
        "accId": localStorage.getItem('id'),
        "postId": ID
    }

    async function handleClick(){
        await axios
        .put("http://localhost:5000/accept", data,
            { headers: { 'x-access-signature': localStorage.getItem('signature'), 'x-access-token': localStorage.getItem('accessToken') } })
        .then(function (response) {
            console.log(response.data);
            if(response.status===200){
                setTimeout(() => {
                    nav('/');
                }, 500);  
            }
            else{
                setTimeout(()=>{
                    alert("Internal server error")
                    setTimeout(() => {
                        nav('/');
                    }, 500);  
                })
            }
        });
    }

    return (
        <div className="master">
            <div className="cparent">
                <Carousel images={item.images} />
            </div>

            {Array.isArray(item.foods) ? item.foods.map(ele => (
                <div class="container text-center">
                    <div class="row txt">
                        <div class="col txt1">
                            {ele.name}
                        </div>
                        <div class="col txt1">
                            {ele.quantity}
                        </div>
                    </div>
                </div>
            )) :[]}

            <div>
                <span className="address">Address : {item.address}</span>
                <span className="phone">Phone No : {item.phoneNo}</span>
            </div>
            
            <div className="btt" onClick={handleClick}>
                <button>
                    Accept
                </button>
            </div>

        </div>
    )

}

export default UserPage;