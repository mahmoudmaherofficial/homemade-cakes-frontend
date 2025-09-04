"use client";

import { Button } from "@/components/ui/button";
import PatternBG from "@/components/ui/pattern-bg/PatternBG";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, clearUser } = useAuth();

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <PatternBG/>
      <div className="bg-card shadow-lg rounded-2xl max-w-md w-full p-6 z-10">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {user.name.charAt(0)}
          </div>

          {/* User Info */}
          <h1 className="mt-4 text-2xl font-semibold text-foreground">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-muted-foreground">{user.phone}</p>
          {user.address && <p className="text-muted-foreground mt-1">{user.address}</p>}

          {/* Badge */}
          <span
            className={`mt-3 px-3 py-1 rounded-full text-sm font-medium ${
              user.isAdmin ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}>
            {user.isAdmin ? "Admin" : "User"}
          </span>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <Button variant={"secondary"} size={"lg"}>
              Edit Profile
            </Button>
            <Button variant={"outline"} size={"lg"} onClick={() => clearUser()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
