import './Footer.css'
import * as React from 'react';

const Footer = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [currentContent, setCurrentContent] = React.useState([]);

  const handleButtonClick = (content) => {
    setCurrentContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p>
        Have you been affected by a natural disaster? Explore the links below for assistance and next steps.
      </p>
      <Button onClick={() => handleButtonClick([
        { title: 'Maryland.gov', url: 'https://mdem.maryland.gov/community/Pages/individual-assistance.aspx' },
        { title: 'Fema', url: 'https://www.fema.gov/assistance/individual/program' },
        { title: 'Hawaiian Council', url: 'https://www.hawaiiancouncil.org/helpmaui/dhhlwildfire/' }
      ])}>Wildfire</Button>
      <Button onClick={() => handleButtonClick([
        { title: 'CDC', url: 'https://www.cdc.gov/disasters/floods/after.html' },
        { title: 'Fema', url: 'https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf' }
      ])}>Flood</Button>
      <Button onClick={() => handleButtonClick([
        { title: 'HCA Healthcare', url: 'https://hcagulfcoast.com/patients-and-visitors/hurricane-preparedness/the-aftermath-how-to-recover-from-a-hurricane.dot' },
        { title: 'IOCC', url: 'https://iocc.org/how-we-serve/hurricane-response?gad_source=1&gclid=CjwKCAjwz42xBhB9EiwA48pT79G8KcryFlJr9RVNFTVmQFJm8fFiFefpMjcf6J4UPQWXnvteW7b-kxoCllUQAvD_BwE' },
        { title: 'IBHS', url: 'https://ibhs.org/hurricanereadyhomeafterevent/' }
      ])}>Hurricane</Button>
      <Button onClick={() => handleButtonClick([
        { title: 'Emergency Assistance Foundation', url: 'https://emergencyassistancefdn.org/tornadoes/?gad_source=1&gclid=CjwKCAjwz42xBhB9EiwA48pT71prnCSN2IS7xiCMWgyzlHao4Fa205pk2UACR7lulmyZR3ShZs-lmhoCr_MQAvD_BwE#:~:text=Tornado%20Safety%20Tips%20to%20Share%20with%20Team%20Members?campaign=14383499942&content=644987343823&keyword=stay%20safe%20tornado' },
        { title: 'NCRI', url: 'https://www.ncricat.com/blog/things-you-should-do-after-a-tornado-hits-your-house' },
        { title: 'IOCC', url: 'https://iocc.org/how-we-serve/emergency-response/disaster-relief?gad_source=1&gclid=CjwKCAjwz42xBhB9EiwA48pT7_64ODiKsZ5tcQCTsWYCDB_lDrJhwStuhcTvoVBiQ2MwrmAKaSfFGRoCHXUQAvD_BwE' }
      ])}>Tornado</Button>
      <Button onClick={() => handleButtonClick([
        { title: 'Habitat For Humanity', url: 'https://www.habitat.org/our-work/disaster-response/disaster-preparedness-homeowners/landslides' },
        { title: 'USGS', url: 'https://www.usgs.gov/programs/landslide-hazards/landslide-preparedness' }
      ])}>Mud/Landslide</Button>
      <Button onClick={() => handleButtonClick([
        { title: 'American Red Cross', url: 'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/winter-storm.html' },
        { title: 'National Weather Service', url: 'https://www.weather.gov/safety/winter-during' },
      ])}>Snowstorm & Severe Ice Storm</Button>
      <Button onClick={() => handleButtonClick([
        { title: 'California Earthquake Authority', url: 'https://www.earthquakeauthority.com/blog/2020/what-should-you-do-after-an-earthquake' },
        { title: 'USGS', url: 'https://www.usgs.gov/faqs/what-can-i-expect-my-house-when-earthquake-occurs-how-do-i-identify-it-what-can-be-done' },
        { title: 'CDC', url: 'https://www.cdc.gov/disasters/earthquakes/during.html' }
      ])}>Earthquake</Button>
      <Button onClick={() => handleButtonClick([
        { title: 'Climate Check', url: 'https://climatecheck.com/risks/drought/mitigation-guide-for-homeowners#:~:text=Mitigating%20Drought%20Damage&text=Soil%20Hydration%3A%20In%20times%20of,sure%20the%20water%20absorbs%20thoroughly.' },
        { title: 'National Drought Mitigaiton Center', url: 'https://drought.unl.edu/Education/DroughtforKids/Protection.aspx' },
        { title: 'NRDC', url: 'https://www.nrdc.org/stories/drought-everything-you-need-know?gad_source=1&gclid=CjwKCAjwz42xBhB9EiwA48pT72SNkeUIVnBQjNacvyGjpUii_NXUu90X0FIkBsVxmHq2trydsqUB3xoCCWcQAvD_BwE' }
      ])}>Drought</Button>
      {isOpen && (
        <div className="overlay">
          <div className="content">
            <span className="close" onClick={handleClose}>&times;</span>
            <ul>
              {currentContent.map((link, index) => (
                <li key={index}><a href={link.url}>{link.title}</a></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Button = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Footer;
