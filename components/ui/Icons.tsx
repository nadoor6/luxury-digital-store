import { 
  FaShippingFast,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa'

interface IconProps {
  className?: string
}

export const ShippingIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <FaShippingFast className={className} />
)

export const ShieldIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <FaShieldAlt className={className} />
)

export const SupportIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <FaHeadset className={className} />
)