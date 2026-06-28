import { useNavigate } from 'react-router-dom';
import { Package, PencilLine } from 'lucide-react';
import PageShell from '../components/PageShell';
import { products } from '../data/mockData';

const ManageProductsPage = () => {
  const navigate = useNavigate();

  return (
    <PageShell
      eyebrow="Admin"
      title="Manage products"
      description="Admin-level oversight across the product catalog."
      actions={
        <button
          onClick={() => navigate('/seller/add-product')}
          className="px-5 py-2.5 rounded-full bg-brand-orange text-white font-bold text-sm shadow-md"
        >
          Create Product
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.slice(0, 6).map((product) => (
          <article key={product.slug} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <img src={product.image} alt={product.name} className="w-20 h-20 rounded-2xl object-cover" />
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-brand-brown">{product.name}</h3>
              <p className="text-sm text-brand-muted">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-cream text-brand-brown text-xs font-bold">
                <Package className="w-3.5 h-3.5" />
                Live
              </span>
              <button
                onClick={() => navigate(`/seller/edit-product/${product.slug}`)}
                className="px-4 py-2 rounded-full bg-brand-brown text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <PencilLine className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default ManageProductsPage;