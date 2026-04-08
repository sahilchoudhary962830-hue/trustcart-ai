import { Button } from "@/components/ui/ButtonCustom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Award,
  BarChart3,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Sun,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/analyzer", label: "Analyzer", icon: Search },
  { href: "/checker", label: "Checker", icon: ShoppingBag },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/trust-badge", label: "Trust Badge", icon: Award },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, username, role, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const allLinks = [
    ...navLinks,
    ...(role === "admin"
      ? [{ href: "/admin", label: "Admin", icon: Settings }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg">
              TrustCart <span className="text-accent">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav-links"
          >
            {allLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-display font-medium transition-smooth",
                  currentPath === href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              data-ocid="theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-display text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
                    data-ocid="user-menu"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="max-w-[100px] truncate">{username}</span>
                  </button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Logout"
                  data-ocid="logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" data-ocid="login-btn">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" data-ocid="signup-btn">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-smooth"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="mobile-menu-toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card/95 backdrop-blur-md slide-up"
          data-ocid="mobile-nav"
        >
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {allLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-display font-medium transition-smooth",
                  currentPath === href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-border flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  toggle();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
