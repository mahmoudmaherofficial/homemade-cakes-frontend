import Link from "next/link";
import Image from "next/image";
import logo from "@public/images/logo.svg";

const Logo = () => (
  <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
    <Image src={logo} width={120} height={30} alt="Homemade Cakes Logo" />
  </Link>
);

export default Logo;
