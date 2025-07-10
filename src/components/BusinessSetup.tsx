import React, { useState } from 'react'
import { Save, Upload, Store, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'

const BusinessSetup: React.FC = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Coffee & Co.',
    description: 'Premium coffee shop with artisan roasts and exceptional customer service',
    email: 'hello@coffeeandco.com',
    phone: '+1-555-0123',
    address: '123 Main St, Downtown',
    website: 'https://coffeeandco.com',
    logoUrl: ''
  })

  const [loyaltySettings, setLoyaltySettings] = useState({
    pointsPerDollar: 1,
    welcomeBonus: 50,
    birthdayBonus: 100,
    referralBonus: 200,
    pointsToCurrencyValue: 100, // 100 points = $1
    minRedeemPoints: 500
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true
  })

  const handleSaveBusinessInfo = () => {
    toast.success('Business information saved successfully!')
  }

  const handleSaveLoyaltySettings = () => {
    toast.success('Loyalty settings saved successfully!')
  }

  const handleSaveNotificationSettings = () => {
    toast.success('Notification settings saved successfully!')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Setup</h1>
        <p className="text-gray-600 mt-2">Configure your business settings and preferences</p>
      </div>

      <div className="space-y-8">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-blue-600" />
              <span>Business Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessInfo.name}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="website"
                    value={businessInfo.website}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={businessInfo.description}
                onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
                </Button>
                <span className="text-sm text-gray-500">PNG, JPG up to 2MB</span>
              </div>
            </div>

            <Button onClick={handleSaveBusinessInfo} className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Business Info</span>
            </Button>
          </CardContent>
        </Card>

        {/* Loyalty Program Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-purple-600" />
              <span>Loyalty Program Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pointsPerDollar">Points per Dollar Spent</Label>
                <Input
                  id="pointsPerDollar"
                  type="number"
                  value={loyaltySettings.pointsPerDollar}
                  onChange={(e) => setLoyaltySettings({ ...loyaltySettings, pointsPerDollar: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="welcomeBonus">Welcome Bonus Points</Label>
                <Input
                  id="welcomeBonus"
                  type="number"
                  value={loyaltySettings.welcomeBonus}
                  onChange={(e) => setLoyaltySettings({ ...loyaltySettings, welcomeBonus: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthdayBonus">Birthday Bonus Points</Label>
                <Input
                  id="birthdayBonus"
                  type="number"
                  value={loyaltySettings.birthdayBonus}
                  onChange={(e) => setLoyaltySettings({ ...loyaltySettings, birthdayBonus: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="referralBonus">Referral Bonus Points</Label>
                <Input
                  id="referralBonus"
                  type="number"
                  value={loyaltySettings.referralBonus}
                  onChange={(e) => setLoyaltySettings({ ...loyaltySettings, referralBonus: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pointsToCurrencyValue">Points to Currency Value</Label>
              <Input
                id="pointsToCurrencyValue"
                type="number"
                value={loyaltySettings.pointsToCurrencyValue}
                onChange={(e) => setLoyaltySettings({ ...loyaltySettings, pointsToCurrencyValue: parseInt(e.target.value) || 1 })}
                placeholder="e.g., 100 (100 points = $1)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minRedeemPoints">Minimum Points to Redeem</Label>
                <Input
                  id="minRedeemPoints"
                  type="number"
                  value={loyaltySettings.minRedeemPoints}
                  onChange={(e) => setLoyaltySettings({ ...loyaltySettings, minRedeemPoints: parseInt(e.target.value) || 0 })}
                  placeholder="e.g. 100"
                />
              </div>
            </div>

            <Button onClick={handleSaveLoyaltySettings} className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Loyalty Settings</span>
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-green-600" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send notifications via email</p>
                </div>
                <input
                  id="emailNotifications"
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                  className="rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-600">Send notifications via SMS</p>
                </div>
                <input
                  id="smsNotifications"
                  type="checkbox"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                  className="rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Send push notifications to mobile app</p>
                </div>
                <input
                  id="pushNotifications"
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                  className="rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-gray-600">Send promotional and marketing emails</p>
                </div>
                <input
                  id="marketingEmails"
                  type="checkbox"
                  checked={notificationSettings.marketingEmails}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })}
                  className="rounded"
                />
              </div>
            </div>

            <Button onClick={handleSaveNotificationSettings} className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Notification Settings</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BusinessSetup