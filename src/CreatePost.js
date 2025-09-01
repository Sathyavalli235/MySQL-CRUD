import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreatePost=()=>{

    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const navigate=useNavigate();
    
    //Data insert code
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/addpost',{title,body})
        .then((response)=>{
            console.log(response.data);
            navigate('/');
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
        <div>
            <h1>CREATE POST</h1>
            <div className="container mt-5">
               <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3>Create a NewPost</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                 <div className="form-group">
                                   <label>Title</label>
                                   <input type="text" className="form-control" placeholder="Enter title"
                                   value={title} onChange={(e)=>setTitle(e.target.value)}/>

                                 </div>
                                 <div className="form-group">
                                  <label>Body</label>
                                  <textarea className="form-control" rows="5" placeholder="Enter body" value={body} onChange={(e)=>setBody(e.target.value)}></textarea>
                                 </div>
                                 <button type="submit" className="btn btn-primary">CreatePost</button>
                            </form>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </div>
    )
}
export default CreatePost;
