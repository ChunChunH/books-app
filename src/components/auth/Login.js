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

export default function Login() {

    const { handleSubmit, control, reset} = useForm();

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmitForm = async(data) => {
        if(data.email || data.password){

            try {
                let response = await axios.post("/api/auth/", {
                    "password": data.password,
                    "email": data.email
                })
                return (
                    localStorage.setItem('token', JSON.stringify(response.data.user.token)),
                    localStorage.setItem( 'token-init-date', new Date().getTime()),
                    swal("Logged", `The user "${response.data.user.name}" was successfully logged!`, "success"),
                    reset({
                        "email": "",
                        "password": "",
                    })
                )
            } catch (error) {
                return swal("Error", error.response.data.msg, "error")
            }
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Card className="col-lg-5 col-md-9 col-sm-12 p-4 mt-5 d-flex justify-content-center align-items-center">
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <Typography variant="h5" gutterBottom className="d-flex justify-content-center"> 
                                Log In
                            </Typography>

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
                                rules={{ required: 'Password is required' }}
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

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                            >
                                Log In
                            </Button>

                            <Typography color="textSecondary" gutterBottom className="d-flex justify-content-center mt-4"> 
                                You do not have an account? <Link className="ms-1" to={"/register"}>Sing Up</Link>
                            </Typography>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
