import Transition from '../Ui/Transition'
import IntroContent from '../Data/introduction.json'
import Button from '../Ui/Button'
import { Link } from 'react-router-dom'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
import Team from '../Ui/Team'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import QrCode from '../Ui/QrCode'

const IntroPage = () => {
  return (
    <div className="IntroPage">
      <QrCode />
      <div className="overflow-hidden absolute w-full h-screen flex items-end pointer-events-none">
        <ScrollDownIndicator className={'mb-10 absolute'}></ScrollDownIndicator>
      </div>

      <main className="flex w-full overflow-hidden flex-col justify-center items-center p-4">
        <HelmetProvider>
          <Helmet>
            <title>3D Stories</title>
            <meta name="description" content="Telling stories about chemicals." data-rh="true" />
            <meta name="keywords" content="LCSB, C²DH" />
          </Helmet>
        </HelmetProvider>
        <div className="h-screen flex items-center sm:translate-x-[0rem] xl:translate-x-[-12rem]">
          {IntroContent?.sections?.map((d, i) =>
            i === 0 ? (
              <div key={d.path ?? i} className="intro relative">
                <h1 dangerouslySetInnerHTML={{ __html: d.title }} />{' '}
                <Link to="/trifluoroacetic_acid">
                  <Button
                    className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
                    value="EXPLORE STORIES"
                  />
                </Link>
              </div>
            ) : null
          )}
        </div>
        {IntroContent?.sections
          .filter((_, i) => i >= 1)
          .map((d, i, arr) => (
            <section
              key={d.path ?? i}
              className="flex intro-description relative flex-col w-screen justify-center items-center"
            >
              {console.debug('PATH', arr)}
              <div
                className={`max-w-[800px] p-6 md:p-10 ${i === 0 ? 'mt-[10vh]' : ''} justify-start ${i === 5 ? 'hidden' : 'block'} ${i === 4 ? 'mb-[10vh]' : ''}`}
              >
                <h2 className="mb-[1rem] self-start">{d.title === 'Team' ? null : d.title}</h2>
                <p className="intro-content flex-grow" dangerouslySetInnerHTML={{ __html: d.description }}></p>
              </div>
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
                </div>
              ))}
            </div>
          ))}
        {/* <div className="introduction-links relative flex flex-wrap justify-center">
          <a className="mx-3" href="https://github.com/C2DH/3dmolecules" target="_blank">
            GitHub-Repo
          </a>
          <a className="mx-3" href="https://github.com/C2DH/3dmolecules" target="_blank">
           3D molecules
          </a>
        </div> */}
      </main>
    </div>
  )
}

export default Transition(IntroPage)
