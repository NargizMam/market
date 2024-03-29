import {Container, CssBaseline} from '@mui/material';
import AppToolbar from "./components/AppToolbar/AppToolbar.tsx";
import {Route, Routes } from 'react-router-dom';
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import ProductForm from './features/products/ProductForm.tsx';
import ProductsList from "./features/products/ProductsList.tsx";
import ProductsInfo from "./features/products/ProductsInfo.tsx";

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl" >
          <Routes>
              <Route path="/" element={<ProductsList />}>
                  <Route path=":id"  element={<ProductsList/>}/>
              </Route>
              <Route path="/products/:id"  element={<ProductsInfo/>}/>
              <Route path="/" element={<ProductsList />} />
              <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/new-product" element={<ProductForm/>} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>

    </>
  )
}

export default App
