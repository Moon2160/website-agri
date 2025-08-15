import React, { useState } from 'react';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Sample data
  const stats = [
    { icon: '📦', title: 'Total Orders', value: '24', change: '+12%', color: 'primary' },
    { icon: '🛒', title: 'Cart Items', value: '8', change: '+3', color: 'success' },
    { icon: '❤️', title: 'Wishlist', value: '15', change: '+5', color: 'danger' },
    { icon: '📈', title: 'Total Spent', value: '৳45,600', change: '+8%', color: 'warning' }
  ];

  const recentOrders = [
    { id: '#ORD-001', product: 'Samsung Galaxy S23', date: '2025-01-10', status: 'Delivered', amount: '৳85,000' },
    { id: '#ORD-002', product: 'MacBook Air M2', date: '2025-01-08', status: 'Shipped', amount: '৳1,25,000' },
    { id: '#ORD-003', product: 'AirPods Pro', date: '2025-01-05', status: 'Processing', amount: '৳25,000' },
    { id: '#ORD-004', product: 'iPad Pro 11"', date: '2025-01-03', status: 'Delivered', amount: '৳95,000' }
  ];

  const featuredProducts = [
    { id: 1, name: 'iPhone 15 Pro', price: '৳1,45,000', image: '📱', rating: 4.8, reviews: 124 },
    { id: 2, name: 'Sony WH-1000XM4', price: '৳32,000', image: '🎧', rating: 4.7, reviews: 89 },
    { id: 3, name: 'Dell XPS 13', price: '৳1,15,000', image: '💻', rating: 4.6, reviews: 67 },
    { id: 4, name: 'Apple Watch Series 9', price: '৳45,000', image: '⌚', rating: 4.9, reviews: 156 }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'Delivered': 'success',
      'Shipped': 'info',
      'Processing': 'warning',
      'Cancelled': 'danger'
    };
    return badges[status] || 'secondary';
  };

  const renderDashboard = () => (
    <div className="row">
      {/* Stats Cards */}
      <div className="col-12 mb-4">
        <div className="row g-3">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className={`card border-0 shadow-sm h-100 border-start border-${stat.color} border-4`}>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className={`bg-${stat.color} bg-opacity-10 rounded-3 p-3 me-3`}>
                      <span style={{fontSize: '24px'}}>{stat.icon}</span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="text-muted mb-1 small">{stat.title}</h6>
                      <h4 className="mb-0">{stat.value}</h4>
                      <small className="text-success">{stat.change}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="col-lg-8 mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-bottom-0">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <button className="btn btn-outline-primary btn-sm">View All</button>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="fw-medium">{order.id}</td>
                      <td>{order.product}</td>
                      <td className="text-muted">{order.date}</td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="fw-medium">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="col-lg-4 mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-bottom-0">
            <h5 className="mb-0">Quick Actions</h5>
          </div>
          <div className="card-body">
            <div className="d-grid gap-2">
              <button className="btn btn-primary d-flex align-items-center justify-content-center">
                <span className="me-2">🛒</span>
                View Cart (8)
              </button>
              <button className="btn btn-outline-danger d-flex align-items-center justify-content-center">
                <span className="me-2">❤️</span>
                Wishlist (15)
              </button>
              <button className="btn btn-outline-info d-flex align-items-center justify-content-center">
                <span className="me-2">📦</span>
                Track Orders
              </button>
              <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center">
                <span className="me-2">👤</span>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card border-0 shadow-sm mt-3">
          <div className="card-header bg-white border-bottom-0">
            <h5 className="mb-0">Notifications</h5>
          </div>
          <div className="card-body">
            <div className="list-group list-group-flush">
              <div className="list-group-item border-0 px-0">
                <div className="d-flex align-items-start">
                  <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                    <span>📦</span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 small">Order Delivered</h6>
                    <p className="mb-0 text-muted small">Your iPhone 15 Pro has been delivered</p>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex align-items-start">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                    <span>⭐</span>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 small">New Review</h6>
                    <p className="mb-0 text-muted small">Please rate your recent purchase</p>
                    <small className="text-muted">1 day ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="row">
      {/* Search and Filter Bar */}
      <div className="col-12 mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <div className="position-relative">
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">🔍</span>
                  <input 
                    type="text" 
                    className="form-control ps-5" 
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select className="form-select">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Books</option>
                  <option>Home & Garden</option>
                </select>
              </div>
              <div className="col-md-3">
                <div className="btn-group w-100" role="group">
                  <button 
                    className={`btn btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <span>⊞</span>
                  </button>
                  <button 
                    className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <span>☰</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="col-12">
        <div className="row g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className={viewMode === 'grid' ? 'col-lg-3 col-md-6' : 'col-12'}>
              <div className="card border-0 shadow-sm h-100 product-card">
                <div className="position-relative">
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{height: '200px', fontSize: '4rem'}}>
                    {product.image}
                  </div>
                  <button className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle">
                    <span>❤️</span>
                  </button>
                </div>
                <div className="card-body">
                  <h6 className="card-title mb-2">{product.name}</h6>
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-warning me-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{color: i < Math.floor(product.rating) ? '#ffc107' : '#dee2e6'}}>⭐</span>
                      ))}
                    </div>
                    <small className="text-muted">({product.reviews})</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-primary mb-0">{product.price}</h5>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-secondary">
                        <span>👁️</span>
                      </button>
                      <button className="btn btn-primary">
                        <span>➕</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            <span className="me-2">🛒</span>
            BuyerHub
          </a>
          
          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <span style={{fontSize: '20px', color: 'white'}}>🔔</span>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                3
              </span>
            </div>
            <div className="dropdown">
              <button className="btn btn-dark dropdown-toggle border-0" data-bs-toggle="dropdown">
                <span className="me-2">👤</span>
                John Doe
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><span className="me-2">👤</span>Profile</a></li>
                <li><a className="dropdown-item" href="#"><span className="me-2">⚙️</span>Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#"><span className="me-2">🚪</span>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2 col-md-3 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                <div className="nav nav-pills flex-column">
                  <button 
                    className={`nav-link text-start border-0 rounded-0 ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <span className="me-2">🏠</span>
                    Dashboard
                  </button>
                  <button 
                    className={`nav-link text-start border-0 rounded-0 ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                  >
                    <span className="me-2">📱</span>
                    Products
                  </button>
                  <button 
                    className={`nav-link text-start border-0 rounded-0 ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <span className="me-2">📦</span>
                    My Orders
                  </button>
                  <button 
                    className={`nav-link text-start border-0 rounded-0 ${activeTab === 'wishlist' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <span className="me-2">❤️</span>
                    Wishlist
                  </button>
                  <button 
                    className={`nav-link text-start border-0 rounded-0 ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <span className="me-2">👤</span>
                    Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-10 col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0 text-capitalize">{activeTab === 'dashboard' ? 'Welcome back, John!' : activeTab}</h2>
              <div className="text-muted">
                <span className="me-1">🕐</span>
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && (
              <div className="alert alert-info">
                <span className="me-2">📦</span>
                Orders section content goes here
              </div>
            )}
            {activeTab === 'wishlist' && (
              <div className="alert alert-info">
                <span className="me-2">❤️</span>
                Wishlist section content goes here
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="alert alert-info">
                <span className="me-2">👤</span>
                Profile section content goes here
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }
        .nav-pills .nav-link {
          color: #6c757d;
          transition: all 0.2s;
        }
        .nav-pills .nav-link:hover {
          background-color: #f8f9fa;
          color: #0d6efd;
        }
        .nav-pills .nav-link.active {
          background-color: #0d6efd;
          color: white;
        }
        .card {
          transition: box-shadow 0.2s ease-in-out;
        }
        .table-hover tbody tr:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default BuyerDashboard;