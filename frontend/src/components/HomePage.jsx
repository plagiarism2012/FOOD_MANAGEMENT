import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";

function HomePage() {

    const [itemList, setItemList] = useState([]);

    async function fetchData() {
        await axios
            .get("http://localhost:5000/allpost")
            .then(function (response) {
                setItemList(response.data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
        {/* <h1>Catalogue</h1> */}
            <div class="row row-cols-1 row-cols-md-3 g-4 pb-5 pl-4 pr-4 pt-4">
                {Array.isArray(itemList) ? itemList.map(ele => (
                    <ItemCard address={ele.address} id={ele._id}/>
                )) : []}
            </div>
        </div>

    );

}

export default HomePage;
// {Array.isArray(itemList) ? itemList.map(ele => (
//     <ItemCard title={ele.Title} description={ele.Description} price={ele.Price} sellerID={ele.SellerID} image={ele.Image} />
// )) : []}