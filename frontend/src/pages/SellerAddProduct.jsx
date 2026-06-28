import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

const SellerAddProductPage = () => {
  const navigate = useNavigate();

  return (
    <PageShell
      eyebrow="Seller Tools"
      title="Add new product"
      description="Mock product creation form for the frontend RBAC flow."
      actions={
        <button
          onClick={() => navigate('/seller/dashboard')}
          className="px-5 py-2.5 rounded-full bg-brand-cream border border-brand-brown/15 text-brand-brown font-bold text-sm"
        >
          Back to Dashboard
        </button>
      }
    >
      <div className="bg-white border border-brand-brown/10 rounded-2xl p-6 shadow-sm max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Product name" />
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Price" />
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Craft type" />
          <input className="px-4 py-3 rounded-full border border-brand-brown/15 outline-none" placeholder="Location" />
          <textarea className="md:col-span-2 px-4 py-3 rounded-2xl border border-brand-brown/15 outline-none min-h-32" placeholder="Product description" />
        </div>
        <button className="mt-6 px-5 py-3 rounded-full bg-gradient-to-r from-brand-brown to-brand-orange text-white font-bold shadow-md">
          Save Product
        </button>
      </div>
    </PageShell>
  );
};

export default SellerAddProductPage;