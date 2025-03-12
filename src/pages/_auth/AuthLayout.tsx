import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
            <section className='flex flex-1 justify-center items-center py-10'>
              <Outlet />
            </section>
            <img
              src='https://cdn.pixabay.com/photo/2015/12/09/01/02/mandalas-1084082_1280.jpg'
              alt='Auth Image'
              className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            />
        </>
      )}
    </>
  )
}

export default AuthLayout