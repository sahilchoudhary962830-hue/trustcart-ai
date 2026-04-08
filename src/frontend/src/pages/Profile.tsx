import { ProtectedLayout } from "@/components/Layout";
import { Badge } from "@/components/ui/BadgeCustom";
import { Button } from "@/components/ui/ButtonCustom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardCustom";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, Shield, User } from "lucide-react";

export default function Profile() {
  const { username, role, userId, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  return (
    <ProtectedLayout>
      <div className="container mx-auto px-4 py-10 max-w-xl">
        <h1 className="font-display font-bold text-3xl text-foreground mb-8">
          Profile
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <CardTitle>{username ?? "User"}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={role === "admin" ? "default" : "secondary"}
                    showIcon={role === "admin"}
                  >
                    {role === "admin" ? "Admin" : "Member"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                <span className="text-sm font-display font-medium text-muted-foreground">
                  User ID
                </span>
                <span className="text-sm font-mono text-foreground truncate max-w-[180px]">
                  {userId ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                <span className="text-sm font-display font-medium text-muted-foreground">
                  Role
                </span>
                <Badge variant={role === "admin" ? "default" : "secondary"}>
                  {role ?? "user"}
                </Badge>
              </div>
              {role === "admin" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-body text-foreground">
                    You have full admin access to the platform.
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button
          variant="destructive"
          onClick={handleLogout}
          className="w-full"
          data-ocid="profile-logout"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
    </ProtectedLayout>
  );
}
