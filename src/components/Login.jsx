import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../features/authSlice/authSlice'
import { Button, Logo, Input } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")

        try {
            const session = await authService.login(data)

            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/kravix/')
                }
                navigate('/kravix/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="p-4 flex item-center justify-center w-full mt-8 mb-10">
            <div className={`mx-auto w-full max-w-lg bg-gray-800 text-slate-200 rounded-xl p-10 border`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-slate-200/60">
                    Don&apos;t have account yet?&nbsp;
                    <Link to='/kravix/signup/' className='text-slate-300 font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form className='mt-8' onSubmit={handleSubmit(login)}>
                    <div className="space-y-5">
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
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })} />

                        <Button type="submit" className='w-full'>Sign in</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login