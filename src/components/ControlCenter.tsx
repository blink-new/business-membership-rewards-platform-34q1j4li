import React, { useState, useEffect } from 'react'
import { Building2, Users, Crown, MapPin, Search, Filter, Eye, MoreHorizontal, TrendingUp, DollarSign, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { blink } from '../blink/client'
import toast from 'react-hot-toast'

interface Business {
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
  createdAt: string
}

interface CustomerMembership {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  businessId: string
  businessName: string
  membershipTier: string
  points: number
  totalSpent: number
  joinDate: string
  lastPurchase: string
  status: 'active' | 'inactive' | 'suspended'
}

interface GlobalStats {
  totalBusinesses: number
  totalCustomers: number
  totalRevenue: number
  totalMemberships: number
  averageSpendPerCustomer: number
  revenueGrowth: number
}

const ControlCenter: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [memberships, setMemberships] = useState<CustomerMembership[]>([])
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    totalBusinesses: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalMemberships: 0,
    averageSpendPerCustomer: 0,
    revenueGrowth: 0
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBusiness, setSelectedBusiness] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    initializeControlCenter()
  }, [])

  const initializeControlCenter = async () => {
    try {
      await createSampleData()
      await loadControlCenterData()
    } catch (error) {
      console.error('Error initializing control center:', error)
      toast.error('Failed to load control center data')
    } finally {
      setLoading(false)
    }
  }

  const createSampleData = async () => {
    try {
      // Create sample businesses
      const sampleBusinesses = [
        {
          id: 'biz_coffee_co',
          name: 'Coffee & Co.',
          description: 'Premium coffee shop with artisan roasts',
          email: 'hello@coffeeandco.com',
          phone: '+1-555-0123',
          address: '123 Main St, Downtown',
          logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center'
        },
        {
          id: 'biz_fitness_plus',
          name: 'Fitness Plus Gym',
          description: 'Modern fitness center with personal training',
          email: 'info@fitnessplus.com',
          phone: '+1-555-0234',
          address: '456 Health Ave, Wellness District',
          logoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center'
        },
        {
          id: 'biz_bella_salon',
          name: 'Bella Beauty Salon',
          description: 'Full-service beauty salon and spa',
          email: 'contact@bellasalon.com',
          phone: '+1-555-0345',
          address: '789 Beauty Blvd, Style Center',
          logoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&crop=center'
        },
        {
          id: 'biz_tech_repair',
          name: 'TechFix Pro',
          description: 'Professional device repair and tech support',
          email: 'support@techfixpro.com',
          phone: '+1-555-0456',
          address: '321 Tech Street, Innovation Hub',
          logoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center'
        },
        {
          id: 'biz_green_eats',
          name: 'Green Eats Restaurant',
          description: 'Organic farm-to-table dining experience',
          email: 'hello@greeneats.com',
          phone: '+1-555-0567',
          address: '654 Organic Way, Eco Village',
          logoUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=100&h=100&fit=crop&crop=center'
        }
      ]

      for (const business of sampleBusinesses) {
        try {
          await blink.db.businesses.create(business)
        } catch {
          // Business might already exist, skip
        }
      }

      // Create sample membership tiers for each business
      const membershipTiers = [
        { name: 'Bronze', discountPercentage: 5, pointsRequired: 0, color: '#cd7f32' },
        { name: 'Silver', discountPercentage: 10, pointsRequired: 500, color: '#c0c0c0' },
        { name: 'Gold', discountPercentage: 15, pointsRequired: 1000, color: '#ffd700' },
        { name: 'Platinum', discountPercentage: 20, pointsRequired: 2000, color: '#e5e4e2' }
      ]

      for (const business of sampleBusinesses) {
        for (const tier of membershipTiers) {
          try {
            await blink.db.membershipTiers.create({
              id: `tier_${business.id}_${tier.name.toLowerCase()}`,
              businessId: business.id,
              name: tier.name,
              description: `${tier.name} tier membership`,
              pointsRequired: tier.pointsRequired,
              discountPercentage: tier.discountPercentage,
              benefits: `${tier.discountPercentage}% discount on all purchases`,
              color: tier.color
            })
          } catch {
            // Tier might already exist, skip
          }
        }
      }

      // Create sample customers for each business
      const customers = [
        { firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', phone: '+1-555-1001' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@email.com', phone: '+1-555-1002' },
        { firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@email.com', phone: '+1-555-1003' },
        { firstName: 'Sarah', lastName: 'Wilson', email: 'sarah.wilson@email.com', phone: '+1-555-1004' },
        { firstName: 'Tom', lastName: 'Brown', email: 'tom.brown@email.com', phone: '+1-555-1005' },
        { firstName: 'Lisa', lastName: 'Davis', email: 'lisa.davis@email.com', phone: '+1-555-1006' },
        { firstName: 'David', lastName: 'Miller', email: 'david.miller@email.com', phone: '+1-555-1007' },
        { firstName: 'Emily', lastName: 'Garcia', email: 'emily.garcia@email.com', phone: '+1-555-1008' }
      ]

      for (const business of sampleBusinesses) {
        const shuffledCustomers = customers.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 3)
        
        for (let i = 0; i < shuffledCustomers.length; i++) {
          const customer = shuffledCustomers[i]
          const tierIndex = Math.floor(Math.random() * membershipTiers.length)
          const tier = membershipTiers[tierIndex]
          const points = Math.floor(Math.random() * 2500) + tier.pointsRequired
          const totalSpent = Math.floor(Math.random() * 2000) + 50
          
          try {
            await blink.db.customers.create({
              id: `cust_${business.id}_${i}`,
              businessId: business.id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              phone: customer.phone,
              membershipTierId: `tier_${business.id}_${tier.name.toLowerCase()}`,
              points: points,
              totalSpent: totalSpent,
              joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
              lastPurchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
            })
          } catch {
            // Customer might already exist, skip
          }
        }
      }

    } catch (error) {
      console.error('Error creating sample data:', error)
    }
  }

  const loadControlCenterData = async () => {
    try {
      // Load all businesses
      const businessesData = await blink.db.businesses.list({ limit: 100 })
      
      // Load all customers with their membership details
      const customersData = await blink.db.customers.list({ limit: 1000 })
      const tiersData = await blink.db.membershipTiers.list({ limit: 1000 })
      
      // Process businesses with stats
      const businessesWithStats = businessesData.map(business => {
        const businessCustomers = customersData.filter(c => c.businessId === business.id)
        const totalRevenue = businessCustomers.reduce((sum, c) => sum + (Number(c.totalSpent) || 0), 0)
        
        return {
          ...business,
          totalCustomers: businessCustomers.length,
          totalRevenue: totalRevenue,
          activeOffers: Math.floor(Math.random() * 5) + 1
        }
      })

      // Process memberships
      const membershipsData = customersData.map(customer => {
        const business = businessesWithStats.find(b => b.id === customer.businessId)
        const tier = tiersData.find(t => t.id === customer.membershipTierId)
        
        return {
          id: customer.id,
          customerId: customer.id,
          customerName: `${customer.firstName} ${customer.lastName}`,
          customerEmail: customer.email || '',
          businessId: customer.businessId || '',
          businessName: business?.name || 'Unknown Business',
          membershipTier: tier?.name || 'Bronze',
          points: Number(customer.points) || 0,
          totalSpent: Number(customer.totalSpent) || 0,
          joinDate: customer.joinDate || new Date().toISOString(),
          lastPurchase: customer.lastPurchaseDate || new Date().toISOString(),
          status: (Math.random() > 0.1 ? 'active' : 'inactive') as 'active' | 'inactive'
        }
      })

      // Calculate global stats
      const stats: GlobalStats = {
        totalBusinesses: businessesWithStats.length,
        totalCustomers: customersData.length,
        totalRevenue: businessesWithStats.reduce((sum, b) => sum + b.totalRevenue, 0),
        totalMemberships: membershipsData.filter(m => m.status === 'active').length,
        averageSpendPerCustomer: customersData.length > 0 
          ? businessesWithStats.reduce((sum, b) => sum + b.totalRevenue, 0) / customersData.length 
          : 0,
        revenueGrowth: 15.3 // Mock growth percentage
      }

      setBusinesses(businessesWithStats)
      setMemberships(membershipsData)
      setGlobalStats(stats)

    } catch (error) {
      console.error('Error loading control center data:', error)
      throw error
    }
  }

  const filteredMemberships = memberships.filter(membership => {
    const matchesSearch = 
      membership.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membership.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesBusiness = selectedBusiness === 'all' || membership.businessId === selectedBusiness
    const matchesStatus = selectedStatus === 'all' || membership.status === selectedStatus

    return matchesSearch && matchesBusiness && matchesStatus
  })

  const getMembershipColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return 'bg-amber-100 text-amber-800'
      case 'silver': return 'bg-gray-100 text-gray-800'
      case 'gold': return 'bg-yellow-100 text-yellow-800'
      case 'platinum': return 'bg-purple-100 text-purple-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Control Center</h1>
              <p className="text-gray-600 mt-1">Manage all businesses and customer memberships from one place</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Export Data</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Add Business</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Businesses</p>
                  <p className="text-2xl font-bold">{globalStats.totalBusinesses}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Customers</p>
                  <p className="text-2xl font-bold">{globalStats.totalCustomers.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold">{globalStats.totalMemberships}</p>
                </div>
                <Crown className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold">${globalStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Avg. Spend</p>
                  <p className="text-2xl font-bold">${globalStats.averageSpendPerCustomer.toFixed(0)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Revenue Growth</p>
                  <p className="text-2xl font-bold">+{globalStats.revenueGrowth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="businesses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="businesses">Business Overview</TabsTrigger>
            <TabsTrigger value="memberships">Customer Memberships</TabsTrigger>
          </TabsList>

          {/* Businesses Tab */}
          <TabsContent value="businesses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <Card key={business.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {business.logoUrl ? (
                          <img src={business.logoUrl} alt={business.name} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">{business.name}</h3>
                          <p className="text-sm text-gray-500">{business.description}</p>
                        </div>
                      </div>
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
                            <Gift className="w-4 h-4 mr-2" />
                            Manage Offers
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{business.address}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{business.totalCustomers}</p>
                          <p className="text-xs text-gray-500">Customers</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-600">${business.totalRevenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Revenue</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-blue-600">{business.activeOffers}</p>
                          <p className="text-xs text-gray-500">Active Offers</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Memberships Tab */}
          <TabsContent value="memberships" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        placeholder="Search customers, emails, or businesses..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by business" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Businesses</SelectItem>
                      {businesses.map(business => (
                        <SelectItem key={business.id} value={business.id}>
                          {business.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Memberships Table */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Memberships ({filteredMemberships.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Business</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Membership</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Points</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Last Purchase</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMemberships.map((membership) => (
                        <tr key={membership.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{membership.customerName}</p>
                              <p className="text-sm text-gray-500">{membership.customerEmail}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">{membership.businessName}</p>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`${getMembershipColor(membership.membershipTier)}`}>
                              {membership.membershipTier}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {membership.points.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            ${membership.totalSpent.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={membership.status === 'active' ? 'default' : 'secondary'}>
                              {membership.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(membership.lastPurchase).toLocaleDateString()}
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
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Gift className="w-4 h-4 mr-2" />
                                  Send Offer
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
        </Tabs>
      </div>
    </div>
  )
}

export default ControlCenter