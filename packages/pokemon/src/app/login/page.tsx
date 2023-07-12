'use client'
import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import schema from '@/validation/login'
import { myApi } from '@pokemon/service'
import { setCookie } from "cookies-next";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: schema })
  

  const onSubmit = async (data: Parameters<typeof myApi.login>[0]) => {
    const req = await myApi.login(data);
    setCookie('token', req.token);
  }

  return (
    <div
      className="h-screen font-sans bg-cover"
      style={{
        background: "url('http://bit.ly/2gPLxZ4')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form
              className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="text-white font-medium text-center text-lg font-bold">
                LOGIN
              </p>
              <div className="">
                <label className="block text-sm text-white">E-mail</label>
                <input
                  {...register('email')}
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="email"
                  id="email"
                  placeholder="Digite o e-mail"
                  aria-label="email"
                />
                {errors.email?.message && <p>{errors.email?.message}</p>}
              </div>
              <div className="mt-2">
                <label className="block  text-sm text-white">Senha</label>
                <input
                  {...register('password')}
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="password"
                  id="password"
                  placeholder="Digite a sua senha"
                  arial-label="password"
                />
                {errors.password?.message && <p>{errors.password?.message}</p>}
              </div>

              <div className="mt-4 items-center flex justify-between">
                <button
                  className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                  type="submit"
                >
                  Entrar
                </button>
                <a
                  className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
                  href="#"
                >
                  Esqueceu a senha ?
                </a>
              </div>
              <div className="text-center">
                <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                  Criar uma conta
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
