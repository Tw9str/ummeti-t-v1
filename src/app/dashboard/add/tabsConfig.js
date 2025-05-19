import {
  ArFlagIcon,
  EnFlagIcon,
  IdFlagIcon,
  RuFlagIcon,
  TrFlagIcon,
} from '@/components/icons/FlagIcons';
import { routing } from '@/i18n/routing';

export const tabsConfig = {
  locales: routing.locales,
  icons: {
    ar: <ArFlagIcon />,
    en: <EnFlagIcon />,
    tr: <TrFlagIcon />,
    id: <IdFlagIcon />,
    ru: <RuFlagIcon />,
  },
};
