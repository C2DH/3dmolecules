import Transition from '../Ui/Transition'
import { useViewportStore } from '../components/ViewportManager'
import Vimeo from '@u-wave/react-vimeo'
import IntroContent from '../Data/introduction.json'
import Button from '../Ui/Button'
import { Link } from 'react-router-dom'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
import Team from '../Ui/Team'

const IntroPage = () => {
  const setBackgroundVideoReady = useViewportStore(state => state.setBackgroundVideoReady)
  return (
    <div className="IntroPage">
      <div className="overflow-hidden absolute w-full h-screen flex items-end pointer-events-none">
        <ScrollDownIndicator className={'mb-10 absolute'}></ScrollDownIndicator>

        <div className="background-video">
          <Vimeo
            video="https://vimeo.com/1021606397/0c67cd3435"
            // autoplay={false}
            loop
            muted
            showByline={false}
            showTitle={false}
            showPortrait={false}
            controls={false} // Hide controls
            // background
            onReady={e => {
              console.log('[Preloader] onPlay', e)
              e.play().then(() => {
                console.log('Video is playing')
                setBackgroundVideoReady(true)
              })
              // debugger
              //
            }}
            onPlaying={e => {
              console.log('[Preloader] onPlaying', e)
            }}
            onProgress={e => {
              console.log('[Preloader] onProgress', e)
            }}
          />
        </div>
      </div>

      <main className="flex w-full overflow-hidden flex-col justify-center items-center p-4">
        <div className="h-screen flex items-center sm:translate-x-[0rem] xl:translate-x-[-12rem]">
          {IntroContent?.sections?.map((d, i) =>
            i === 0 ? (
              <div key={d.path ?? i} className="intro relative">
                <h1 dangerouslySetInnerHTML={{ __html: d.title }} />{' '}
                <Link to="/robe">
                  <Button
                    className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
                    value="Read our stories"
                  />
                </Link>
              </div>
            ) : null
          )}
        </div>
        {IntroContent?.sections
          .filter((_, i) => i >= 1)
          .map((d, i) => (
            <section key={d.path ?? i} className="flex with-background w-screen relative justify-center items-center">
              <div
                className={`relative intro-content p-4 max-w-[800px] ${i === 0 ? 'mt-[10vh]' : 'mt-[15vh]'} `}
                dangerouslySetInnerHTML={{ __html: d.description }}
              ></div>
            </section>
          ))}
        <h2 className="mb-[1rem] mt-[10rem] relative">Team</h2>
        {IntroContent?.sections
          .filter(section => section.team)
          .map((section, i) => (
            <div className="team-block mb-[10rem]" key={i}>
              {section.team.map((member, j) => (
                <div key={j}>
                  <Team
                    key={member.name}
                    name={member.name}
                    img={member.img}
                    role={member.role}
                    uni={member.uni}
                    link={member.link}
                  />
                  {console.log('ROLE', member.role)}
                </div>
              ))}
            </div>
          ))}
      </main>
    </div>
  )
}

export default Transition(IntroPage)
