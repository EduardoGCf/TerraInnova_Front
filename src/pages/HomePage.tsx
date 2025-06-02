import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/image/logo.png'; // Asegúrate de tener una imagen en esta ruta
import { FaEye,FaTruck, FaShieldAlt, FaExchangeAlt, FaPhoneAlt, FaBullseye } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { getProductos } from '../services/product.service';
import type { Producto } from '../models/Product';
import  tik  from '../assets/image/tik.png';
import foto1 from '../assets/image/1.jpg';
import foto2 from '../assets/image/2.jpg';
import foto3 from '../assets/image/3.jpg';
import foto4 from '../assets/image/4.jpg';

export default function HomePage() {
const [productos, setProductos] = useState<Producto[]>([]);

useEffect(() => {
  const cargar = async () => {
    const data = await getProductos();
    setProductos(data);
  };
  cargar();
}, []);

const agregarAlCarrito = (producto: Producto) => {
  const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');

  const existente = carritoActual.find((item: any) => item.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carritoActual.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carritoActual));
};

const beneficios = [
  {
    icon: <FaTruck size={30} color="white" />,
    title: "Envío Gratis",
    subtitle: "Gratis en pedidos superiores a $300",
  },
  {
    icon: <FaShieldAlt size={30} color="white" />,
    title: "Pago Seguro",
    subtitle: "Pago 100% seguro",
  },
  {
    icon: <FaExchangeAlt size={30} color="white" />,
    title: "Devolución en 30 Días",
    subtitle: "Garantía de devolución por 30 días",
  },
  {
    icon: <FaPhoneAlt size={30} color="white" />,
    title: "Soporte 24/7",
    subtitle: "Atención rápida en todo momento",
  },
];



  return (
<div>

  {/* Banner horizontal con eslogan a la izquierda y logo a la derecha */}
  <section
    style={{
      background: 'linear-gradient(to right, #658239 , #1B4312)',
      color: '#ffffff',
      padding: '80px 20%',
    }}
  >
    <div className="container">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        {/* Eslogan */}
        <h1
          className="fw-bold m-0"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '2rem',
            lineHeight: '1.3',
            color: '#fff',
            textShadow: '3px 4px 10px rgb(0, 0, 0)',
            maxWidth: '60%',
          }}
        >
          TERRAINNOVA: Nutriendo la tierra, cosechando futuro
        </h1>

        {/* Logo */}
        <img
          src={logo}
          alt="Logo TerraINNOVA"
          className="img-fluid rounded-circle shadow"
          style={{
            maxWidth: '200px',
            backgroundColor: '#fff',
            padding: '8px',
          }}
        />
      </div>
    </div>
  </section>


      {/* Beneficios */}

  <section className="container py-5">
  <div className="row text-center">
    {beneficios.map((item, index) => (
      <div className="col-12 col-sm-6 col-md-3 mb-4" key={index}>
        <div className="d-flex flex-column align-items-center p-3 bg-light rounded shadow-sm h-100">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center mb-3"
            style={{ width: "60px", height: "60px", backgroundColor: "#1B4312" }}
          >
            {item.icon}
          </div>
          <h6 className="fw-bold mb-1">{item.title}</h6>
          <small>{item.subtitle}</small>
        </div>
      </div>
    ))}
  </div>
</section>


{/* SOBRE NOSOTROS */}
<section className="container text-center py-5">
  <h2
    className="fw-bold mb-4"
    style={{
      fontFamily: "'Open Sans', sans-serif",
      color: "#2d572c",
    }}
  >
    ¿Qué somos?
  </h2>
  <p className="mx-auto" style={{ maxWidth: "800px", fontSize: "1.1rem", lineHeight: "1.7" }}>
    TerraINNOVA es un emprendimiento ecológico boliviano que promueve la economía circular a través de la recolección, transformación y comercialización de residuos orgánicos en forma de compost 100% natural. <br /><br />
    Somos una plataforma digital que conecta a hogares, viveros, agricultores e instituciones con soluciones sostenibles para el cuidado del suelo y del medio ambiente. <br /><br />
    Nuestra misión es regenerar la tierra, reducir los desechos y fomentar una cultura de conciencia ecológica mediante productos accesibles, educación ambiental y tecnología aplicada.
  </p>
</section>

{/* MISIÓN Y VISIÓN */}
<section className="container py-5">
  <div className="row g-4">
    <div className="col-md-6">
      <div className="bg-light rounded shadow-sm p-4 h-100 text-center">
        <div className="mb-3">
          <FaBullseye size={40} color="#28a745" />
        </div>
        <h3 className="fw-bold" style={{ color: "#2d572c" }}>Misión</h3>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
          Ofrecer soluciones sostenibles para el manejo de residuos orgánicos mediante la producción y comercialización de compost 100% natural, a través de una plataforma digital que promueve la economía circular, fomenta la educación ambiental y facilita el acceso a productos ecológicos en Santa Cruz de la Sierra.
        </p>
      </div>
    </div>
    <div className="col-md-6">
      <div className="bg-light rounded shadow-sm p-4 h-100 text-center">
        <div className="mb-3">
          <FaEye size={40} color="#28a745" />
        </div>
        <h3 className="fw-bold" style={{ color: "#2d572c" }}>Visión</h3>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
          Ser una empresa reconocida como la entidad municipal líder en gestión integral de residuos sólidos de Bolivia, brindando servicios de calidad, con innovación tecnológica, sostenibilidad financiera, responsabilidad social y compromiso con las generaciones futuras.
        </p>
      </div>
    </div>
  </div>
</section>


<section id="productos" style={{ backgroundColor: '#658239' }} className="py-5">
  <div className="container">
    <h2 className="text-white text-center mb-4">Nuestros Productos</h2>
    <div className="row justify-content-center">
      {productos.slice(0, 3).map((producto) => (
        <div key={producto.id} className="col-md-3">
          <div className="card mb-4 h-100 shadow-sm">
            <img
              src={`http://localhost:3000/uploads/productos/${producto.id}.jpg`}
              alt={producto.nombre}
              className="card-img-top"
              style={{ height: '230px', objectFit: 'cover' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = logo;
              }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{producto.nombre}</h5>
              <p className="card-text">{producto.descripcion}</p>
              <button
                className="btn"
                style={{
                  backgroundColor: '#1B4312',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      ))}

      {productos.length === 0 && (
        <p className="text-white text-center">No hay productos disponibles.</p>
      )}
    </div>
  </div>
</section>



      
{/* Carrusel de fotos */}
<section className="container text-center py-5">
  <div
    className="d-flex align-items-center justify-content-between p-3 rounded"
    style={{ backgroundColor: '#658239' }}
  >
    <button
      className="btn"
      style={{ backgroundColor: '#1B4312', color: 'white', fontSize: '1.2rem' }}
    >
      ⬅
    </button>

    <div
  className="d-flex gap-3 overflow-auto justify-content-center flex-nowrap"
  style={{ maxWidth: '80%' }}
>
  {[foto1, foto2, foto3, foto4].map((imagen, index) => (
    <img
      key={index}
      src={imagen}
      alt={`Foto ${index + 1}`}
      style={{
        height: '160px',
        width: 'auto',
        borderRadius: '8px',
        objectFit: 'cover',
      }}
    />
  ))}
</div>


    <button
      className="btn"
      style={{ backgroundColor: '#1B4312', color: 'white', fontSize: '1.2rem' }}
    >
      ➡
    </button>
  </div>
</section>

      <section className="container text-center py-5">
  <h2 className="fw-bold">REDES SOCIALES</h2>
  <div className="d-flex justify-content-center gap-4">
    {/* Instagram */}
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        width="50"
        height="50"
        alt="Instagram"
        style={{ borderRadius: '50%', objectFit: 'cover' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = logo;
        }}
      />
    </a>

    {/* Facebook */}
    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
        width="50"
        height="50"
        alt="Facebook"
        style={{ borderRadius: '50%', objectFit: 'cover' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = logo;
        }}
      />
    </a>

    {/* TikTok */}
<a
  href="https://www.tiktok.com/"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src= {tik}
    width="50"
    height="50"
    alt="TikTok"
    style={{ borderRadius: '50%', objectFit: 'cover' }}
    
  />
</a>

  </div>
</section>


      
    </div>
  );
}
