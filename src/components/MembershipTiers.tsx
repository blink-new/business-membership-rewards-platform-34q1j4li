import React, { useState } from 'react'
import { Plus, Crown, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'

interface MembershipTier {
  id: string
  name: string
  description: string
  pointsRequired: number
  discountPercentage: number
  benefits: string
  color: string
}

const MembershipTiers: React.FC = () => {
  const [tiers, setTiers] = useState<MembershipTier[]>([
    {
      id: 'tier_bronze',
      name: 'Bronze',
      description: 'Entry level membership',
      pointsRequired: 0,
      discountPercentage: 5,
      benefits: 'Free birthday drink, 5% discount',
      color: '#cd7f32'
    },
    {
      id: 'tier_silver',
      name: 'Silver',
      description: 'Mid-tier membership',
      pointsRequired: 500,
      discountPercentage: 10,
      benefits: 'Free birthday drink, 10% discount, Priority queue',
      color: '#c0c0c0'
    },
    {
      id: 'tier_gold',
      name: 'Gold',
      description: 'Premium membership',
      pointsRequired: 1000,
      discountPercentage: 15,
      benefits: 'Free birthday drink, 15% discount, Priority queue, Free Wi-Fi',
      color: '#ffd700'
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTier, setNewTier] = useState({
    name: '',
    description: '',
    pointsRequired: 0,
    discountPercentage: 0,
    benefits: '',
    color: '#3b82f6'
  })

  const handleAddTier = () => {
    const tier: MembershipTier = {
      id: `tier_${Date.now()}`,
      ...newTier
    }
    setTiers([...tiers, tier])
    setNewTier({
      name: '',
      description: '',
      pointsRequired: 0,
      discountPercentage: 0,
      benefits: '',
      color: '#3b82f6'
    })
    setIsAddDialogOpen(false)
    toast.success('Membership tier created successfully!')
  }

  const handleDeleteTier = (tierId: string) => {
    setTiers(tiers.filter(t => t.id !== tierId))
    toast.success('Membership tier deleted successfully!')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Membership Tiers</h1>
          <p className="text-gray-600 mt-2">Create and manage membership tiers for your customers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Tier</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Membership Tier</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tier Name</Label>
                <Input
                  id="name"
                  value={newTier.name}
                  onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
                  placeholder="Platinum"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTier.description}
                  onChange={(e) => setNewTier({ ...newTier, description: e.target.value })}
                  placeholder="Ultimate premium membership"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pointsRequired">Points Required</Label>
                  <Input
                    id="pointsRequired"
                    type="number"
                    value={newTier.pointsRequired}
                    onChange={(e) => setNewTier({ ...newTier, pointsRequired: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="discountPercentage">Discount %</Label>
                  <Input
                    id="discountPercentage"
                    type="number"
                    value={newTier.discountPercentage}
                    onChange={(e) => setNewTier({ ...newTier, discountPercentage: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  value={newTier.benefits}
                  onChange={(e) => setNewTier({ ...newTier, benefits: e.target.value })}
                  placeholder="List all benefits..."
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={newTier.color}
                  onChange={(e) => setNewTier({ ...newTier, color: e.target.value })}
                />
              </div>
              <Button onClick={handleAddTier} className="w-full">
                Create Tier
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" style={{ color: tier.color }} />
                  <span>{tier.name}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteTier(tier.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Points Required:</span>
                  <span className="font-medium">{tier.pointsRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Discount:</span>
                  <span className="font-medium">{tier.discountPercentage}%</span>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">Benefits:</span>
                  <p className="text-sm mt-1">{tier.benefits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tiers.length === 0 && (
        <div className="text-center py-12">
          <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No membership tiers found</h3>
          <p className="text-gray-600">Create your first tier to get started!</p>
        </div>
      )}
    </div>
  )
}

export default MembershipTiers