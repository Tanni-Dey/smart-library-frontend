import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <h4>Smart Library</h4>
          </div>
          <div>
            <ul className="flex items-center">
              <li className="m-3">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                {/* <Button variant="ghost">
              <HiOutlineSearch size="25" />
            </Button> */}
              </li>
              {/* <li>
            <Cart />
          </li>
          <li className="ml-5">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Subscription
                </DropdownMenuItem>
                {!user.email ? (
                  <>
                    <Link to="/login">
                      <DropdownMenuItem className="">
                        login
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/signup">
                      <DropdownMenuItem className="">
                        signup
                      </DropdownMenuItem>
                    </Link>
                  </>
                ) : (
                  <DropdownMenuItem onClick={handleLogout} className="">
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
