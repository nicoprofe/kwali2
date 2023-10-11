
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Promos from './pages/Promos'
import Faq from './pages/Faq'
import Conocenos from './pages/Conocenos'
import ComoOrdenar from './pages/ComoOrdenar'
import Productos from './pages/Productos'
import Stickers from './pages/Stickers'
import Etiquetas from './pages/Etiquetas'
import StickersDePiso from './pages/StickersDePiso'
import Imanes from './pages/Imanes'
import WaterActivatedTape from './pages/WaterActivatedTape'
import PlanillasDeStickers from './pages/PlanillasDeStickers'
import Muestras from './pages/Muestras'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Mate from './pages/Mate'
import Brillantes from './pages/Brillantes'
import Holograficos from './pages/Holograficos'
import Transparentes from './pages/Transparentes'
import Espejo from './pages/Espejo'
import MetalSilver from './pages/MetalSilver'
import MetalGold from './pages/MetalGold'
import Circulares from './pages/Circulares'
import Ovaladas from './pages/Ovaladas'
import Cuadradas from './pages/Cuadradas'
import Rectangulares from './pages/Rectangulares'
import Cancel from './pages/Cancel'
import Success from './pages/Success'
import { CartProvider } from './TuPutaHermanContext'
import Admin from './pages/Admin'
import Contacto from './pages/Contacto'
import AddEditUser from './pages/AddEditUser'
import PlantillasEditables from './pages/PlantillasEditables'
import SidePanel from './components/SidePanel'
import ScrollToTop from './components/ScrollToTop'



function App() {
  return(
    <>
   
    <CartProvider>
     <Router>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/success' element={<Success/>} />
        <Route path='/cancel' element={<Cancel/>} />
        <Route path='/profile' element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/add' element={<AddEditUser/>}/>
        <Route path='/update/:id' element={<AddEditUser/>}/>


        <Route path='/admin' element={<PrivateRoute/>}>
          <Route path='/admin' element={<Admin/>}/>
        </Route>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/productos' element={<Productos/>}/>
        <Route path='/como-ordenar' element={<ComoOrdenar/>}/>
        <Route path='/faq' element={<Faq/>}/>
        <Route path='/conocenos' element={<Conocenos/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/promos' element={<Promos/>}/>
        <Route path='/stickers' element={<Stickers/>}/>
        <Route path='/stickers/mate' element={<Mate/>}/>
        <Route path='/stickers/brillantes' element={<Brillantes/>}/>
        <Route path='/stickers/holograficos' element={<Holograficos/>}/>
        <Route path='/stickers/transparentes' element={<Transparentes/>}/>
        <Route path='/stickers/espejo' element={<Espejo/>}/>
        <Route path='/stickers/metal-silver' element={<MetalSilver/>}/>
        <Route path='/stickers/metal-gold' element={<MetalGold/>}/>
        <Route path='/etiquetas' element={<Etiquetas/>}/>
        <Route path='/etiquetas/circulares' element={<Circulares/>}/>
        <Route path='/etiquetas/ovaladas' element={<Ovaladas/>}/>
        <Route path='/etiquetas/cuadradas' element={<Cuadradas/>}/>
        <Route path='/etiquetas/rectangulares' element={<Rectangulares/>}/>
        <Route path='/stickers-de-piso' element={<StickersDePiso/>}/>
        <Route path='/imanes' element={<Imanes/>}/>
        <Route path='/water-activated-tape' element={<WaterActivatedTape/>}/>
        <Route path='planillas-de-stickers' element={<PlanillasDeStickers/>}/>
        <Route path='/muestras' element={<Muestras/>}/>
        <Route path='/plantillas-editables' element={<PlantillasEditables/>}/>
        <Route path='/side-panel' element={<SidePanel/>}/>
        
      </Routes>
    
      <Footer/>
      <ScrollToTop/>
     </Router>
     </CartProvider>
    

     <ToastContainer
     position='bottom-center'
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme='dark'/>
    </>
  )
   
   
}

export default App
