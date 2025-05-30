
import logo from '../assets/image/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import tik from '../assets/image/tik.png';

const Footer2 = () => {
    return (<footer style={{ backgroundColor: '#1B4312', color: 'white' }} className="py-4 mt-5">
  <div className="container">
    <div className="row align-items-center">
      {/* Logo + Nombre */}
      <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
        <img
          src={logo}
          alt="Logo TerraINNOVA"
          style={{ height: '50px', marginRight: '10px', borderRadius: '50%' , backgroundColor: '#fff', padding: '3px' }}
        />
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: '"Playfair Display", serif' }}>
          TerraINNOVA
        </span>
      </div>

      {/* Info o contacto */}
      <div className="col-md-4 text-center mb-3 mb-md-0">
        <p className="mb-0">Santa Cruz, Bolivia</p>
        <p className="mb-0">📧 terrainnova@gmail.com</p>
      </div>

      {/* Redes sociales */}
      <div className="col-md-4 text-center text-md-end">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            width="30"
            height="30"
            className="me-2"
            style={{ borderRadius: '50%' }}
          />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
            width="30"
            height="30"
            className="me-2"
            style={{ borderRadius: '50%' }}
          />
        </a>
        <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
          <img
            src= {tik}
            alt="TikTok"
            width="30"
            height="30"
            style={{ borderRadius: '50%' }}
          />
        </a>
      </div>
    </div>

    {/* Línea inferior */}
    <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
    <p className="text-center mb-0" style={{ fontSize: '0.9rem' }}>
      © {new Date().getFullYear()} TerraINNOVA. Todos los derechos reservados.
    </p>
  </div>
</footer>
    );
};

export default Footer2;
