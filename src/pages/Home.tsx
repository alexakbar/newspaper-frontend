import React, { useEffect } from 'react';

interface IHomePageProps {};
 
const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  useEffect(() => {
    window.location.href = '/login'
  }, [])

  return (
    <></>
  );
}
 
export default HomePage;