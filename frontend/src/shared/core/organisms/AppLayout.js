import AppHeader from './AppHeader';

export default function AppLayout({ children, title = null, inApp = true }) {
  return (
    <>
      <AppHeader inApp={inApp} title={title} />
      {children}
    </>
  );
}
