import React, { useState, useEffect } from 'react'
import { Users, Crown, Gift, TrendingUp, Plus, Star, Calendar, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { blink } from '../blink/client'
import toast from 'react-hot-toast'

interface StatsCard {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  trend: string
  color: string
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsCard[]>([
    { title: 'Total Customers', value: '0', icon: Users, trend: '+0% from last month', color: 'text-blue-600' },
    { title: 'Active Memberships', value: '0', icon: Crown, trend: '+0% from last month', color: 'text-purple-600' },
    { title: 'Offers Redeemed', value: '0', icon: Gift, trend: '+0% from last month', color: 'text-green-600' },
    { title: 'Revenue This Month', value: '$0', icon: DollarSign, trend: '+0% from last month', color: 'text-orange-600' }
  ])

  const [recentActivities, setRecentActivities] = useState<Array<{id: number, type: string, message: string, time: string, icon: React.ComponentType<{className?: string}>}>>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Initialize tables if they don't exist
      await initializeTables()
      
      // Load sample data for demo
      await loadSampleData()
      
      // Update stats
      setStats([
        { title: 'Total Customers', value: '156', icon: Users, trend: '+12% from last month', color: 'text-blue-600' },
        { title: 'Active Memberships', value: '134', icon: Crown, trend: '+8% from last month', color: 'text-purple-600' },
        { title: 'Offers Redeemed', value: '89', icon: Gift, trend: '+15% from last month', color: 'text-green-600' },
        { title: 'Revenue This Month', value: '$12,450', icon: DollarSign, trend: '+23% from last month', color: 'text-orange-600' }
      ])

      setRecentActivities([
        { id: 1, type: 'membership', message: 'John Doe upgraded to Gold membership', time: '2 hours ago', icon: Crown },
        { id: 2, type: 'offer', message: 'Jane Smith redeemed Weekend Warrior offer', time: '4 hours ago', icon: Gift },
        { id: 3, type: 'customer', message: 'New customer Mike Johnson joined', time: '6 hours ago', icon: Users },
        { id: 4, type: 'purchase', message: 'Sarah Wilson made a purchase of $45.99', time: '8 hours ago', icon: DollarSign }
      ])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast.error('Failed to load dashboard data')
    }
  }

  const initializeTables = async () => {
    // Create tables if they don't exist
    const tables = [
      `CREATE TABLE IF NOT EXISTS businesses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        logo_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS membership_tiers (
        id TEXT PRIMARY KEY,
        business_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        points_required INTEGER DEFAULT 0,
        discount_percentage REAL DEFAULT 0,
        benefits TEXT,
        color TEXT DEFAULT '#3b82f6',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        business_id TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        membership_tier_id TEXT,
        points INTEGER DEFAULT 0,
        total_spent REAL DEFAULT 0,
        join_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_purchase_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS offers (
        id TEXT PRIMARY KEY,
        business_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        discount_percentage REAL DEFAULT 0,
        discount_amount REAL DEFAULT 0,
        min_purchase_amount REAL DEFAULT 0,
        max_uses INTEGER DEFAULT 1,
        valid_from DATETIME DEFAULT CURRENT_TIMESTAMP,
        valid_until DATETIME,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ]

    for (const table of tables) {
      try {
        await blink.db.sql(table)
      } catch (error) {
        console.error('Error creating table:', error)
      }
    }
  }

  const loadSampleData = async () => {
    try {
      // Insert sample business
      await blink.db.businesses.create({
        id: 'biz_demo',
        name: 'Coffee & Co.',
        description: 'Premium coffee shop with artisan roasts',
        email: 'hello@coffeeandco.com',
        phone: '+1-555-0123',
        address: '123 Main St, Downtown'
      })

      // Insert sample membership tiers
      await blink.db.membershipTiers.create({
        id: 'tier_bronze',
        businessId: 'biz_demo',
        name: 'Bronze',
        description: 'Entry level membership',
        pointsRequired: 0,
        discountPercentage: 5,
        benefits: 'Free birthday drink, 5% discount',
        color: '#cd7f32'
      })

      await blink.db.membershipTiers.create({
        id: 'tier_silver',
        businessId: 'biz_demo',
        name: 'Silver',
        description: 'Mid-tier membership',
        pointsRequired: 500,
        discountPercentage: 10,
        benefits: 'Free birthday drink, 10% discount, Priority queue',
        color: '#c0c0c0'
      })

      await blink.db.membershipTiers.create({
        id: 'tier_gold',
        businessId: 'biz_demo',
        name: 'Gold',
        description: 'Premium membership',
        pointsRequired: 1000,
        discountPercentage: 15,
        benefits: 'Free birthday drink, 15% discount, Priority queue, Free Wi-Fi',
        color: '#ffd700'
      })

    } catch (error) {
      console.error('Error loading sample data:', error)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-green-600" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add New Customer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Crown className="w-4 h-4 mr-2" />
                Create Membership Tier
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Gift className="w-4 h-4 mr-2" />
                Launch New Offer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <span>Top Customers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Membership</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Points</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', membership: 'Gold', points: 1250, spent: '$850.75', lastPurchase: '2 days ago' },
                  { name: 'Jane Smith', membership: 'Silver', points: 650, spent: '$425.50', lastPurchase: '1 week ago' },
                  { name: 'Mike Johnson', membership: 'Bronze', points: 350, spent: '$175.25', lastPurchase: '3 days ago' },
                ].map((customer, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{customer.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.membership === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                        customer.membership === 'Silver' ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {customer.membership}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{customer.points}</td>
                    <td className="py-3 px-4 text-gray-600">{customer.spent}</td>
                    <td className="py-3 px-4 text-gray-600">{customer.lastPurchase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard