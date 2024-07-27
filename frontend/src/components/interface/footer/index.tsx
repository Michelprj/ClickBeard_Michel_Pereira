'use client';

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black h-12 flex items-center justify-center gap-4">
      <Link href="https://www.instagram.com/michelprj/" target="_blank">
        <Image src="/instagram-icon.svg" alt="Instagram icon" width={25} height={25} />
      </Link>

      <Link href="https://api.whatsapp.com/send/?phone=5527999855540&text=Ol%C3%A1%21+Preciso+falar+com+voc%C3%AA%21+&type=phone_number&app_absent=0" target="_blank">
        <Image src="/whatsApp-icon.svg" alt="Whatsapp icon" width={30} height={30} />
      </Link>

      <Link href="mailto:michelpr1224@gmail.com?subject=&body=" target="_blank">
        <Image src="/email-icon.svg" alt="Facebook icon" width={30} height={30} />
      </Link>
    </div>
  )
}
