import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Crown, Users, Mail, Phone, ShoppingCart } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  membershipTier?: string
  points: number
  totalSpent: number
  joinDate: string
  lastPurchaseDate?: string
}

interface MembershipTier {
  id: string
  name: string
  color: string
  discountPercentage: number
}

const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([])
  const [membershipTiers, setMembershipTiers] = useState<MembershipTier[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [, setEditingCustomer] = useState<Customer | null>(null)
  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membershipTier: ''
  })

  useEffect(() => {
    loadCustomers()
    loadMembershipTiers()
  }, [])

  const loadCustomers = async () => {
    try {
      // Load sample customers for demo
      setCustomers([
        {
          id: 'cust_1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          phone: '+1-555-1111',
          membershipTier: 'Silver',
          points: 650,
          totalSpent: 325.50,
          joinDate: '2024-01-15',
          lastPurchaseDate: '2024-01-20'
        },
        {
          id: 'cust_2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@email.com',
          phone: '+1-555-2222',
          membershipTier: 'Gold',
          points: 1200,
          totalSpent: 850.75,
          joinDate: '2024-01-10',
          lastPurchaseDate: '2024-01-21'
        },
        {
          id: 'cust_3',
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.j@email.com',
          phone: '+1-555-3333',
          membershipTier: 'Bronze',
          points: 350,
          totalSpent: 175.25,
          joinDate: '2024-01-18',
          lastPurchaseDate: '2024-01-19'
        }
      ])
    } catch (error) {
      console.error('Error loading customers:', error)
      toast.error('Failed to load customers')
    }
  }

  const loadMembershipTiers = async () => {
    try {
      setMembershipTiers([
        { id: 'tier_bronze', name: 'Bronze', color: '#cd7f32', discountPercentage: 5 },
        { id: 'tier_silver', name: 'Silver', color: '#c0c0c0', discountPercentage: 10 },
        { id: 'tier_gold', name: 'Gold', color: '#ffd700', discountPercentage: 15 }
      ])
    } catch (error) {
      console.error('Error loading membership tiers:', error)
    }
  }

  const handleAddCustomer = async () => {
    try {
      const customer: Customer = {
        id: `cust_${Date.now()}`,
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        email: newCustomer.email,
        phone: newCustomer.phone,
        membershipTier: newCustomer.membershipTier,
        points: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString().split('T')[0],
      }

      setCustomers([...customers, customer])
      setNewCustomer({ firstName: '', lastName: '', email: '', phone: '', membershipTier: '' })
      setIsAddDialogOpen(false)
      toast.success('Customer added successfully!')
    } catch (error) {
      console.error('Error adding customer:', error)
      toast.error('Failed to add customer')
    }
  }

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      setCustomers(customers.filter(c => c.id !== customerId))
      toast.success('Customer deleted successfully!')
    } catch (error) {
      console.error('Error deleting customer:', error)
      toast.error('Failed to delete customer')
    }
  }

  const filteredCustomers = customers.filter(customer =>
    customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTierColor = (tierName?: string) => {
    const tier = membershipTiers.find(t => t.name === tierName)
    return tier?.color || '#gray'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-2">Manage your customers and their memberships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Customer</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newCustomer.firstName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newCustomer.lastName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+1-555-1234"
                />
              </div>
              <div>
                <Label htmlFor="membershipTier">Membership Tier</Label>
                <Select value={newCustomer.membershipTier} onValueChange={(value) => setNewCustomer({ ...newCustomer, membershipTier: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {membershipTiers.map((tier) => (
                      <SelectItem key={tier.id} value={tier.name}>{tier.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddCustomer} className="w-full">
                Add Customer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{customer.email}</span>
                      </div>
                      {customer.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{customer.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4" style={{ color: getTierColor(customer.membershipTier) }} />
                      <span className="text-sm font-medium text-gray-900">{customer.membershipTier}</span>
                    </div>
                    <div className="text-xs text-gray-500">Membership</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{customer.points}</div>
                    <div className="text-xs text-gray-500">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">${customer.totalSpent}</div>
                    <div className="text-xs text-gray-500">Total Spent</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/billing', { state: { customer } })}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      New Bill
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCustomer(customer)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCustomer(customer.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Add your first customer to get started!</p>
        </div>
      )}
    </div>
  )
}

export default CustomerManagement