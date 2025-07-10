import React, { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Home, User, Gift, Settings, QrCode, Star, MapPin, 
  ShoppingBag, Crown, Calendar, ChevronLeft, ChevronRight,
  Zap, Bell, CreditCard, Navigation, Store, Phone, Mail
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MobileMembership {
  id: string
  businessName: string
  businessLogo: string
  businessAddress: string
  businessPhone: string
  membershipTier: string
  tierColor: string
  points: number
  totalSpent: number
  discountPercentage: number
  nextTierPoints: number
  backgroundColor: string
  benefits: string[]
  qrCode: string
}

interface MobileOffer {
  id: string
  businessName: string
  businessLogo: string
  title: string
  description: string
  discountPercentage: number
  discountAmount: number
  validUntil: string
  backgroundColor: string
  isActive: boolean
  category: string
}

interface NearbyStore {
  id: string
  name: string
  address: string
  distance: string
  isOpen: boolean
  rating: number
  category: string
  logoUrl: string
}

const MobileCustomerApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [memberships, setMemberships] = useState<MobileMembership[]>([])
  const [offers, setOffers] = useState<MobileOffer[]>([])
  const [nearbyStores, setNearbyStores] = useState<NearbyStore[]>([])
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedMembership, setSelectedMembership] = useState<MobileMembership | null>(null)

  useEffect(() => {
    loadMobileData()
    
    // Auto-advance offers every 5 seconds
    const interval = setInterval(() => {
      setCurrentOfferIndex(prev => (prev + 1) % offers.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [offers.length])

  const loadMobileData = async () => {
    try {
      // Sample mobile-optimized membership data
      const sampleMemberships: MobileMembership[] = [
        {
          id: 'mobile_mem_1',
          businessName: 'Coffee & Co.',
          businessLogo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop&crop=center',
          businessAddress: '123 Main St, Downtown',
          businessPhone: '+1-555-0123',
          membershipTier: 'Gold',
          tierColor: '#FFD700',
          points: 1250,
          totalSpent: 850.75,
          discountPercentage: 15,
          nextTierPoints: 750,
          backgroundColor: 'from-amber-400 via-yellow-500 to-orange-500',
          benefits: ['15% discount', 'Free birthday drink', 'Priority queue', 'Free Wi-Fi'],
          qrCode: 'QR_COFFEE_GOLD_1250'
        },
        {
          id: 'mobile_mem_2',
          businessName: 'Fitness Plus',
          businessLogo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center',
          businessAddress: '456 Health Ave',
          businessPhone: '+1-555-0234',
          membershipTier: 'Silver',
          tierColor: '#C0C0C0',
          points: 650,
          totalSpent: 425.50,
          discountPercentage: 10,
          nextTierPoints: 350,
          backgroundColor: 'from-blue-400 via-indigo-500 to-purple-500',
          benefits: ['10% discount', 'Guest passes', 'Nutrition consultation'],
          qrCode: 'QR_FITNESS_SILVER_650'
        },
        {
          id: 'mobile_mem_3',
          businessName: 'Bella Beauty',
          businessLogo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=80&h=80&fit=crop&crop=center',
          businessAddress: '789 Beauty Blvd',
          businessPhone: '+1-555-0345',
          membershipTier: 'Platinum',
          tierColor: '#E5E4E2',
          points: 2150,
          totalSpent: 1200.25,
          discountPercentage: 20,
          nextTierPoints: 0,
          backgroundColor: 'from-purple-400 via-pink-500 to-rose-500',
          benefits: ['20% discount', 'VIP treatment', 'Priority booking', 'Free consultation'],
          qrCode: 'QR_BEAUTY_PLATINUM_2150'
        }
      ]

      const sampleOffers: MobileOffer[] = [
        {
          id: 'mobile_offer_1',
          businessName: 'Coffee & Co.',
          businessLogo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=60&h=60&fit=crop&crop=center',
          title: 'Weekend Special ☕',
          description: 'Get 25% off all coffee drinks this weekend!',
          discountPercentage: 25,
          discountAmount: 0,
          validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundColor: 'from-amber-500 to-orange-600',
          isActive: true,
          category: 'Food & Drink'
        },
        {
          id: 'mobile_offer_2',
          businessName: 'Fitness Plus',
          businessLogo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop&crop=center',
          title: 'Fitness Challenge 💪',
          description: '$50 off personal training sessions!',
          discountPercentage: 0,
          discountAmount: 50,
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundColor: 'from-blue-500 to-cyan-600',
          isActive: true,
          category: 'Fitness'
        },
        {
          id: 'mobile_offer_3',
          businessName: 'Bella Beauty',
          businessLogo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=60&h=60&fit=crop&crop=center',
          title: 'Spa Day Special 💆‍♀️',
          description: '30% off all spa treatments this week!',
          discountPercentage: 30,
          discountAmount: 0,
          validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          backgroundColor: 'from-pink-500 to-rose-600',
          isActive: true,
          category: 'Beauty'
        }
      ]

      const sampleNearbyStores: NearbyStore[] = [
        {
          id: 'store_1',
          name: 'Coffee & Co. Downtown',
          address: '123 Main St',
          distance: '0.2 mi',
          isOpen: true,
          rating: 4.8,
          category: 'Coffee Shop',
          logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=50&h=50&fit=crop&crop=center'
        },
        {
          id: 'store_2',
          name: 'Fitness Plus Central',
          address: '456 Health Ave',
          distance: '0.5 mi',
          isOpen: true,
          rating: 4.6,
          category: 'Gym',
          logoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=center'
        },
        {
          id: 'store_3',
          name: 'Bella Beauty Spa',
          address: '789 Beauty Blvd',
          distance: '0.8 mi',
          isOpen: false,
          rating: 4.9,
          category: 'Beauty Salon',
          logoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=50&h=50&fit=crop&crop=center'
        }
      ]

      setMemberships(sampleMemberships)
      setOffers(sampleOffers)
      setNearbyStores(sampleNearbyStores)
    } catch (error) {
      console.error('Error loading mobile data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const getTotalPoints = () => memberships.reduce((sum, m) => sum + m.points, 0)
  const getTotalSpent = () => memberships.reduce((sum, m) => sum + m.totalSpent, 0)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const openMembershipCard = (membership: MobileMembership) => {
    setSelectedMembership(membership)
    setCurrentScreen('card')
  }

  const renderHomeScreen = () => (
    <div className="flex-1 p-4 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning! 👋</h1>
            <p className="text-gray-600">Ready to earn more rewards?</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="w-10 h-10 p-0">
              <Bell className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="w-10 h-10 p-0">
              <QrCode className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-3 text-center">
              <Star className="w-6 h-6 mx-auto mb-1" />
              <p className="text-lg font-bold">{getTotalPoints().toLocaleString()}</p>
              <p className="text-xs text-blue-100">Total Points</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-3 text-center">
              <ShoppingBag className="w-6 h-6 mx-auto mb-1" />
              <p className="text-lg font-bold">${getTotalSpent().toFixed(0)}</p>
              <p className="text-xs text-green-100">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardContent className="p-3 text-center">
              <Crown className="w-6 h-6 mx-auto mb-1" />
              <p className="text-lg font-bold">{memberships.length}</p>
              <p className="text-xs text-purple-100">Memberships</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Offer */}
      {offers.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Featured Offers</h2>
            <div className="flex space-x-1">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentOfferIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentOfferIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className={`bg-gradient-to-r ${offers[currentOfferIndex]?.backgroundColor} rounded-2xl p-4 text-white`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src={offers[currentOfferIndex]?.businessLogo} 
                    alt={offers[currentOfferIndex]?.businessName}
                    className="w-10 h-10 rounded-full border-2 border-white/30"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{offers[currentOfferIndex]?.title}</h3>
                    <p className="text-white/90 text-sm">{offers[currentOfferIndex]?.businessName}</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                  {offers[currentOfferIndex]?.discountPercentage > 0 ? (
                    <>
                      <span className="text-2xl font-bold">{offers[currentOfferIndex]?.discountPercentage}%</span>
                      <p className="text-xs">OFF</p>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-bold">${offers[currentOfferIndex]?.discountAmount}</span>
                      <p className="text-xs">OFF</p>
                    </>
                  )}
                </div>
              </div>
              <p className="text-white/90 mb-4">{offers[currentOfferIndex]?.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-white/80 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Valid until {formatDate(offers[currentOfferIndex]?.validUntil || '')}</span>
                </div>
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Use Now
                </Button>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-black/20 hover:bg-black/30 text-white"
              onClick={() => setCurrentOfferIndex(prev => (prev - 1 + offers.length) % offers.length)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-black/20 hover:bg-black/30 text-white"
              onClick={() => setCurrentOfferIndex(prev => (prev + 1) % offers.length)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* My Memberships */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">My Memberships</h2>
        <div className="space-y-3">
          {memberships.map((membership) => (
            <Card 
              key={membership.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openMembershipCard(membership)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={membership.businessLogo} 
                    alt={membership.businessName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{membership.businessName}</h3>
                      <Badge 
                        className="text-xs"
                        style={{ backgroundColor: membership.tierColor + '20', color: membership.tierColor }}
                      >
                        {membership.membershipTier}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{membership.points.toLocaleString()} points</p>
                      <p className="text-sm text-gray-600">{membership.discountPercentage}% discount</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nearby Stores */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Nearby Stores</h2>
        <div className="space-y-3">
          {nearbyStores.map((store) => (
            <Card key={store.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={store.logoUrl} 
                    alt={store.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{store.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{store.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{store.address} • {store.distance}</span>
                      </div>
                      <Badge variant={store.isOpen ? 'default' : 'secondary'} className="text-xs">
                        {store.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMembershipCard = () => {
    if (!selectedMembership) return null

    return (
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentScreen('home')}
            className="flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <h1 className="text-lg font-semibold">Membership Card</h1>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Membership Card */}
        <div className={`bg-gradient-to-br ${selectedMembership.backgroundColor} rounded-3xl p-6 text-white mb-6 shadow-2xl`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <img 
                src={selectedMembership.businessLogo} 
                alt={selectedMembership.businessName}
                className="w-16 h-16 rounded-2xl border-2 border-white/30"
              />
              <div>
                <h2 className="text-xl font-bold">{selectedMembership.businessName}</h2>
                <p className="text-white/90">{selectedMembership.membershipTier} Member</p>
              </div>
            </div>
            <Crown className="w-8 h-8 text-white/80" />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80">Reward Points</span>
              <span className="text-2xl font-bold">{selectedMembership.points.toLocaleString()}</span>
            </div>
            
            {selectedMembership.nextTierPoints > 0 && (
              <>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((selectedMembership.points / selectedMembership.nextTierPoints) * 100, 100)}%` 
                    }}
                  />
                </div>
                <p className="text-white/80 text-sm">
                  {selectedMembership.nextTierPoints - selectedMembership.points} points to next tier
                </p>
              </>
            )}
          </div>

          {/* QR Code Simulation */}
          <div className="bg-white rounded-2xl p-4 mb-4">
            <div className="bg-black w-full h-32 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1 w-24 h-24">
                {Array.from({length: 64}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm mt-2 font-mono">
              {selectedMembership.qrCode}
            </p>
          </div>

          <div className="text-center">
            <p className="text-white/90 text-sm">Show this QR code at checkout</p>
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Membership Benefits</h3>
              <div className="space-y-2">
                {selectedMembership.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Store Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedMembership.businessAddress}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{selectedMembership.businessPhone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Total Spent: ${selectedMembership.totalSpent.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button className="flex-1 flex items-center space-x-2">
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </Button>
            <Button variant="outline" className="flex-1 flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Visit Store</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderOffersScreen = () => (
    <div className="flex-1 p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Offers</h1>
      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id} className={`bg-gradient-to-r ${offer.backgroundColor} rounded-2xl p-4 text-white`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img 
                  src={offer.businessLogo} 
                  alt={offer.businessName}
                  className="w-12 h-12 rounded-full border-2 border-white/30"
                />
                <div>
                  <h3 className="font-bold text-lg">{offer.title}</h3>
                  <p className="text-white/90 text-sm">{offer.businessName}</p>
                  <Badge className="bg-white/20 text-white text-xs mt-1">{offer.category}</Badge>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                {offer.discountPercentage > 0 ? (
                  <>
                    <span className="text-xl font-bold">{offer.discountPercentage}%</span>
                    <p className="text-xs">OFF</p>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold">${offer.discountAmount}</span>
                    <p className="text-xs">OFF</p>
                  </>
                )}
              </div>
            </div>
            <p className="text-white/90 mb-4">{offer.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-white/80 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Valid until {formatDate(offer.validUntil)}</span>
              </div>
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Redeem
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProfileScreen = () => (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
        <p className="text-gray-600">john.doe@email.com</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Points</span>
                <span className="font-semibold">{getTotalPoints().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Spent</span>
                <span className="font-semibold">${getTotalSpent().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Memberships</span>
                <span className="font-semibold">{memberships.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
        {/* Status Bar */}
        <div className="h-12 bg-gray-900 rounded-t-[40px] flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="text-white text-xs font-semibold">9:41</span>
            <div className="flex space-x-1">
              <div className="w-4 h-2 bg-white rounded-sm"></div>
              <div className="w-1 h-2 bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100%-3rem)]">
          {/* Content */}
          {currentScreen === 'home' && renderHomeScreen()}
          {currentScreen === 'card' && renderMembershipCard()}
          {currentScreen === 'offers' && renderOffersScreen()}
          {currentScreen === 'profile' && renderProfileScreen()}

          {/* Bottom Navigation */}
          <div className="flex justify-around items-center p-4 border-t border-gray-200 bg-white">
            <button 
              onClick={() => setCurrentScreen('home')}
              className={`flex flex-col items-center ${
                currentScreen === 'home' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('offers')}
              className={`flex flex-col items-center ${
                currentScreen === 'offers' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Gift className="w-6 h-6" />
              <span className="text-xs mt-1">Offers</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className={`flex flex-col items-center ${
                currentScreen === 'profile' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>
            <button className="flex flex-col items-center text-gray-500">
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileCustomerApp