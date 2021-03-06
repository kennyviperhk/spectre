import React from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import UserSession from '../../Components/UserSession/UserSession';
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import OceanProfileHelp from '../OceanProfileHelp/OceanProfileHelp';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./OceanProfile.scss";
import "./OceanProfileSidebar.scss";

let prevActivateProfile = false;

function OceanProfile(props) {

  const { target, activateProfile } = props;
  const [sideBar, setSideBar] = React.useState({ isSideBarActive: false });
  const [helpDialog, setHelpDialog] = React.useState({ isHelpOpened: false });

  if (prevActivateProfile !== activateProfile) {
    setSideBar({ isSideBarActive: activateProfile });
    prevActivateProfile = props.activateProfile;
  }

  const isDominantTrait = t => (!t) ? <div></div> :
    (<img className='dominant' alt='dom' src='imgs/dominant.svg' />);

  const oceanSliders = UserSession.oceanTraits.map(trait => {
    let isDom = trait === target.trait;
    return (
      <div className={(isDom ? "textSliderMaxVal" : "textSlider") + " " + trait} key={trait}>
        {isDominantTrait(isDom)}
        <div className="icon">
          <img src={`/imgs/${trait}.svg`} alt={trait} key={trait}/>
        </div>
        <div className="sliderContainer">
          <div className="slider">
            <Slider value={target.traits[trait] * 100} aria-labelledby="label" key={trait}/>
          </div>
          <div className="sliderText">
            <p className="slider-title">{trait.ucf()}</p>
            <p className="slider-percentage">{Math.round(target.traits[trait] * 100)}%</p>
          </div>
        </div>
      </div>
    );
  });

  /////////////////////////// bold dominant trait /////////////////////////////
  /*let sentences = target.sentences.map((sent,i) => {
    let words = sent.split(' ');
    let weight = words[0].toLowerCase() === target.trait ? 'bold' : 'normal';
    return (<p key={i}><span style={{fontWeight: weight, color:'#fff'}}>{words[0]}
      </span>&nbsp;<span style={{color:'#fff'}}>{words.slice(1).join(' ')}</span></p>)
  });*/

  let sentences = target.sentences.map((s,i) => <p key={i}>{s}</p>);
  let sentClass = sentences.length < 4 ? 'profile-desc-lg' : 'profile-desc';

  return (
    <div id="outer-container" className="OceanProfile" >
      <SideNav expanded={sideBar.isSideBarActive}
        onToggle={() => setSideBar({ isSideBarActive: !sideBar.isSideBarActive })}
        className={sideBar.isSideBarActive ? "SideNav-main-expanded" : "SideNav-main-collapsed"}>

        <SideNav.Toggle className={sideBar.isSideBarActive ? "SideNav-toggle-expanded" : "SideNav-toggle-collapsed"}
          onClick={() => setSideBar({ isSideBarActive: !sideBar.isSideBarActive })}>
          <div id="box2">
            <span id="box2Text"></span>
          </div><h1>OCEAN Profile</h1>
        </SideNav.Toggle>

        <SideNav.Nav defaultSelected="home" className={sideBar.isSideBarActive ? "SideNav-expanded" : "SideNav-collapsed"}>
          <NavItem eventKey="home" className={sideBar.isSideBarActive ? "SideNav-item-expanded" : "SideNav-item-collapsed"}>
            <NavText className="ocean-profile-div">
              <div className="split-h">
                <div className="split-l">
                  <div className="profile-info">
                    <AvatarComponent target={target} />
                    <h2>{target.name}'s<br />OCEAN Profile</h2>
                    <img className="helpIcon" alt="help" src="/imgs/help.svg"
                      onClick={() => setHelpDialog({ isHelpOpened: sideBar.isSideBarActive })} />
                  </div>
                  <hr />
                  <div className={sentClass}>
                    {sentences}
                  </div>
                </div>
                <div className="split-r">
                  <div className="OceanSliders MultiColor">
                    {oceanSliders}
                  </div>
                </div>
              </div>
              <OceanProfileHelp
                isOpen={helpDialog.isHelpOpened}
                onClose={() => setHelpDialog({ isHelpOpened: false })}
              />
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}

OceanProfile.propTypes = {
  classes: PropTypes.object,
};

export default OceanProfile;
