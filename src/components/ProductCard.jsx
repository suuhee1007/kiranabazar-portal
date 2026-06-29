export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl || 'https://via.placeholder.com/240'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="badge">${product.price.toFixed(2)}</p>
      <button className="button" onClick={() => onAdd(product)} style={{ marginTop: 12 }}>
        Add to cart
      </button>
    </div>
  );
}
