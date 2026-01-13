import React from 'react';
import Link from '@docusaurus/Link';
import SuiDevgruLogo from '@site/src/components/SuiDevgruLogo';

export default function DevgruLogoNavbarItem(): React.ReactNode {
  return (
    <Link className="navbar__brand" to="/" title="DevGru home" aria-label="DevGru home">
      <SuiDevgruLogo size="navbar" />
    </Link>
  );
}
