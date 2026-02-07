import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { StorageService } from "../services/storage";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/");
    }
    // Load orders
    setOrders(StorageService.getOrders());
  }, [user, loading, navigate]);

  const handleStatusUpdate = (orderId, newStatus) => {
    StorageService.updateOrderStatus(orderId, newStatus);
    setOrders(StorageService.getOrders()); // Refresh
  };

  if (loading || !user) return <p className="text-white text-center mt-20">Loading...</p>;

  // Calculate Stats
  const totalRevenue = orders.reduce((sum, order) => {
      // Assuming order has totalAmount or calculating from items.
      // Let's assume order object has 'total' which we should ensure in Checkout.
      return sum + (order.total || 0);
  }, 0);
  const pendingOrders = orders.filter(o => o.status === "Pending").length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif">Admin Dashboard</h1>
        <Button onClick={() => navigate("/")} variant="outline" size="sm">Back to Store</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-[#c9a36b]/30 p-6 rounded-sm">
          <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Total Revenue</h3>
          <p className="text-3xl font-serif text-[#c9a36b]">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-[#c9a36b]/30 p-6 rounded-sm">
            <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Total Orders</h3>
            <p className="text-3xl font-serif">{orders.length}</p>
        </div>
        <div className="bg-white/5 border border-[#c9a36b]/30 p-6 rounded-sm">
            <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-2">Pending Orders</h3>
            <p className="text-3xl font-serif">{pendingOrders}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto border border-white/10 rounded-sm">
        <table className="w-full text-left">
          <thead className="bg-white/10 text-[#c9a36b] uppercase text-xs tracking-widest">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-white/5">
                <td className="p-4 font-mono text-sm">{order.id.slice(0,8)}...</td>
                <td className="p-4">
                    <div className="font-medium">{order.shipping?.name || "Guest"}</div>
                    <div className="text-xs text-gray-400">{order.shipping?.email}</div>
                </td>
                <td className="p-4 text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                <td className="p-4 font-medium">₹{(order.total || 0).toLocaleString()}</td>
                <td className="p-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                        order.status === 'Completed' ? 'bg-green-900/50 text-green-400' :
                        order.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-red-900/50 text-red-400'
                    }`}>
                        {order.status}
                    </span>
                </td>
                <td className="p-4">
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="bg-black border border-white/20 rounded px-2 py-1 text-xs"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
                <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">No orders found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
