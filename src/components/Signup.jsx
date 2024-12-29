import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../features/authSlice/authSlice'
import { Input, Logo, Button } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const Signup = () => {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const user_Data = await authService.createAccount(data)
            if (user_Data) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            console.error('Error:', error)
            setError(error.message)
        }
    };

    return (
        <div className="p-4 flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-800 text-slate-200 rounded-xl p-10 border`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-slate-200/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="text-slate-200 font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form className='mt-8' onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />

                        <Input
                            label="Email: "
                            placeholder="Enter your email: "
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w._-]+)?\w+@[\w-]+(\.\w+){1,}$/igm.test(value) || "Invalid Email"
                                }
                            })}
                        />

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup