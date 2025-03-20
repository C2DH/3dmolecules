import Transition from '../Ui/Transition'
import IntroContent from '../Data/introduction.json'
import Button from '../Ui/Button'
import { Link } from 'react-router-dom'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
import Team from '../Ui/Team'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import QrCode from '../Ui/QrCode'
import { useTranslation } from 'react-i18next'

const getTranslatable = (localizedObject, currentLanguage, fallbackLanguage = 'en') => {
  if (typeof localizedObject === 'string') {
    return localizedObject
  }
  if (localizedObject && typeof localizedObject === 'object') {
    return localizedObject[currentLanguage] || localizedObject[fallbackLanguage] || ''
  }
  return ''
}

const IntroPage = () => {
  const { t, i18n } = useTranslation()

  return (
    <div className="IntroPage">
      <QrCode />
      <div className="overflow-hidden absolute w-full h-screen flex items-end pointer-events-none">
        <ScrollDownIndicator className={'mb-10 absolute'}></ScrollDownIndicator>
      </div>

      <main className="flex w-full overflow-hidden flex-col justify-center items-center p-4">
        <HelmetProvider>
          <Helmet>
            <title>{t('3D Stories')}</title>
            <meta name="description" content={t('Telling stories about chemicals.')} data-rh="true" />
            <meta name="keywords" content="LCSB, C²DH" />
          </Helmet>
        </HelmetProvider>
        <div className="h-screen flex items-center sm:translate-x-[0rem] xl:translate-x-[-12rem]">
          {IntroContent?.sections?.map((d, i) =>
            i === 0 ? (
              <div key={d.path ?? i} className="intro relative">
                <h1 dangerouslySetInnerHTML={{ __html: getTranslatable(d.title, i18n.language, 'en') }} />
                <Link to="/trifluoroacetic_acid">
                  <Button
                    className="mt-5 w-full md:w-auto sm:mr-0 md:mr-3 xl2:mr-3 pointer-events-auto"
                    value={t('explore stories')}
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
              <div
                className={`max-w-[800px] p-6 md:p-10 ${i === 0 ? 'mt-[10vh]' : ''} justify-start ${i === 5 ? 'hidden' : 'block'} ${i === 4 ? 'mb-[10vh]' : ''}`}
              >
                <h2 className="mb-[1rem] self-start">
                  {getTranslatable(d.title, i18n.language, 'en') === 'Team' ||
                  getTranslatable(d.title, i18n.language, 'en') === 'Équipe'
                    ? null
                    : getTranslatable(d.title, i18n.language, 'en')}
                </h2>
                <p
                  className="intro-content flex-grow"
                  dangerouslySetInnerHTML={{ __html: getTranslatable(d.description, i18n.language, 'en') }}
                ></p>
              </div>
            </section>
          ))}
        <h2 className="mb-[1rem] mt-[10rem] relative">{t('team')}</h2>
        {IntroContent?.sections
          .filter(section => section.team)
          .map((section, i) => (
            <div className="team-block mb-[10rem]" key={i}>
              {section.team.map((member, j) => (
                <div key={j}>
                  <Team
                    key={member.name}
                    name={getTranslatable(member.name, i18n.language, 'en')}
                    img={member.img}
                    role={getTranslatable(member.role, i18n.language, 'en')}
                    uni={getTranslatable(member.uni, i18n.language, 'en')}
                    link={member.link}
                  />
                </div>
              ))}
            </div>
          ))}
      </main>
    </div>
  )
}

export default Transition(IntroPage)
