// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'product',
    path: '/dashboard/products/all',
    icon: icon('ic_cart'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'order',
    path: '/dashboard/order',
    icon: icon('ic_order')
  },
  {
    title: 'brand',
    path: '/dashboard/brand',
    icon: icon('ic_brand'),
  },
  {
    title: 'promote',
    path: '/dashboard/promote',
    icon: icon('ic_promote'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: icon('ic_setting')
  }
];

export default navConfig;
