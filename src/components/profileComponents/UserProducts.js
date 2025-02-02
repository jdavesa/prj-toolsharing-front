import axios from "axios"
import EditProduct from "./EditProduct"
import{useState} from 'react'
import {Image} from 'cloudinary-react'
import {useHistory} from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;

function UserProduct(props) {
    /* const[showEditor, setShowEditor] = useState(false) */
    let history = useHistory()
    const [showPopup, setShowPopup] = useState(false)
   
    const { products } = props.userInfo.data
    console.log("USERPRODUCT", products)

    const handleSubmit = (id) => {
            axios.delete(`${API_URL}/product/${id}`)
                 .then(response => console.log("PRODUCTO BORRADO", response))
                 .catch(err => console.log(err))

    }

    /* const handleClick = () => {
        setShowEditor(!showEditor)
    } */

    const handleView = (id) => {
        history.push(`/product/${id}`)
    }

    const handleShowPopup = (e) => {
        setShowPopup(true)
    }

    const handleCancelDelete = (e) =>{
        setShowPopup(false)
    }

    return (
        <div>
     
            <h3 className="profile-titles">My products:</h3>
  
        <div className="user-product-cards">
        {products.map(product => (<div>
            
        
                <div className="user-product-card" key={product._id}>
                <div className="user-product-photo">
                
                <Image
                  className="img-product-cloud"
                  cloudName="toolsharing"
                  publicId={product.photo}/>
                </div>
                
               {/*  <div className="user-product-text">
                <p>{product.name}</p>
                </div> */}
                <div className="user-product-button">
                <button className="user-product-button-view" onClick={() => handleView(product._id)}>View</button>
                <button className="user-product-button-delete" onClick={handleShowPopup}>Delete</button>
                </div>
                </div>
                
                
                {/* {showEditor && <EditProduct product={product} />}
                {showEditor? <button onClick={handleClick}>Save</button>:<button onClick={handleClick}>Edit Product</button>} */}
                {showPopup &&
                <div className="popup-delete"> 
                <p>Are you sure you want to delete {product.name}?</p>
                    <button onClick={() => handleSubmit(product._id)}>Yes</button>
                    <button onClick={handleCancelDelete}>No</button>
                </div>
                }

              
            </div>
        ))
        }
        </div>
        </div>
  )}
  
  export default UserProduct;


 