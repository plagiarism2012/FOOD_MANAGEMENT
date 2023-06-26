import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Item.css"
function ItemCard(props) {
    const nav = useNavigate();
    // const [flag , setFlag] = useState(0);

    const [seller, setSeller] = useState({});

    // async function fetchData(){
    //     await axios
    //         .get("http://localhost:8000/user/profile/"+props.sellerID)
    //         .then(function (response) {
    //             setSeller(response.data);
    //         });
    // }

    // useEffect(()=>{
    //     fetchData();
    // },[])

    // async function delClick(){

    //     await axios.delete("http://localhost:8000/item/deleteItem/"+props.itemID,
    //     { headers: { 'authTokenKST': localStorage.getItem('authTokenKST') } })
    //     .then((response) => {
    //         // console.log(response);
    //         if (response.data.check)
    //         {
    //             alert("Item Deleted!!");
    //             window.location.reload(false);  
    //         }  
    //         else{
    //             alert("Item Deletion Failed!!");
    //             window.location.reload(false);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       })

    // }
    function truncate(str) {
        return str.length > 14 ? str.substring(0, 11) + "..." : str;
    }
    async function handleClick() {
        if(!localStorage.getItem('id')){
            document.getElementById("loginAlert").style.display = "block";
            setTimeout(() => {
                document.getElementById("loginAlert").style.display = 'none';
                nav('/login')
            }, 1500);
        }
        else{
            nav('/IndividualPost', { state: { ID: props.id } });
        }
    }
    return (
        <Link className="LinkBody" onClick={handleClick}>
            <div className="aos-item card book mx-10" id="card">
                <img className="card-img-top" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60" alt="NA" />
                <div className="card-body">
                    <p className="card-title bookName">{truncate(props.address)}</p>
                    {/* <p className="card-text authorName">{props.author}</p> */}
                </div>
            </div>
            <div id="loginAlert" class="alert alert-danger container " role="alert" style={{ display: 'none' }}>
                    Need to Login First!!!
            </div>
        </Link>
    );
}

export default ItemCard;