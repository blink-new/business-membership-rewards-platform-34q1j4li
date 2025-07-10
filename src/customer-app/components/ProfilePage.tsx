import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { User, Mail, Phone, Settings, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-gray-900">Alex Doe</h1>
        <p className="text-gray-500">alex.doe@example.com</p>
      </div>

      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-4" />
              <p>Personal Information</p>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-4" />
              <p>Notifications</p>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-4" />
              <p>Contact Support</p>
            </div>
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-gray-400 mr-4" />
              <p>Settings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full mt-6 bg-white">
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
