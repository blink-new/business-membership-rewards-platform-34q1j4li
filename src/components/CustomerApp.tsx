import React, { useState, useEffect } from 'react'
import { Crown, Gift, Star, MapPin, ShoppingBag, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
// import { blink } from '../blink/client'

interface CustomerMembership {
  id: string
  businessName: string
  businessAddress: string
  membershipTier: string
  points: number
  totalSpent: number
  nextTierPoints: number
  discountPercentage: number
  benefits: string[]
  logoUrl?: string
  backgroundColor: string
}

interface Offer {
  id: string
  businessName: string
  title: string
  description: string
  discountPercentage: number
  discountAmount: number
  validUntil: string
  isActive: boolean
  minPurchaseAmount: number
  backgroundColor: string
}

const CustomerApp: React.FC = () => {
  const [memberships, setMemberships] = useState<CustomerMembership[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCustomerData()
  }, [])

  const loadCustomerData = async () => {
    try {
      // For demo purposes, create sample customer data
      const sampleMemberships: CustomerMembership[] = [
        {
          id: 'mem_1',
          businessName: 'Coffee & Co.',
          businessAddress: '123 Main St, Downtown',
          membershipTier: 'Gold',
          points: 1250,
          totalSpent: 850.75,
          nextTierPoints: 750, // Points needed for next tier
          discountPercentage: 15,
          benefits: ['15% discount', 'Free birthday drink', 'Priority queue', 'Free Wi-Fi'],
          logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center',
          backgroundColor: 'from-amber-400 to-yellow-500'
        },
        {
          id: 'mem_2',
          businessName: 'Fitness Plus Gym',
          businessAddress: '456 Health Ave, Wellness District',
          membershipTier: 'Silver',
          points: 650,
          totalSpent: 425.50,
          nextTierPoints: 350,
          discountPercentage: 10,
          benefits: ['10% discount', 'Guest passes', 'Nutrition consultation'],
          logoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
          backgroundColor: 'from-blue-400 to-indigo-500'
        },
        {
          id: 'mem_3',
          businessName: 'Bella Beauty Salon',
          businessAddress: '789 Beauty Blvd, Style Center',
          membershipTier: 'Platinum',
          points: 2150,
          totalSpent: 1200.25,
          nextTierPoints: 0, // Already at highest tier
          discountPercentage: 20,
          benefits: ['20% discount', 'VIP treatment', 'Free styling consultation', 'Priority booking'],
          logoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&crop=center',
          backgroundColor: 'from-purple-400 to-pink-500'
        },
        {
          id: 'mem_4',
          businessName: 'Green Eats Restaurant',
          businessAddress: '654 Organic Way, Eco Village',
          membershipTier: 'Bronze',
          points: 350,
          totalSpent: 175.25,
          nextTierPoints: 150,
          discountPercentage: 5,
          benefits: ['5% discount', 'Free birthday meal', 'Loyalty points'],
          logoUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=100&h=100&fit=crop&crop=center',
          backgroundColor: 'from-green-400 to-emerald-500'
        }
      ]

      const sampleOffers: Offer[] = [
        {
          id: 'offer_1',
          businessName: 'Coffee & Co.',
          title: 'Weekend Warrior Special',
          description: 'Get 25% off all coffee drinks this weekend! Perfect for your morning boost.',
          discountPercentage: 25,
          discountAmount: 0,
          validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          minPurchaseAmount: 10,
          backgroundColor: 'from-amber-400 to-orange-500'
        },
        {
          id: 'offer_2',
          businessName: 'Fitness Plus Gym',
          title: 'New Year Fitness Deal',
          description: 'Start your fitness journey with $50 off your next personal training session!',
          discountPercentage: 0,
          discountAmount: 50,
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          minPurchaseAmount: 100,
          backgroundColor: 'from-blue-400 to-cyan-500'
        },
        {
          id: 'offer_3',
          businessName: 'Bella Beauty Salon',
          title: 'Pamper Yourself Package',
          description: 'Enjoy 30% off all spa treatments and feel refreshed and rejuvenated.',
          discountPercentage: 30,
          discountAmount: 0,
          validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          minPurchaseAmount: 75,
          backgroundColor: 'from-pink-400 to-rose-500'
        },
        {
          id: 'offer_4',
          businessName: 'Green Eats Restaurant',
          title: 'Farm Fresh Friday',
          description: 'Free appetizer with any main course order this Friday. Fresh from our local farms!',
          discountPercentage: 0,
          discountAmount: 15,
          validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          minPurchaseAmount: 25,
          backgroundColor: 'from-green-400 to-teal-500'
        },
        {
          id: 'offer_5',
          businessName: 'TechFix Pro',
          title: 'Device Checkup Special',
          description: 'Complete device diagnostic and cleanup service for just $25. Keep your tech running smooth!',
          discountPercentage: 0,
          discountAmount: 25,
          validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          minPurchaseAmount: 50,
          backgroundColor: 'from-indigo-400 to-purple-500'
        }
      ]

      setMemberships(sampleMemberships)
      setOffers(sampleOffers)
    } catch (error) {
      console.error('Error loading customer data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMembershipColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'bronze': return 'text-amber-700 bg-amber-100 border-amber-200'
      case 'silver': return 'text-gray-700 bg-gray-100 border-gray-200'
      case 'gold': return 'text-yellow-700 bg-yellow-100 border-yellow-200'
      case 'platinum': return 'text-purple-700 bg-purple-100 border-purple-200'
      default: return 'text-blue-700 bg-blue-100 border-blue-200'
    }
  }

  const getProgressPercentage = (current: number, target: number) => {
    if (target === 0) return 100 // Already at highest tier
    return Math.min((current / target) * 100, 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">My Memberships</h1>
            <p className="text-gray-600 mt-2">Track your rewards, points, and exclusive offers</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <Crown className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{memberships.length}</p>
              <p className="text-sm text-gray-600">Active Memberships</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {memberships.reduce((sum, m) => sum + m.points, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Points</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <ShoppingBag className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                ${memberships.reduce((sum, m) => sum + m.totalSpent, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Gift className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{offers.length}</p>
              <p className="text-sm text-gray-600">Available Offers</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Offers Slider */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-red-600" />
              <span>Exclusive Offers for You</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {offers.length > 0 && (
                <div className={`bg-gradient-to-r ${offers[currentOfferIndex]?.backgroundColor} rounded-xl p-6 text-white`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{offers[currentOfferIndex]?.title}</h3>
                      <p className="text-white/90 text-sm">{offers[currentOfferIndex]?.businessName}</p>
                    </div>
                    <div className="text-right">
                      {offers[currentOfferIndex]?.discountPercentage > 0 ? (
                        <div className="bg-white/20 rounded-lg px-3 py-1">
                          <span className="text-2xl font-bold">{offers[currentOfferIndex]?.discountPercentage}%</span>
                          <span className="text-sm"> OFF</span>
                        </div>
                      ) : (
                        <div className="bg-white/20 rounded-lg px-3 py-1">
                          <span className="text-2xl font-bold">${offers[currentOfferIndex]?.discountAmount}</span>
                          <span className="text-sm"> OFF</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">{offers[currentOfferIndex]?.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-white/80">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Valid until {formatDate(offers[currentOfferIndex]?.validUntil || '')}
                    </div>
                    <Button 
                      variant="secondary" 
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Redeem Now
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Offer Slider Dots */}
              <div className="flex justify-center space-x-2 mt-4">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOfferIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentOfferIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Membership Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Memberships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memberships.map((membership) => (
              <Card key={membership.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-r ${membership.backgroundColor} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {membership.logoUrl ? (
                        <img 
                          src={membership.logoUrl} 
                          alt={membership.businessName}
                          className="w-12 h-12 rounded-lg object-cover border-2 border-white/20"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg">{membership.businessName}</h3>
                        <div className="flex items-center space-x-1 text-white/80 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{membership.businessAddress}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getMembershipColor(membership.membershipTier)} font-semibold`}>
                      {membership.membershipTier}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Points and Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Points Progress</span>
                        <span className="text-sm text-gray-600">
                          {membership.points.toLocaleString()} points
                        </span>
                      </div>
                      {membership.nextTierPoints > 0 ? (
                        <>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(membership.points, membership.nextTierPoints)}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {membership.nextTierPoints - membership.points} points to next tier
                          </p>
                        </>
                      ) : (
                        <div className="w-full bg-purple-200 rounded-full h-2 mb-2">
                          <div className="bg-purple-600 h-2 rounded-full w-full" />
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-b">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{membership.discountPercentage}%</p>
                        <p className="text-xs text-gray-500">Discount</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">${membership.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Spent</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Membership Benefits</p>
                      <div className="flex flex-wrap gap-1">
                        {membership.benefits.map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Available Offers */}
        <Card>
          <CardHeader>
            <CardTitle>All Available Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className={`bg-gradient-to-r ${offer.backgroundColor} rounded-lg p-4 text-white`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{offer.title}</h4>
                      <p className="text-white/80 text-sm">{offer.businessName}</p>
                    </div>
                    <div className="bg-white/20 rounded px-2 py-1">
                      {offer.discountPercentage > 0 ? (
                        <span className="text-sm font-bold">{offer.discountPercentage}% OFF</span>
                      ) : (
                        <span className="text-sm font-bold">${offer.discountAmount} OFF</span>
                      )}
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mb-3">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/70">
                      Expires {formatDate(offer.validUntil)}
                    </span>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Use Offer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CustomerApp