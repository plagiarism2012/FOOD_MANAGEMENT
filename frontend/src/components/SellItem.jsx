import React, { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SellItem() {

    const nav = useNavigate();
    const [flag , setFlag] = useState(0);
    const [tempImage, setTempImage] = useState(null);
    const [item, setItem] = useState({
        SellerID: "",
        Title: "",
        Description: "",
        Price: "",
        Image: ""
    });

    function handleUpload(event) {
        setTempImage(event.target.files[0])
    }

    function handleChange(event) {

        const { name, value } = event.target;
        setItem((prevValuue) => {
            return {
                ...prevValuue, [name]: value
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (tempImage == null) {
            console.log("No image");
        } else {
            const imageRef = ref(storage, `KST/${tempImage.name + v4()}`);
            await uploadBytes(imageRef, tempImage).then(() => {
            })

            await getDownloadURL(imageRef)
                .then((url) => {
                    item.Image = url;
                })
            item.SellerID = localStorage.getItem('userIdKST');

            const data = {
                SellerID: item.SellerID,
                Title: item.Title,
                Description: item.Description,
                Price: item.Price,
                Image: item.Image
            }

            await axios.post('http://localhost:8000/item/addItem', data,
                { headers: { 'authTokenKST': localStorage.getItem('authTokenKST') } })
                .then((response) => {
                    console.log(response);
                    if (response.data.check) {
                        setFlag(2);
                        setTimeout(() => {
                            nav('/');
                        }, 1500);
                    }

                    else {
                        setFlag(1);
                        setTimeout(() => {
                            window.location.reload(false);
                        }, 1500);

                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (

        <div className="container">
            <h1>Sell Item</h1>
            <h3>Enter Item Details</h3>
            <form onSubmit={handleSubmit}>
                <div class="form-group ">
                    <label for="exampleInputEmail1">Title</label>
                    <input name="Title" onChange={handleChange} value={item.Title} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Title" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <input name="Description" onChange={handleChange} value={item.Description} type="text" class="form-control" id="exampleInputPassword1" placeholder="Description" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Price</label>
                    <input name="Price" onChange={handleChange} value={item.Price} type="text" class="form-control" id="exampleInputPassword1" placeholder="Price" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Image</label>
                    <input onChange={handleUpload} name="Image" type="file" class="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-secondary">Submit</button>
            </form>
            {flag === 1 && <div className="container">
                <div class="alert alert-danger container " role="alert">
                    Item Listing failed!!!
                </div>
            </div>}
            {flag === 2 && <div className="container">
                <div class="alert alert-success container " role="alert">
                    Item Listed Successfully!!!
                </div>
            </div>}
        </div>

    );

}

export default SellItem;