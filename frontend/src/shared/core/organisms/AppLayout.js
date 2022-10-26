import AppHeader from './AppHeader';

export default function AppLayout({ children }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
