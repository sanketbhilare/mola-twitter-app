import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Button} from 'react-bootstrap';

const Twitter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log("Message submited: " + JSON.stringify(data));
        findUser(data.Username);
      };

      const findUser = (userName) => {
          axios.post(`http://localhost:6161/findUser?username=${userName}`).then(res => {
              if(res.data.status!== 404) {
                var text = "No Tweets by this user !!!!";
                if(res.data.data) {
                    text = JSON.stringify(res.data.data);
                }
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', userName+'.json');
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              } else {
                  window.alert("User not found");
              }
          });
      }

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            {errors.Username && errors.Username.type === "required" && (
                                <span className="invalid-feedback">Username is required</span>
                            )}
                            <input
                                style={{ width:'50%',display:'block', margin:'0 auto'}}
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                {...register("Username", { required: true })}
                            />
                        </div>
                    </div>
                    
                </div>
                <br/>
                <div className="row" >

                <div className="col-md-12">
                        <Button variant='primary' type='submit'>Find and Download</Button>
                    </div>
                </div>
            </form>
        </div>
    );
    
};

export default Twitter;