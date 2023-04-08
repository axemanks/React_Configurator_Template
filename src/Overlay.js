import { Logo } from '@pmndrs/branding';
import { AiOutlineHighlight, AiOutlineShopping, AiFillCamera, AiOutlineArrowLeft, AiOutlineSend } from 'react-icons/ai';
import { useSnapshot } from 'valtio';
import state from './store';
import { motion, AnimatePresence } from 'framer-motion';

// this is the contorl for state from valtio
export default function Overlay() {
  const snap = useSnapshot(state); 

  // configure the transitions
  const transition = { type: 'spring', duration: 0.8 }  // set the inital transition for all future refrence
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }



  return (
    <div className="container">
      <motion.header
        initial={{ opacity: 0, y: -120 }} // opacity 0 is blank and -120 is off screen
        animate={{ opacity: 1, y: 0 }} // opacity 1 is full and 0 is in final position
        transition={{ type: 'spring', duration: 1.8, delay: 1}} // in seconds
      >
        <Logo width="40" height="40" />
        <div>
          <AiOutlineShopping size="3em" />
        </div>
      </motion.header>


      <AnimatePresence>
      {/* controls which page is displayed */}
      {snap.intro ? (
          <Intro key="main" config={config} />
        ) : (
          <Customizer key="custom" config={config} />
        )}
      </AnimatePresence>
    </div>
  )
}
    
{/* transition from intro to configurator page */}
    
function Intro({ config }) {
  return (
    <motion.section {...config} key="main">
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
    </motion.section>
  )
}

// Customizer page
// colors to pick from
function Customizer({ config }) {
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
    <motion.section {...config}>
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
          style={{ background: snap.selectedColor }}
          // saves screenshot of canvas and downloads it
          onClick={() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'canvas.png') // name of file that will be saved
            link.setAttribute(
              'href',
              document
                .querySelector('canvas')
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream')
            )
            link.click()
          }}
        >
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
    </motion.section>
  )
}