import { Logo } from '@pmndrs/branding';
import { AiOutlineHighlight, AiOutlineShopping, AiFillCamera, AiOutlineArrowLeft, AiOutlineSend } from 'react-icons/ai';
import { useSnapshot } from 'valtio';
import state from './store';

// this is the contorl for state from valtio
export default function Overlay() {
  const snap = useSnapshot(state); 



  return (
    <div className="container">
      <header>
        <Logo width="40" height="40" />
        <div>
          <AiOutlineShopping size="3em" />
        </div>
      </header>
      {/* controls which page is displayed */}
      {snap.intro ? <Intro /> : <Customizer />}
    </div>
  )
}
    
{/* transition from intro to configurator page */}
    
function Intro() {
  return (
    <section key="main">
      <div className="section--container">
        <div>
          <h1>LET'S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              style={{ background: 'black' }}
              onClick={() => (state.intro = false)}>
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Customizer page
// colors to pick from
function Customizer() {
  const snap = useSnapshot(state)

  const colors = [
    '#ccc',
    '#EFBD4E',
    '#80C670',
    '#726DE8',
    '#EF674E',
    '#353934',
    'Purple'
  ]

  // list of decals
  const decals = ['react', 'three2', 'pmndrs']


// creates a div for each object in the array
  return (
    <section key="custom">
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }} // style is the color
              onClick={() => (state.selectedColor = color)}></div> 
          ))}
        </div>
        {/* Decals */}
        <div className="decals">
          <div className="decals--container">
            {snap.decals.map((decal) => (
              <div
                key={decal} className="decal"
                onClick={() => (state.selectedDecal = decal)}>
                <img src={decal + '_thumb.png'} alt="brand" />
              </div>
            ))}
          </div>
        </div>
        {/* Butttons */}
        
        <button className="download"
          style={{ background: snap.selectedColor }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />  {/* Icon from react-icons */}
        </button>

        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}
          >
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />  {/* Icon from react-icons */}
        </button>

        <button className="share" style={{ background: snap.selectedColor }}>
          Share
          <AiOutlineSend size="1.3em" />  {/* Icon from react-icons */}
        </button>
      </div>
    </section>
  )
}