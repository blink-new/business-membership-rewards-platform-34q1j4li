import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Crown, 
  Gift, 
  TrendingUp, 
  Settings,
  Store,
  LogOut,
  ShoppingCart,
  ShieldCheck
} from 'lucide-react'
import { blink } from '../blink/client'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Billing', href: '/billing', icon: ShoppingCart },
  { name: 'Membership Tiers', href: '/tiers', icon: Crown },
  { name: 'Offers & Rewards', href: '/offers', icon: Gift },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Business Setup', href: '/setup', icon: Settings },
  { name: 'Admin Center', href: '/admin', icon: ShieldCheck },
]

const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">MembershipPro</h2>
            <p className="text-sm text-gray-500">Business Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => blink.auth.logout()}
          className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar