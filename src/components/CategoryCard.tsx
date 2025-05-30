// src/components/CategoryCard.tsx

import type { Category } from "../models/Category";


export interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <div className="card h-100 text-center">
    <div className="card-body">
      <h5 className="card-title">{category.name}</h5>
      <button className="btn btn-outline-primary w-100">Ver productos</button>
    </div>
  </div>
);
