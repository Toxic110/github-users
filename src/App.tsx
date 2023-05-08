import './assets/styles/app.scss';

import { Header } from '@components';

import { clientRouters } from './routes';

function App() {
  return (
    <>
      <Header />
      <main>{clientRouters()}</main>
    </>
  );
}

export default App;
