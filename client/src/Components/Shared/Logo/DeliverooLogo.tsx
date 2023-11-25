import Image from 'next/image'
import Link from 'next/link'

const DeliverooLogo = () => {
  return (
    <Link href="/">
      <Image
        src="https://images.prismic.io/dbhq-deliveroo-riders-website/39d32733-9f65-48a2-afac-f179a22e99b7_logo-teal.svg"
        alt="Deliveroo Logo"
        width={116}
        height={30}
      />
    </Link>
  )
}

export default DeliverooLogo
