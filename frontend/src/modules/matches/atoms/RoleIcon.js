import { RoleAttackerIcon, RoleDefenderIcon, RoleGoalKeeperIcon } from 'src/shared/design-system';

export const RoleIcon = ({ role }) => {
  const getProps = ({ width }) => ({
    width,
    style: { color: '#9FB2D1' },
  });
  const Element = {
    attack: () => <RoleAttackerIcon {...getProps({ width: 15 })} />,
    defender: () => <RoleDefenderIcon {...getProps({ width: 20 })} />,
    goalkeeper: () => <RoleGoalKeeperIcon {...getProps({ width: 25 })} />,
  }[role];

  return <Element />;
};
