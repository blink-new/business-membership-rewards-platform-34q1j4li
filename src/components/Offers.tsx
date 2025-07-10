import React, { useState } from 'react'
import { Plus, Gift, Edit2, Trash2, Calendar, Target, Percent } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'

interface Offer {
  id: string
  title: string
  description: string
  discountPercentage: number
  discountAmount: number
  minPurchaseAmount: number
  maxUses: number
  validFrom: string
  validUntil: string
  isActive: boolean
  usedCount: number
}

const Offers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 'offer_1',
      title: 'Happy Hour Special',
      description: 'Buy 2 get 1 free on all beverages',
      discountPercentage: 33,
      discountAmount: 0,
      minPurchaseAmount: 15.00,
      maxUses: 100,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      isActive: true,
      usedCount: 45
    },
    {
      id: 'offer_2',
      title: 'Weekend Warrior',
      description: '25% off all pastries on weekends',
      discountPercentage: 25,
      discountAmount: 0,
      minPurchaseAmount: 5.00,
      maxUses: 200,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      isActive: true,
      usedCount: 89
    },
    {
      id: 'offer_3',
      title: 'First Time Bonus',
      description: '$10 off your first order',
      discountPercentage: 0,
      discountAmount: 10,
      minPurchaseAmount: 25.00,
      maxUses: 50,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      isActive: true,
      usedCount: 23
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discountPercentage: 0,
    discountAmount: 0,
    minPurchaseAmount: 0,
    maxUses: 1,
    validFrom: '',
    validUntil: ''
  })

  const handleAddOffer = () => {
    const offer: Offer = {
      id: `offer_${Date.now()}`,
      ...newOffer,
      isActive: true,
      usedCount: 0
    }
    setOffers([...offers, offer])
    setNewOffer({
      title: '',
      description: '',
      discountPercentage: 0,
      discountAmount: 0,
      minPurchaseAmount: 0,
      maxUses: 1,
      validFrom: '',
      validUntil: ''
    })
    setIsAddDialogOpen(false)
    toast.success('Offer created successfully!')
  }

  const handleDeleteOffer = (offerId: string) => {
    setOffers(offers.filter(o => o.id !== offerId))
    toast.success('Offer deleted successfully!')
  }

  const toggleOfferStatus = (offerId: string) => {
    setOffers(offers.map(o => 
      o.id === offerId ? { ...o, isActive: !o.isActive } : o
    ))
    toast.success('Offer status updated!')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offers & Rewards</h1>
          <p className="text-gray-600 mt-2">Create and manage special offers for your customers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Offer</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  placeholder="Summer Sale"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                  placeholder="Describe your offer..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountPercentage">Discount %</Label>
                  <Input
                    id="discountPercentage"
                    type="number"
                    value={newOffer.discountPercentage}
                    onChange={(e) => setNewOffer({ ...newOffer, discountPercentage: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="discountAmount">Discount Amount ($)</Label>
                  <Input
                    id="discountAmount"
                    type="number"
                    value={newOffer.discountAmount}
                    onChange={(e) => setNewOffer({ ...newOffer, discountAmount: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPurchaseAmount">Min Purchase ($)</Label>
                  <Input
                    id="minPurchaseAmount"
                    type="number"
                    value={newOffer.minPurchaseAmount}
                    onChange={(e) => setNewOffer({ ...newOffer, minPurchaseAmount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxUses">Max Uses</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    value={newOffer.maxUses}
                    onChange={(e) => setNewOffer({ ...newOffer, maxUses: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={newOffer.validFrom}
                    onChange={(e) => setNewOffer({ ...newOffer, validFrom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newOffer.validUntil}
                    onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddOffer} className="w-full">
                Create Offer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-green-600" />
                  <span>{offer.title}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleOfferStatus(offer.id)}
                    className={offer.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {offer.isActive ? 'Active' : 'Inactive'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteOffer(offer.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Percent className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Discount:</span>
                  </div>
                  <span className="font-medium">
                    {offer.discountPercentage > 0 ? `${offer.discountPercentage}%` : `$${offer.discountAmount}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Min Purchase:</span>
                  </div>
                  <span className="font-medium">${offer.minPurchaseAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Valid Until:</span>
                  </div>
                  <span className="font-medium">{offer.validUntil}</span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Usage:</span>
                    <span className="font-medium">{offer.usedCount}/{offer.maxUses}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(offer.usedCount / offer.maxUses) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {offers.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
          <p className="text-gray-600">Create your first offer to get started!</p>
        </div>
      )}
    </div>
  )
}

export default Offers