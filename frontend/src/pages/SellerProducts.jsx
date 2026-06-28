import { useNavigate } from 'react-router-dom';
import { Package, PencilLine, Trash2 } from 'lucide-react';
import PageShell from '../components/PageShell';
import { products } from '../data/mockData';

const SellerProductsPage = () => {
  const navigate = useNavigate();
  const sellerProducts = products.filter((product) => product.artistSlug === 'sunita-devi-madhubani');

  return (
    <PageShell
      eyebrow="Seller Inventory"
      title="My products"
      description="Manage your handmade catalog from this role-protected seller view."
      actions={
        <button
          onClick={() => navigate('/seller/add-product')}
          className="px-5 py-2.5 rounded-full bg-brand-orange text-white font-bold text-sm shadow-md"
        >
          Add Product
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sellerProducts.map((product) => (
          <article key={product.slug} className="bg-white border border-brand-brown/10 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row">
            <img src={product.image} alt={product.name} className="w-full sm:w-40 h-40 object-cover" />
            <div className="p-4 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-brown">{product.name}</h3>
                  <p className="text-sm text-brand-muted mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full">
                  <Package className="w-3.5 h-3.5" />
                  Live
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`/seller/edit-product/${product.slug}`)}
                  className="px-4 py-2 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown text-xs font-bold inline-flex items-center gap-2"
                >
                  <PencilLine className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button className="px-4 py-2 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown text-xs font-bold inline-flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default SellerProductsPage;