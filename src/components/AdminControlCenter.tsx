import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { 
  Users, Building, BarChart2, DollarSign, Crown, Gift, 
  Search, Eye, MoreHorizontal, Plus, Settings,
  Activity, Shield, AlertCircle, CheckCircle, XCircle
} from 'lucide-react'
import { blink } from '../blink/client'
import toast from 'react-hot-toast'

interface PlatformStats {
  totalBusinesses: number
  totalCustomers: number
  totalMemberships: number
  totalRevenue: number
  activeOffers: number
  monthlyGrowth: {
    businesses: number
    customers: number
    revenue: number
  }
}

interface BusinessOverview {
  id: string
  name: string
  description: string
  email: string
  phone: string
  address: string
  logoUrl?: string
  totalCustomers: number
  totalRevenue: number
  activeOffers: number
  membershipTiers: number
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActivity: string
}

interface CustomerInsight {
  id: string
  name: string
  email: string
  businessName: string
  membershipTier: string
  totalSpent: number
  points: number
  joinDate: string
  lastPurchase: string
  status: 'active' | 'inactive' | 'vip'
}

interface SystemAlert {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

const AdminControlCenter: React.FC = () => {
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    totalBusinesses: 0,
    totalCustomers: 0,
    totalMemberships: 0,
    totalRevenue: 0,
    activeOffers: 0,
    monthlyGrowth: { businesses: 0, customers: 0, revenue: 0 }
  })
  const [businesses, setBusinesses] = useState<BusinessOverview[]>([])
  const [customers, setCustomers] = useState<CustomerInsight[]>([])
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    initializeAdminData()
  }, [])

  const initializeAdminData = async () => {
    try {
      await createAdminTables()
      await loadAdminData()
    } catch (error) {
      console.error('Error initializing admin data:', error)
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const createAdminTables = async () => {
    const tables = [
      `CREATE TABLE IF NOT EXISTS admin_businesses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        logo_url TEXT,
        status TEXT DEFAULT 'active',
        join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS admin_platform_stats (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        total_businesses INTEGER DEFAULT 0,
        total_customers INTEGER DEFAULT 0,
        total_revenue REAL DEFAULT 0,
        active_offers INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS admin_alerts (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        resolved INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ]

    for (const table of tables) {
      try {
        await blink.db.sql(table)
      } catch (error) {
        console.error('Error creating admin table:', error)
      }
    }
  }

  const loadAdminData = async () => {
    try {
      // Create sample admin data
      await createSampleAdminData()

      // Load platform statistics
      const stats: PlatformStats = {
        totalBusinesses: 125,
        totalCustomers: 15342,
        totalMemberships: 12890,
        totalRevenue: 1234567,
        activeOffers: 89,
        monthlyGrowth: {
          businesses: 5,
          customers: 1200,
          revenue: 15.3
        }
      }

      const businessOverviews: BusinessOverview[] = [
        {
          id: 'biz_coffee_co',
          name: 'Coffee & Co.',
          description: 'Premium coffee shop with artisan roasts',
          email: 'hello@coffeeandco.com',
          phone: '+1-555-0123',
          address: '123 Main St, Downtown',
          logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center',
          totalCustomers: 234,
          totalRevenue: 45230,
          activeOffers: 3,
          membershipTiers: 4,
          status: 'active',
          joinDate: '2023-08-15',
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'biz_fitness_plus',
          name: 'Fitness Plus Gym',
          description: 'Modern fitness center with personal training',
          email: 'info@fitnessplus.com',
          phone: '+1-555-0234',
          address: '456 Health Ave, Wellness District',
          logoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
          totalCustomers: 189,
          totalRevenue: 38950,
          activeOffers: 2,
          membershipTiers: 3,
          status: 'active',
          joinDate: '2023-09-22',
          lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'biz_bella_salon',
          name: 'Bella Beauty Salon',
          description: 'Full-service beauty salon and spa',
          email: 'contact@bellasalon.com',
          phone: '+1-555-0345',
          address: '789 Beauty Blvd, Style Center',
          logoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&crop=center',
          totalCustomers: 156,
          totalRevenue: 52100,
          activeOffers: 4,
          membershipTiers: 4,
          status: 'active',
          joinDate: '2023-07-10',
          lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'biz_tech_repair',
          name: 'TechFix Pro',
          description: 'Professional device repair and tech support',
          email: 'support@techfixpro.com',
          phone: '+1-555-0456',
          address: '321 Tech Street, Innovation Hub',
          logoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center',
          totalCustomers: 98,
          totalRevenue: 28750,
          activeOffers: 1,
          membershipTiers: 3,
          status: 'inactive',
          joinDate: '2023-10-05',
          lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]

      const customerInsights: CustomerInsight[] = [
        {
          id: 'cust_001',
          name: 'John Doe',
          email: 'john.doe@email.com',
          businessName: 'Coffee & Co.',
          membershipTier: 'Gold',
          totalSpent: 1250.75,
          points: 2150,
          joinDate: '2023-06-15',
          lastPurchase: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'vip'
        },
        {
          id: 'cust_002',
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          businessName: 'Fitness Plus Gym',
          membershipTier: 'Platinum',
          totalSpent: 2850.50,
          points: 3200,
          joinDate: '2023-05-20',
          lastPurchase: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'vip'
        },
        {
          id: 'cust_003',
          name: 'Mike Johnson',
          email: 'mike.johnson@email.com',
          businessName: 'Bella Beauty Salon',
          membershipTier: 'Silver',
          totalSpent: 675.25,
          points: 890,
          joinDate: '2023-08-12',
          lastPurchase: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        }
      ]

      const systemAlerts: SystemAlert[] = [
        {
          id: 'alert_001',
          type: 'warning',
          title: 'High Server Load',
          message: 'Platform experiencing increased traffic. Monitoring performance.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          resolved: false
        },
        {
          id: 'alert_002',
          type: 'success',
          title: 'New Business Onboarded',
          message: 'Green Eats Restaurant successfully completed onboarding.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          resolved: true
        },
        {
          id: 'alert_003',
          type: 'info',
          title: 'Monthly Report Available',
          message: 'December 2024 platform analytics report is ready for review.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          resolved: false
        }
      ]

      setPlatformStats(stats)
      setBusinesses(businessOverviews)
      setCustomers(customerInsights)
      setAlerts(systemAlerts)

    } catch (error) {
      console.error('Error loading admin data:', error)
      throw error
    }
  }

  const createSampleAdminData = async () => {
    try {
      // Insert sample admin businesses
      const sampleBusinesses = [
        {
          id: 'admin_biz_coffee',
          name: 'Coffee & Co.',
          description: 'Premium coffee shop with artisan roasts',
          email: 'hello@coffeeandco.com',
          phone: '+1-555-0123',
          address: '123 Main St, Downtown',
          logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center',
          status: 'active'
        }
      ]

      for (const business of sampleBusinesses) {
        try {
          await blink.db.adminBusinesses.create(business)
        } catch {
          // Business might already exist, skip
        }
      }

      // Insert sample alerts
      const sampleAlerts = [
        {
          id: 'admin_alert_001',
          type: 'warning',
          title: 'High Server Load',
          message: 'Platform experiencing increased traffic. Monitoring performance.',
          resolved: 0
        }
      ]

      for (const alert of sampleAlerts) {
        try {
          await blink.db.adminAlerts.create(alert)
        } catch {
          // Alert might already exist, skip
        }
      }

    } catch (error) {
      console.error('Error creating sample admin data:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'vip': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || business.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Control Center</h1>
              <p className="text-gray-600 mt-1">Oversee platform operations and business management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4" />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Platform Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Businesses</p>
                  <p className="text-2xl font-bold">{platformStats.totalBusinesses}</p>
                  <p className="text-blue-200 text-xs">+{platformStats.monthlyGrowth.businesses} this month</p>
                </div>
                <Building className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Customers</p>
                  <p className="text-2xl font-bold">{platformStats.totalCustomers.toLocaleString()}</p>
                  <p className="text-green-200 text-xs">+{platformStats.monthlyGrowth.customers.toLocaleString()} this month</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Memberships</p>
                  <p className="text-2xl font-bold">{platformStats.totalMemberships.toLocaleString()}</p>
                  <p className="text-purple-200 text-xs">84% of customers</p>
                </div>
                <Crown className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Platform Revenue</p>
                  <p className="text-2xl font-bold">${(platformStats.totalRevenue / 1000000).toFixed(1)}M</p>
                  <p className="text-orange-200 text-xs">+{platformStats.monthlyGrowth.revenue}% growth</p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Active Offers</p>
                  <p className="text-2xl font-bold">{platformStats.activeOffers}</p>
                  <p className="text-teal-200 text-xs">Across all businesses</p>
                </div>
                <Gift className="w-8 h-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  alert.resolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                }`}>
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${alert.resolved ? 'text-gray-600' : 'text-gray-900'}`}>
                        {alert.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                        {alert.resolved && (
                          <Badge variant="secondary" className="text-xs">Resolved</Badge>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${alert.resolved ? 'text-gray-500' : 'text-gray-600'} mt-1`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="businesses">Business Management</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="analytics">Platform Analytics</TabsTrigger>
          </TabsList>

          {/* Business Management Tab */}
          <TabsContent value="businesses" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        placeholder="Search businesses..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Business</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Table */}
            <Card>
              <CardHeader>
                <CardTitle>Business Overview ({filteredBusinesses.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Business</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customers</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Last Activity</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBusinesses.map((business) => (
                        <tr key={business.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              {business.logoUrl ? (
                                <img src={business.logoUrl} alt={business.name} className="w-10 h-10 rounded-lg object-cover" />
                              ) : (
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Building className="w-5 h-5 text-blue-600" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{business.name}</p>
                                <p className="text-sm text-gray-500">{business.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{business.email}</p>
                              <p className="text-xs text-gray-500">{business.phone}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{business.totalCustomers}</td>
                          <td className="py-3 px-4 text-gray-600">${business.totalRevenue.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(business.status)}>
                              {business.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(business.lastActivity).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="w-4 h-4 mr-2" />
                                  Manage
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="w-4 h-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Insights Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Customers Across Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Business</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Membership</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Points</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Last Purchase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{customer.name}</p>
                              <p className="text-sm text-gray-500">{customer.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{customer.businessName}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${customer.membershipTier === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                              customer.membershipTier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                              customer.membershipTier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {customer.membershipTier}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">${customer.totalSpent.toLocaleString()}</td>
                          <td className="py-3 px-4 text-gray-600">{customer.points.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(customer.status)}>
                              {customer.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(customer.lastPurchase).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platform Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Revenue Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Growth Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Acquisition Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">System Uptime</span>
                      <span className="text-green-600 font-semibold">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Connections</span>
                      <span className="text-blue-600 font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-purple-600 font-semibold">45ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="text-orange-600 font-semibold">0.02%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminControlCenter