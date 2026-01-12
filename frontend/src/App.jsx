import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading products...</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Products</h1>

      {products.length === 0 && <p>No products found</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              padding: 12,
              borderRadius: 8,
            }}
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{ width: '100%', height: 250, objectFit: 'cover' }}
              />
            )}

            <h3>{product.title}</h3>
            <p>
              <strong>Price:</strong> £{product.price}
            </p>

            <a href={product.sourceUrl} target="_blank">
              View on World of Books
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
