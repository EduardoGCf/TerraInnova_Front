// src/components/ProductCard.tsx

import { Link } from 'react-router-dom';
import type { Product } from '../models/Product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) return null;

  return (
    <div className="card h-100">
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        className="card-img-top"
        alt={product.name || 'Producto'}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name || 'Sin nombre'}</h5>
        <p className="card-text">{product.description || 'Sin descripción'}</p>
        <p className="text-success fw-bold">${product.price?.toFixed(2) || '0.00'}</p>
        <Link to={`/producto/${product.id}`} className="btn btn-outline-success w-100">
          Ver producto
        </Link>
      </div>
    </div>
  );
};
