import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Item.css"
function ItemCard(props) {
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
    function handleClick() {
        window.scrollTo(0, 0);
    }
    return (
        <Link className="LinkBody" onClick={handleClick} to="/IndividualPost" state={{ ID: props.id }}>
            <div className="aos-item card book mx-10" id="card">
                <img className="card-img-top" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60" alt="NA" />
                <div className="card-body">
                    <p className="card-title bookName">{truncate(props.address)}</p>
                    {/* <p className="card-text authorName">{props.author}</p> */}
                </div>
            </div>
        </Link>
    );
}

export default ItemCard;