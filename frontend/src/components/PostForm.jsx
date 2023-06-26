import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { useNavigate } from "react-router-dom";
const PostForm = () => {
    const nav = useNavigate();

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setaddress] = useState("");
    const [phone, setPhone] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddressChange = (e) => {
        setaddress(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Upload images to Cloudinary and get URLs
        const imageUrls = await Promise.all(
            images.map((image) => uploadImageToCloudinary(image))
        );
        const namesArray = name.split(",");
        const qntityArray = quantity.split(",");

        // Log the retrieved image URLs
        setLoading(false);
        console.log({ imageUrls, namesArray, qntityArray });

        const tempArray = [];

        for (var i = 0; i < namesArray.length; i++) {
            tempArray.push({ name: namesArray[i], quantity: qntityArray[i] });
        }

        const data = {
            "images": imageUrls,
            "foods": tempArray,
            "phoneNo": phone,
            "address": address,
            "createdBy": localStorage.getItem('id')
        }

        console.log(data);
        axios.post("http://localhost:5000/post", data,
            { headers: { 'x-access-signature': localStorage.getItem('signature'), 'x-access-token': localStorage.getItem('accessToken') } })
            .then(function (response) {

                if (response.status === 200) {
                    document.getElementById("countAlert").style.visibility = "visible";
                    setTimeout(function () {
                        nav("/");
                    }, 1000);
                } else {
                    document.getElementById("Alert").style.visibility = "visible";
                    setTimeout(function () {
                        nav("/PostForm");
                    }, 1000);
                }
            });

    };

    const uploadImageToCloudinary = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "vqaylqo9"); // Replace with your upload preset

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dgclar4t2/upload",
                formData
            );

            return response.data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <div className="hero-section">{/* Hero section content */}</div>

            <div className="container postForm">
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <h2>Food Form</h2>

                    <div className="form-group">
                        <label htmlFor="name" className="icon-food">
                            <img
                                src="https://www.svgrepo.com/show/490734/food-dinner.svg"
                                alt="Food Icon"
                                width={20}
                            />
                            Food Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity" className="icon-quantity">
                            <img
                                src="https://www.svgrepo.com/show/374360/product-quantity-rules.svg"
                                width={20}
                                alt="Quantity Icon"
                            />
                            Quantity
                        </label>
                        <input
                            type="text"
                            id="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address" className="icon-quantity">
                            <img
                                src="https://www.svgrepo.com/show/374360/product-quantity-rules.svg"
                                width={20}
                                alt="Quantity Icon"
                            />
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="icon-quantity">
                            <img
                                src="https://www.svgrepo.com/show/374360/product-quantity-rules.svg"
                                width={20}
                                alt="Quantity Icon"
                            />
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="images" className="icon-upload">
                            <img
                                src="https://www.svgrepo.com/show/514275/upload-cloud.svg"
                                width={20}
                                alt="Upload Icon"
                            />
                            Images (Max 5)
                        </label>
                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>

                    <button
                        disabled={loading}
                        style={{ backgroundColor: `${loading ? "grey" : ""}` }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>

                <div className="image-container">
                    <img
                        src="https://www.svgrepo.com/show/502436/food-and-drink.svg"
                        alt="Example Image"
                    />
                </div>
            </div>

            <div id="Alert" class="alert alert-danger" role="alert">
                Submission Unsuccessful.
            </div>
            <div id="countAlert" class="alert alert-success" role="alert">
                Submitted Successfully.
            </div>

            <footer className="footer">{/* Footer content */}</footer>
        </div>
    );
};

export default PostForm;