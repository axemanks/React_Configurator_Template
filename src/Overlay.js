import { Logo } from '@pmndrs/branding';
import { AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai';

export default function Overlay() {
    return <Intro />    
    
}
// transition from intro to configurator page
function Intro() {
    return (
        <div className="container">
            {/* Header */}
            <header>
                <Logo width="40" height="40" />
                <AiOutlineShopping size="3em" />
            </header>
            {/* Hero */}
            <section key="main">
        <div className="section--container">
          <div>
            <h1>LET'S DO IT.</h1>
          </div>
          <div className="support--content">
            <div>
              <p>
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{' '}
                and define your own style.
                </p>
                
                {/* Button */}
              <button style={{ background: 'black' }}>
                CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
