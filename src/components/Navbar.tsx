import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="h-12 bg-gray-200 px-2">
      <div className="flex h-full justify-start align-middle">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/tasks" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Tasks
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {session && (
          <div className="m-auto">
            <Avatar>
              <AvatarImage src={session.user.image} />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
