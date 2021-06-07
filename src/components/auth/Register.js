import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import swal from 'sweetalert'

axios.defaults.baseURL = "https://mern-books-server.herokuapp.com"

export default function Register() {

    const { handleSubmit, control, reset} = useForm();

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmitForm = async (data) => {
        if(data.name || data.password || data.email || data.password2){

            try {
                if(data.password !== data.password2){
                    return swal("Error", `Passwords do not match`, "error")
                }else{
                    let response = await axios.post("/api/auth/new", {
                        "name": data.name,
                        "password": data.password,
                        "email": data.email
                    })
                    return (
                        swal("Registered", `The user "${data.name}" was successfully registered!`, "success"),
                        reset({
                            "name": "",
                            "password": "",
                            "email": "",
                            "password2": ""
                        })
                    )
                }
 
            } catch (error) {
                return swal("Error", error.response.data.msg, "error")
            }
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Card className="col-lg-5 col-md-9 col-sm-12 mt-5 p-4 d-flex justify-content-center align-items-center">
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <Typography variant="h5" gutterBottom className="d-flex justify-content-center"> 
                                Register
                            </Typography>

                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Name is required'}}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        autoComplete= "off"
                                        helperText={error ? error.message : null}
                                        className="mb-4"
                                    />
                                )}
                            />

                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Email is required' }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Email"
                                        type="text"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        autoComplete= "off"
                                        helperText={error ? error.message : null}
                                        className="mb-4"
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: {value: true, message: 'Password is required'}, minLength: { value: 6, message: 'Password must be 6 characters'} }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        autoComplete= "off"
                                        helperText={error ? error.message : null}
                                        className="mb-4"
                                        InputProps = {{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="password2"
                                control={control}
                                defaultValue=""
                                rules={{ required: {value: true, message: 'Password is required'}, minLength: { value: 6, message: 'Password must be 6 characters'} }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Confirm password"
                                        type={showPassword ? "text" : "password"}
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        autoComplete= "off"
                                        helperText={error ? error.message : null}
                                        className="mb-4"
                                        InputProps = {{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                            >
                                Sign Up
                            </Button>

                            <Typography color="textSecondary" gutterBottom className="d-flex justify-content-center mt-4"> 
                                Already have an account? <Link className="ms-1" to={"/login"}>Log In</Link>
                            </Typography>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
